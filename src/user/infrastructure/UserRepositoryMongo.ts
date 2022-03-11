import { PaginatedQueryResult } from "@/_lib/CQRS";
import { from, v4 } from "uuid-mongodb";
import { User } from "../domain/User";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";
import { UserCollection } from "./UserCollection";
import { UserIdProvider } from "./UserIdProvider";
import { UserMapper } from "./UserMapper";

type Dependencies = {
	userCollection: UserCollection;
};

const makeMongoUserRepository = ({
	userCollection,
}: Dependencies): UserRepository => ({
	async getNextId(): Promise<UserId> {
		return Promise.resolve(UserIdProvider.create(v4().toString()));
	},
	async findById(id: string): Promise<User.Type> {
		const user = await userCollection.findOne({ _id: from(id) });

		if (!user) {
			throw new Error("User not found");
		}

		return UserMapper.toDomainEntity(user);
	},
	async findByPhone(phone: string): Promise<User.Type> {
		const user = await userCollection.findOne({ phone });

		if (!user) {
			throw new Error("User not found");
		}

		return UserMapper.toDomainEntity(user);
	},
	async store(entity: User.Type): Promise<void> {
		UserIdProvider.validate(entity.id);

		const { _id, version, ...data } = UserMapper.toOrmEntity(entity);

		const count = await userCollection.countDocuments({ _id });

		if (count) {
			await userCollection.updateOne(
				{ _id, version, deleted: false },
				{
					$set: {
						...data,
						updatedAt: new Date(),
						version: version + 1,
					},
				}
			);

			return;
		}

		await userCollection.insertOne({
			_id,
			...data,
			version,
		});
	},
	async findUsers(pagination): Promise<PaginatedQueryResult<User.Type[]>> {
		console.log("pagination: ", pagination);
		const users = await userCollection
			.aggregate([
				{
					$match: {},
				},
				{
					$skip:
						Math.max(1 - pagination.page, 0) * pagination.pageSize,
				},
				{
					$limit: pagination.pageSize,
				},
			])
			.toArray();

		const totalElements = await userCollection.countDocuments();
		const totalPages = Math.ceil(totalElements / pagination.pageSize);

		return {
			data: UserMapper.toDomainEntities(users),
			page: {
				totalPages,
				pageSize: pagination.pageSize,
				totalElements,
				current: pagination.page,
				first: pagination.pate === 1,
				last: pagination.page === totalPages,
			},
		};
	},
});

export { makeMongoUserRepository };
