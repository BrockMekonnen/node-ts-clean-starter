import { HasRole } from "@/auth/app/usecases/AccessScope";
import { ForbiddenError } from "@/_lib/errors/ForbiddenError";
import { handler } from "@/_lib/http/handler";
import { NextFunction, Request, Response } from "express";

type Dependencies = {
	hasRole: HasRole;
};

const Scope = (allowedScope) =>
	handler(
		({ hasRole }: Dependencies) =>
			async (req: Request, res: Response, next: NextFunction) => {
				const userScope = req.auth.credentials.scope;
				const result = await hasRole({ userScope, allowedScope });
				if (result) {
					next();
				} else {
					throw ForbiddenError.create("Inefficient Scope");
				}
			}
	);

export { Scope };
