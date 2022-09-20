import { FindUserById } from "@/user/app/query/FindUserById";
import { handler } from "@/_lib/http/handler";
import { Request, Response } from "express";

type Dependencies = {
	findUserById: FindUserById;
};

const getUserHandler = handler(
	({ findUserById }: Dependencies) =>
		async (req: Request, res: Response) => {

			const userId = req.auth.credentials.uid;

			const result = await findUserById({ filter: { id: userId } });

			res.json(result);
		}
);

export { getUserHandler };