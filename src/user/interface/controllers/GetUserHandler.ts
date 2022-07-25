import { GetUser } from "@/user/app/useCases/GetUser";
import { handler } from "@/_lib/http/handler";
import { Request, Response } from "express";

type Dependencies = {
	getUser: GetUser;
};

const getUserHandler = handler(
	({ getUser }: Dependencies) =>
		async (req: Request, res: Response) => {
			// const { userId } = req.params;
			const userId = req.auth.credentials.uid;

			const user = await getUser(userId);

			res.json(user);
		}
);

export { getUserHandler };