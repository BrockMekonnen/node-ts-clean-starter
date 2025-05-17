import { AuthRepository } from "@/auth/domain/AuthRepository";
import { UserRepository } from "@/user/domain/UserRepository";
import { ApplicationService } from "@/_lib/DDD";
import { BusinessError } from "@/_shared/domain/error/BusinessError";

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
}

type GenerateToken = ApplicationService<LoginParams, TokenAndUser>;

const makeGenerateToken =
	({ authRepository, userRepository }: Dependencies): GenerateToken =>
		async (payload) => {
			let user;
			try {
				user = await userRepository.findByEmail(payload.email);
			} catch (error) {
				throw BusinessError.create("Incorrect email. No user found with this email address.");
			}

			let isMatch = await authRepository.compare(payload.password, user.password);

			if (!isMatch) {
				throw BusinessError.create('Incorrect Password.');
			}

			const token = await authRepository.generate({ uid: user.id.value, scope: user.roles });

			return { token: token };
		};

export { makeGenerateToken };
export type { GenerateToken };
