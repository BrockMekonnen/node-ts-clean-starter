import { AuthRepository } from "@/auth/domain/AuthRepository";
import { User } from "@/user/domain/User";
import { UserRepository } from "@/user/domain/UserRepository"
import { ApplicationService } from "@/_lib/DDD";
import { BusinessError } from "@/_sharedKernel/domain/error/BusinessError";
import dayjs from "dayjs";

type Dependencies = {
	userRepository: UserRepository;
	authRepository: AuthRepository;
}

type VerifyEmailDTO = {
	otpCode: string;
	email: string;
}

type VerifyEmailWithOTP = ApplicationService<VerifyEmailDTO, string>;

const makeVerifyEmailWithOTP = ({ userRepository, authRepository }: Dependencies): VerifyEmailWithOTP => async (payload) => {
	let user = await userRepository.findByEmail(payload.email);

	if (!user) {
		throw BusinessError.create('Could not found user by email');
	}

	if (user.otp) {
		if (user.otp.verified != true) {
			if (!dayjs().isAfter(user.otp.expirationTime)) {
				if (payload.otpCode === user.otp.code) {
					user = User.markAsEmailVerified(user);
					user = User.updateOTP(user, undefined);

					await userRepository.store(user);
				} else {
					throw BusinessError.create("OTP code not equal");
				}
			} else {
				throw BusinessError.create("OTP code has expired");
			}
		} else {
			throw BusinessError.create("OTP code has been used");
		}
	} else {
		throw BusinessError.create("OTP does not exist");
	}

	return authRepository.generate({ uid: user.id.value, scope: user.roles });
}

export { makeVerifyEmailWithOTP };
export type { VerifyEmailWithOTP };