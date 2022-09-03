import { User } from "@/user/domain/User";
import { UserRepository } from "@/user/domain/UserRepository";
import { ApplicationService } from "@/_lib/DDD";

type Dependencies = {
	userRepository: UserRepository;
};

type CreateUserDTO = Readonly<{
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	gender: string;
	roles: string[];
}>;

type CreateUser = ApplicationService<CreateUserDTO, string>;

const makeCreateUser =
	({ userRepository }: Dependencies): CreateUser =>
	async (payload) => {
		const id = await userRepository.getNextId();

		const user = User.create({
			id,
			firstName: payload.firstName,
			lastName: payload.lastName,
			phone: payload.phone,
			email: payload.email,
			password: payload.password,
			gender: payload.gender,
			roles: payload.roles,
		});

		await userRepository.store(user);

		return id.value;
	};

export { makeCreateUser };
export type { CreateUser };
