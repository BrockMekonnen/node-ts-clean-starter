import { User } from "@/user/domain/User";
import { UserRepository } from "@/user/domain/UserRepository";
import { ApplicationService } from "@/_lib/DDD";

type Dependencies = {
	userRepository: UserRepository;
};

type GetUser = ApplicationService<string, User.Type>;

const makeGetUser =
	({ userRepository }: Dependencies): GetUser =>
	async (payload: string) => {
		let user = await userRepository.findById(payload);

		return user;
	};

export { makeGetUser };
export type { GetUser };
