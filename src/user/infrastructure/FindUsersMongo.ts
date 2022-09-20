import { FindUsers } from "../app/query/FindUsers";
import { UserCollection, UserSchema } from "./UserCollection";
import MUUID from 'uuid-mongodb';

type Dependencies = {
	userCollection: UserCollection;
};

const makeMongoFindUsers = ({ userCollection }: Dependencies): FindUsers => async ({ pagination, filter, sort }) => {
	const users = await userCollection
		.aggregate([
			{
				$match: {},
			},
			{
				$skip:
					Math.max(pagination.page - 1, 0) * pagination.pageSize,
			},
			{
				$limit: pagination.pageSize,
			},
		])
		.toArray() as UserSchema[];

	const totalElements = await userCollection.countDocuments();
	const totalPages = Math.ceil(totalElements / pagination.pageSize);

	return {
		data: users.map((user) => ({
			id: MUUID.from(user._id).toString(),
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
			email: user.email,
			roles: user.roles,
			isEmailVerified: user.isEmailVerified,
		})),
		page: {
			totalPages,
			pageSize: pagination.pageSize,
			totalElements,
			current: pagination.page,
			first: pagination.page === 1,
			last: pagination.page === totalPages,
		},
	};
}

export { makeMongoFindUsers };