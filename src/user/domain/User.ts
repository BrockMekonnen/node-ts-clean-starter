import { AggregateRoot } from "@/_lib/DDD";
import { UserId } from "./UserId";

namespace User {


	type User = AggregateRoot<UserId> &
		Readonly<{
			firstName: string;
			lastName: string;
			phone: string;
			email: string;
			password: string;
			gender: string;
			role: string[];
			createdAt: Date;
			updatedAt: Date;
			version: number;
		}>;

	type UserProps = Readonly<{
		id: UserId;
		firstName: string;
		lastName: string;
		phone: string;
		email: string;
		password: string;
		gender: string;
		role: string[];
	}>;

	export const create = (props: UserProps): User => ({
		...props,
		createdAt: new Date(),
		updatedAt: new Date(),
		version: 0,
	});

	export type Type = User;
}

export { User };
