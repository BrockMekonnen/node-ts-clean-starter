import { AuthRepository } from "../domain/AuthRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET_KEY = "d6a6a047d84d6884";
const SALTROUNDS = 10;

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
		var hashedPassword = await bcrypt.hash(plainText, SALTROUNDS);
		return hashedPassword;
	},

	async compare(plainText: string, hashedText: string): Promise<boolean> {
		let isMatch = await bcrypt.compare(plainText, hashedText);
		return isMatch;
	},
});

export { makeJWTAuthRepository };
