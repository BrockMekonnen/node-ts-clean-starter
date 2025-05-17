import { from, v4 } from "uuid-mongodb";
import { User } from "../domain/User";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";
import { UserCollection } from "./UserCollection";
import { UserIdProvider } from "./UserIdProvider";
import { UserMapper } from "./UserMapper";
import { NotFoundError } from "@/_lib/errors/NotFoundError";

type Dependencies = {
	userCollection: UserCollection;
};

const makeMongoUserRepository = ({ userCollection }: Dependencies): UserRepository => ({
	async getNextId(): Promise<UserId> {
		return Promise.resolve(UserIdProvider.create(v4().toString()));
	},
	async findById(id: string): Promise<User.Type> {
		const user = await userCollection.findOne({ _id: from(id) });

		if (!user) {
			throw NotFoundError.create("User not found!")
		}

		return UserMapper.toEntity(user);
	},
	async findByPhone(phone: string): Promise<User.Type> {
		const user = await userCollection.findOne({ phone });

		if (!user) {
			throw NotFoundError.create("User not found!")
		}

		return UserMapper.toEntity(user);
	},
	async findByEmail(email: string): Promise<User.Type> {
		const user = await userCollection.findOne({ email });

		if (!user) {
			throw NotFoundError.create("User not found!")
		}

		return UserMapper.toEntity(user);
	},
	async store(entity: User.Type): Promise<void> {
		UserIdProvider.validate(entity.id);

		const { _id, version, ...data } = UserMapper.toData(entity);

		const count = await userCollection.countDocuments({ _id });

		if (count) {
			await userCollection.updateOne(
				{ _id, version },
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

});

export { makeMongoUserRepository };
