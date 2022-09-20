import { AuthRepository } from "../domain/AuthRepository";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "d6a6a047d84d6884";

type Credentials = {
	uid: string;
	scope: [];
};

const makeJWTAuthRepository = (): AuthRepository => ({
	async generate(payload: Credentials): Promise<string> {
		return await jwt.sign(payload, JWT_SECRET_KEY);
	},
	async decode(accessToken: string): Promise<Credentials> {
		const credentials: Credentials = await jwt.verify(
			accessToken,
			JWT_SECRET_KEY
		) as Credentials;
		return credentials;
	},
	async hash(plainText: string): Promise<string> {
		return '';
	},
	async compare(plainText: string, hashedText: string): Promise<boolean> {
		return true;
	},
});

export { makeJWTAuthRepository };
