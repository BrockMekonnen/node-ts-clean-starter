import { Query, QueryHandler, QueryResult } from "@/_lib/CQRS";

type UserDTO = {
	id: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	roles: string[];
	isEmailVerified: boolean;
}

type UserId = {
	id: string;
}

type FindUserById = QueryHandler<Query<UserId>, QueryResult<UserDTO>>;

export { FindUserById };