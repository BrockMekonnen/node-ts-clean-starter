import { AuthRepository } from "../domain/AuthRepository";
const jwt = require("jsonwebtoken");
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
		);
		return credentials;
	},
});

export { makeJWTAuthRepository };
