import { FindUsers } from "@/user/app/query/FindUsers";
import { handler } from "@/_lib/http/handler";
import { makePaginator } from "@/_lib/http/validation/Paginator";
import { Request, Response } from "express";
import Joi from 'types-joi';

type Dependencies = {
	findUsers: FindUsers;
};

const { getFilter, getPagination, getSorter } = makePaginator({
	filter: Joi.object({
		firstName: Joi.string(),
		lastName: Joi.string(),
		gender: Joi.string(),
	}),
});

const listUsersHandler = handler(
	({ findUsers }: Dependencies) =>
		async (req: Request, res: Response) => {
			const filter = getFilter(req);
			const pagination = getPagination(req);
			const sort = getSorter(req);

			const users = await findUsers({ filter, sort, pagination });

			res.json(users);
		}
);

export { listUsersHandler };
