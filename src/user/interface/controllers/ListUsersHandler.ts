import { ListUser } from "@/user/app/useCases/ListUsers";
import { handler } from "@/_lib/http/handler";
import { makePaginator } from "@/_lib/http/validation/Paginator";
import { Request, Response } from "express";

type Dependencies = {
	listUsers: ListUser;
};

const { getPagination } = makePaginator();

const listUsersHandler = handler(
	({ listUsers }: Dependencies) =>
		async (req: Request, res: Response) => {
			const pagination = getPagination(req);
			
			const users = await listUsers({ pagination });

			res.json(users);
		}
);

export { listUsersHandler };
