import { User } from "@/user/domain/User";
import { UserRepository } from "@/user/domain/UserRepository"
import { ApplicationService } from "@/_lib/DDD";
import { OTP } from "@/_sharedKernel/domain/entity/OTP";
import dayjs from "dayjs";
import { BusinessError } from '@/_sharedKernel/domain/error/BusinessError';

type Dependencies = {
	userRepository: UserRepository;
}

type GetOTPDTO = {
	email: string;
	otpFor: '2FA' | 'Verification' | 'Forget';
};

type GetOTP = ApplicationService<GetOTPDTO, string>;

const makeGetOTP = ({ userRepository }: Dependencies): GetOTP =>
	async (payload) => {
		const code = Math.floor(100000 + Math.random() * 900000).toString();

		const expirationTime: Date = dayjs().add(15, 'm').toDate();

		const otp: OTP = {
			code,
			expirationTime,
			verified: false,
			for: payload.otpFor,
		}

		let user = await userRepository.findByEmail(payload.email);
		if (user) {
			user = User.updateOTP(user, otp);
			await userRepository.store(user);
		} else {
			throw BusinessError.create('Error occurred sending otp. try again!');
		}

		return code;
	}

export { makeGetOTP };
export type { GetOTP };