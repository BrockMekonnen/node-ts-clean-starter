import { Scope } from "@/auth/interface/controllers/AccessScopeHandler";
import { verifyTokenHandler } from "@/auth/interface/controllers/VerifyTokenHandler";
import { Router } from "express";
import { createUserHandler } from "../controllers/CreateUserHandler";
import { getUserHandler } from "../controllers/GetUserHandler";
import { listUsersHandler } from "../controllers/FindUsersHandler";
import { sendOTPToEmailHandler } from "../controllers/SendOTPToEmailHandler";
import { verifyEmailHandler } from "../controllers/VerifyEmail";
import { resetPasswordHandler } from "../controllers/ResetPasswordHandler";

type Dependencies = {
	apiRouter: Router;
};

const makeUserController = ({ apiRouter }: Dependencies) => {
	const router = Router();

	router.get("/users", verifyTokenHandler, Scope(['Employee', 'Admin']), listUsersHandler);
	router.post("/users", createUserHandler);
	router.get("/users/me", verifyTokenHandler, getUserHandler);
	router.post("/users/send-otp", sendOTPToEmailHandler('Verification'));
	router.post("/users/forget-password", sendOTPToEmailHandler('Forget'));
	router.post("/users/reset-password", resetPasswordHandler);
	router.post("/users/me/verify-email", verifyEmailHandler);
	router.get("/users/:userId", verifyTokenHandler, getUserHandler);

	apiRouter.use(router);
};

export { makeUserController };
