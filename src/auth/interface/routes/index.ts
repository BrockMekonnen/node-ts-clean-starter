import { Router } from "express";
import { Scope } from "../controllers/AccessScopeHandler";
import { generateTokenHandler } from "../controllers/GetTokenHandler";
import { verifyTokenHandler } from "../controllers/VerifyTokenHandler";

type Dependencies = {
	apiRouter: Router;
};

const makeAuthController = ({ apiRouter }: Dependencies) => {
	const router = Router();

	router.get("/auth", verifyTokenHandler, Scope(['Employee', 'Admin']), (req, res) => {
		res.json(req.auth);
	});
	router.post("/users/login", generateTokenHandler);

	apiRouter.use(router);
};

export { makeAuthController };
