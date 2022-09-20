import { QueryHandler, SortedPaginatedQuery, PaginatedQueryResult } from '@/_lib/CQRS';

type UserListItemDTO = Readonly<{
	id: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	isEmailVerified: boolean;
	roles: string[];
}>

type UserFilter = {
	firstName: string;
	lastName: string;
}

type FindUsers = QueryHandler<SortedPaginatedQuery<UserFilter>, 
PaginatedQueryResult<UserListItemDTO[]>>;

export { FindUsers };