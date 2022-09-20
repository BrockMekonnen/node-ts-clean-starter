import { asFunction } from "awilix";
import { makeModule } from "@/context";
import {
	GenerateToken,
	makeGenerateToken,
} from "./app/usecases/GetAccessToken";
import { makeVerifyToken, VerifyToken } from "./app/usecases/VerifyAccessToken";
import { AuthRepository } from "./domain/AuthRepository";
import { makeJWTAuthRepository } from "./infrastructure/AuthRepository";
import { makeAuthController } from "./interface/routes";
import { HasRole, makeScope } from "./app/usecases/AccessScope";

type AuthRegistry = {
	authRepository: AuthRepository;
	verifyToken: VerifyToken;
	generateToken: GenerateToken;
	hasRole: HasRole;
};

const authModule = makeModule(
	"auth",
	async ({
		container: { register }, initialize,
	}) => {

		register("authRepository", asFunction(makeJWTAuthRepository));
		register("verifyToken", asFunction(makeVerifyToken));
		register("generateToken", asFunction(makeGenerateToken));
		register("hasRole", asFunction(makeScope));

		await initialize(makeAuthController);
	}
);

export { authModule };
export type { AuthRegistry };
