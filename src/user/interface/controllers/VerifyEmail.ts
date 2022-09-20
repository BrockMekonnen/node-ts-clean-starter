import { VerifyEmailWithOTP } from "@/user/app/usecases/VerifyEmailWithOTP"
import { handler } from "@/_lib/http/handler";
import { makeValidator } from "@/_lib/http/validation/Validator";
import Joi from "types-joi"
import { HttpStatus } from '@/_lib/http/HttpStatus';

type Dependencies = {
	verifyEmailWithOTP: VerifyEmailWithOTP;
}

const { getBody } = makeValidator({
	body: Joi.object({
		code: Joi.string().length(6).required(),
		email: Joi.string().email().required(),
	}).required(),
});

const verifyEmailHandler = handler(({ verifyEmailWithOTP }: Dependencies) =>
	async (req, res) => {
		let { code, email } = getBody(req);

		const token = await verifyEmailWithOTP({ otpCode: code, email: email });

		res.status(HttpStatus.OK).json({ 'token': token });
	});

export { verifyEmailHandler }