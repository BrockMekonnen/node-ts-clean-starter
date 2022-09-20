import { from } from "uuid-mongodb";
import { FindUserById } from "../app/query/FindUserById";
import { UserCollection } from "./UserCollection";

type Dependencies = {
	userCollection: UserCollection;
};

const makeMongoFindUserById = ({ userCollection }: Dependencies): FindUserById =>
	async ({ filter }) => {
		const user = await userCollection.findOne({ _id: from(filter.id) });

		if (!user) {
			throw new Error("User not found");
		}

		return {
			data: {
				id: from(user._id).toString(),
				firstName: user.firstName,
				lastName: user.lastName,
				phone: user.phone,
				email: user.email,
				roles: user.roles,
				isEmailVerified: user.isEmailVerified,
			}
		}
	}

export { makeMongoFindUserById }