import { asFunction } from "awilix";
import { makeModule } from "@/context";
import {
	GenerateToken,
	makeGenerateToken,
} from "./app/useCases/GetAccessToken";
import { makeVerifyToken, VerifyToken } from "./app/useCases/VerifyAccessToken";
import { AuthRepository } from "./domain/AuthRepository";
import { makeJWTAuthRepository } from "./infrastructure/JWTAuthRepository";
import { authMessages } from "./messages";
import { makeAuthController } from "./interface/routes";
import { HasRole, makeScope } from "./app/useCases/AccessScope";

type AuthRegistry = {
	authRepository: AuthRepository;
	verifyToken: VerifyToken;
	generateToken: GenerateToken;
	hasRole: HasRole;
};

const authModule = makeModule(
	"auth",
	async ({
		container: { register, build },
		messageBundle: { updateBundle },
	}) => {
		updateBundle(authMessages);

		register("authRepository", asFunction(makeJWTAuthRepository));
		register("verifyToken", asFunction(makeVerifyToken));
		register("generateToken", asFunction(makeGenerateToken));
		register("hasRole", asFunction(makeScope));

		build(makeAuthController);
	}
);

export { authModule };
export type { AuthRegistry };
