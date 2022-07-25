import { VerifyToken } from "@/auth/app/usecases/VerifyAccessToken";
import { BadRequestError } from "@/_lib/errors/BadRequestError";
import { handler } from "@/_lib/http/handler";
import { NextFunction, Request, Response } from "express";

type Dependencies = {
	verifyToken: VerifyToken;
};

const verifyTokenHandler = handler(
	({ verifyToken }: Dependencies) =>
		async (req: Request, res: Response, next: NextFunction) => {
			const authorizationHeader = req.headers.authorization;

			if (
				!authorizationHeader ||
				!authorizationHeader.startsWith("Bearer ")
			) {
				throw BadRequestError.create(
					"Missing or wrong Authorization request header"
				);
			}

			const accessToken = authorizationHeader
				.replace(/Bearer/gi, "")
				.replace(/ /g, "");

			const credentials = await verifyToken(accessToken);
			
			req.auth = {
				isAuthenticated: true,
				isAuthorized: true,
				isInjected: true,
				credentials: { uid: credentials.uid, scope: credentials.scope },
				artifacts: { accessToken: accessToken }
			}

			next();
		}
);

export { verifyTokenHandler };