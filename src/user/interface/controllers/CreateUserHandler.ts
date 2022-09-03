
import { CreateUser } from "@/user/app/usecases/CreateUser";
import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";
import { makeValidator } from "@/_lib/http/validation/Validator";
import { Request, Response } from "express";
import Joi from 'types-joi';

type Dependencies = {
	createUser: CreateUser;
};

const { getBody } = makeValidator({
	body: Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		phone: Joi.string().required(),
		email: Joi.string().required(),
		password: Joi.string().required(),
		gender: Joi.string().valid('Male', 'Female').required(),
		roles: Joi.array().items(Joi.string()).required(),
	}).required(),
});

const createUserHandler = handler(
	({ createUser }: Dependencies) =>
		async (req: Request, res: Response) => {
			let {
				firstName,
				lastName,
				phone,
				email,
				password,
				gender,
				roles,
			} = getBody(req);

			const userId = await createUser({
				firstName,
				lastName,
				phone,
				email,
				password,
				gender,
				roles,
			});

			res.status(HttpStatus.CREATED).json({ id: userId });
		}
);

export { createUserHandler };
