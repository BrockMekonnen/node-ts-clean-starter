import { AuthRepository } from "@/auth/domain/AuthRepository";
import { UserRepository } from "@/user/domain/UserRepository";
import { ApplicationService } from "@/_lib/DDD";
import { BusinessError } from "@/_sharedKernel/domain/error/BusinessError";

type Dependencies = {
	authRepository: AuthRepository;
	userRepository: UserRepository;
};

type LoginParams = {
	email: string;
	password: string;
};

type TokenAndUser = {
	token: string;
	// user: User.Type
}

type GenerateToken = ApplicationService<LoginParams, TokenAndUser>;

const makeGenerateToken =
	({ authRepository, userRepository }: Dependencies): GenerateToken =>
		async (payload) => {
			const user = await userRepository.findByEmail(payload.email);

			if (!user) {
				throw BusinessError.create(
					`Bad Credentials phone or password is not correct`
				);
			}

			const token = await authRepository.generate({ uid: user.id.value, scope: user.roles });

			return {
				token: token,
			};
		};

export { makeGenerateToken };
export type { GenerateToken };
