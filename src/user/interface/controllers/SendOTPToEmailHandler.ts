import { SendOTPToEmail } from "@/user/app/usecases/SendOTPToEmail"
import { handler } from "@/_lib/http/handler";
import { HttpStatus } from "@/_lib/http/HttpStatus";
import { makeValidator } from "@/_lib/http/validation/Validator";
import Joi from "types-joi";

type Dependencies = {
	sendOTPToEmail: SendOTPToEmail;
};

const { getBody } = makeValidator({
	body: Joi.object({
		email: Joi.string().required(),
	}).required(),
});



const sendOTPToEmailHandler = (otpFor: 'Forget' | 'Verification' | '2FA') =>
	handler(({ sendOTPToEmail }: Dependencies) =>
		async (req, res) => {
			let { email } = getBody(req);

			await sendOTPToEmail({ email, otpFor: otpFor });

			res.status(HttpStatus.OK).send();
		});

export { sendOTPToEmailHandler };