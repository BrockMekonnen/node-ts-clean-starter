import { GenerateToken } from "@/auth/app/usecases/GetAccessToken";
import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";
import { makeValidator } from "@/_lib/http/validation/Validator";
import { Request, Response } from "express";
import Joi from "types-joi";

type Dependencies = {
	generateToken: GenerateToken;
};

const { getBody } = makeValidator({
	body: Joi.object({
		email: Joi.string().required(),
		password: Joi.string().required(),
	}).required(),
});

const generateTokenHandler = handler(
	({ generateToken }: Dependencies) =>
		async (req: Request, res: Response) => {
			const { email, password } = getBody(req);

			const result = await generateToken({ email, password });

			res.status(HttpStatus.ACCEPTED).json(result);
		}
);

export { generateTokenHandler };
