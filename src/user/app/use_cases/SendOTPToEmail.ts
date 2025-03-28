import { UserRepository } from "@/user/domain/UserRepository"
import { ApplicationService } from "@/_lib/DDD";
import { eventProvider } from "@/_lib/pubSub/EventEmitterProvider";
import { BusinessError } from "@/_sharedKernel/domain/error/BusinessError";
import { SendOTPEvent } from "../events/SendOTPEvent";

type Dependencies = {
	userRepository: UserRepository;
}

type SendOTPEmailDTO = Readonly<{
	email: string;
	otpFor: 'Forget' | 'Verification' | '2FA';
}>;

type SendOTPToEmail = ApplicationService<SendOTPEmailDTO, void>;

const makeSendOTPToEmail = eventProvider<Dependencies, SendOTPToEmail>(
	({ userRepository }, enqueue): SendOTPToEmail => async (payload) => {
		let user = await userRepository.findByEmail(payload.email);

		if (!user) {
			throw BusinessError.create('user not found');
		}

		enqueue(SendOTPEvent.create(user.email, payload.otpFor));
	}
);

export { makeSendOTPToEmail }
export type { SendOTPToEmail }