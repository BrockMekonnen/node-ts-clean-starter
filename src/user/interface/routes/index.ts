import { Scope } from "@/auth/interface/controllers/AccessScopeHandler";
import { verifyTokenHandler } from "@/auth/interface/controllers/VerifyTokenHandler";
import { Router } from "express";
import { createUserHandler } from "../controllers/CreateUserHandler";
import { getUserHandler } from "../controllers/GetUserHandler";
import { listUsersHandler } from "../controllers/ListUsersHandler";

type Dependencies = {
	apiRouter: Router;
};

const makeUserController = ({ apiRouter }: Dependencies) => {
	const router = Router();

	router.get("/users", verifyTokenHandler, Scope(['Employee', 'Admin']), listUsersHandler);
	router.post("/users", createUserHandler);
	router.get("/users/:userId", verifyTokenHandler, getUserHandler);

	apiRouter.use(router);
};

export { makeUserController };
