import { QueryHandler, SortedPaginatedQuery, PaginatedQueryResult } from '@/_lib/CQRS';

type UserListItemDTO = Readonly<{
	id: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	gender: string;
	roles: string[];
}>

type UserFilter = {
	firstName: string;
	lastName: string;
	gender: string;
}

type FindUsers = QueryHandler<SortedPaginatedQuery<UserFilter>, 
PaginatedQueryResult<UserListItemDTO[]>>;

export { FindUsers };