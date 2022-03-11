import { User } from "@/user/domain/User";
import { UserRepository } from "@/user/domain/UserRepository";
import { PaginatedQuery, PaginatedQueryResult } from "@/_lib/CQRS";
import { ApplicationService } from "@/_lib/DDD";

type Dependencies = {
	userRepository: UserRepository;
};

type ListUser = ApplicationService<PaginatedQuery, PaginatedQueryResult<User.Type[]>>;

const makeListUser =
	({ userRepository }: Dependencies): ListUser =>
	async (payload) => {
		const { pagination } = payload;
		const result = await userRepository.findUsers(pagination);
		return result;
	};

export { makeListUser };
export type { ListUser };