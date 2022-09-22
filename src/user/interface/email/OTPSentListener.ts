import { SendOTPEvent } from "@/user/app/events/SendOTPEvent";
import { GetOTP } from "@/user/app/usecases/GetOTP"
import { eventConsumer } from "@/_lib/pubSub/EventEmitterConsumer";
import { Logger } from "pino";
import nodemailer from "nodemailer";

type Dependencies = {
	getOTP: GetOTP;
	logger: Logger;
};

const verifyEmailMessage = (otp) => {
	return (
		`Dear User, \n\n` +
		"One Time Password for your email verification is : \n\n" +
		`${otp}\n\n` +
		"This is a auto-generated email. Please do not reply to this email.\n\n" +
		"Regards\n"
	);
};

const forgetPasswordMessage = (otp) => {
	return (
		`Dear User, \n\n` +
		"One Time Password for Reset Password is : \n\n" +
		`RP -${otp}\n\n` +
		"This is a auto-generated email. Please do not reply to this email.\n\n" +
		"Regards\n"
	);
};

const makeOTPSentListener = eventConsumer<SendOTPEvent.Type, Dependencies>(
	SendOTPEvent,
	({ getOTP, logger }) =>
		async (event) => {
			const code = await getOTP({
				email: event.payload.email,
				otpFor: event.payload.otpFor,
			});

			let emailSubject;
			let emailMessage;

			if (event.payload.otpFor === 'Verification') {
				emailSubject = 'One Time Password: For Email Verification';
				emailMessage = verifyEmailMessage(code);
			} else if (event.payload.otpFor === 'Forget') {
				emailSubject = 'One Time Password: For Reset Password';
				emailMessage = forgetPasswordMessage(code);
			}

			try {
				var transporter = nodemailer.createTransport({
					host: "smtp.mailtrap.io",
					port: "2525",
					auth: {
						user: "21ba117401d319",
						pass: "af03ec7ed0554b",
					},
				});
			} catch (error) {
				console.log(error);
			}

			var mailOptions = {
				from: "cleanArc@test.com",
				to: event.payload.email,
				subject: emailSubject,
				text: emailMessage,
			};

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					logger.info(error);
				} else {
					logger.info("Verification Code Sent to " + event.payload.email);
				}
			});

		});

export { makeOTPSentListener };

