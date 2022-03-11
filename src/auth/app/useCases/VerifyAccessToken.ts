import { AuthRepository } from "@/auth/domain/AuthRepository";
import { useBundle } from "@/messages";
import { ApplicationService } from "@/_lib/DDD";
import { BusinessError } from "@/_sharedKernel/domain/error/BusinessError";

type Dependencies = {
	authRepository: AuthRepository;
};

type Credentials = {
	uid: string;
	scope: [];
};

type VerifyToken = ApplicationService<string, Credentials>;

const makeVerifyToken =
	({ authRepository }: Dependencies): VerifyToken =>
	async (payload: string) => {
		const decoded = await authRepository.decode(payload, );

		if (!decoded) {
			throw BusinessError.create(
				useBundle("auth.error.invalidToken", { token: payload })
			);
		}

		return { uid: decoded.uid, scope: decoded.scope };
	};

export { makeVerifyToken };
export type { VerifyToken };
