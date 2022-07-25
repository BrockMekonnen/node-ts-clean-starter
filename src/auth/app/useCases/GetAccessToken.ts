import { AuthRepository } from "@/auth/domain/AuthRepository";
import { useBundle } from "@/messages";
import { UserRepository } from "@/user/domain/UserRepository";
import { ApplicationService } from "@/_lib/DDD";
import { BusinessError } from "@/_sharedKernel/domain/error/BusinessError";

type Dependencies = {
	authRepository: AuthRepository;
	userRepository: UserRepository;
};

type LoginParams = {
	phone: string;
	password: string;
};

type GenerateToken = ApplicationService<LoginParams, string>;

const makeGenerateToken =
	({ authRepository, userRepository }: Dependencies): GenerateToken =>
	async (payload) => {
		const user = await userRepository.findByPhone(payload.phone);

		if (!user) {
			throw BusinessError.create(
				useBundle("auth.error.badCredentials", { phone: payload.phone })
			);
		}

		return authRepository.generate({ uid: user.id.value, scope: user.role });
	};

export { makeGenerateToken };
export type { GenerateToken };
