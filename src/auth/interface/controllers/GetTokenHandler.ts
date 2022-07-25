import { GenerateToken } from "@/auth/app/usecases/GetAccessToken";
import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";
import { makeValidator } from "@/_lib/http/validation/Validator";
import { NextFunction, Request, Response } from "express";
import Joi from "types-joi";

type Dependencies = {
	generateToken: GenerateToken;
};

const { getBody } = makeValidator({
	body: Joi.object({
		phone: Joi.string().required(),
		password: Joi.string().required(),
	}).required(),
});

const generateTokenHandler = handler(
	({ generateToken }: Dependencies) =>
		async (req: Request, res: Response) => {
			const { phone, password } = getBody(req);

			const accessToken = await generateToken({ phone, password });

			res.status(HttpStatus.ACCEPTED).json({ token: accessToken });
		}
);

export { generateTokenHandler };
