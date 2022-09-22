import { ResetPassword } from "@/user/app/usecases/ResetPassword";
import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";
import { makeValidator } from "@/_lib/http/validation/Validator";
import Joi from "types-joi";

type Dependencies = {
	resetPassword: ResetPassword;
};

const { getBody } = makeValidator({
	body: Joi.object({
		email: Joi.string().required(),
		code: Joi.string().required(),
		password: Joi.string().required(),
	}).required(),
});

const resetPasswordHandler = handler(({ resetPassword }: Dependencies) =>
	async (req, res) => {
		let { password, code, email } = getBody(req);

		await resetPassword({ email, password, otpCode: code });

		res.status(HttpStatus.OK).send();
	});

export { resetPasswordHandler };