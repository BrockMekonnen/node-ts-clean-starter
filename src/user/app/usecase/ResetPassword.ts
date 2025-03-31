import { AuthRepository } from "@/auth/domain/AuthRepository";
import { User } from "@/user/domain/User";
import { UserRepository } from "@/user/domain/UserRepository";
import { ApplicationService } from "@/_lib/DDD";
import { BusinessError } from "@/_sharedKernel/domain/error/BusinessError";
import dayjs from "dayjs";

type Dependencies = {
	userRepository: UserRepository;
	authRepository: AuthRepository;
}

type ResetPasswordDTO = Readonly<{
	email: string;
	otpCode: string;
	password: string;
}>;

type ResetPassword = ApplicationService<ResetPasswordDTO, void>;

const makeResetPassword = ({ userRepository, authRepository }: Dependencies): ResetPassword =>
	async (payload) => {
		let user = await userRepository.findByEmail(payload.email);

		if (!user) {
			throw BusinessError.create('Error Occurred while resetting your password.');
		}

		if (user.otp) {
			if (user.otp.for === "Forget") {
				if (!dayjs().isAfter(user.otp.expirationTime)) {
					if (payload.otpCode === user.otp.code) {
						var hashedPassword = await authRepository.hash(payload.password);

						user = User.changePassword(user, hashedPassword);
						user = User.updateOTP(user, undefined);

						await userRepository.store(user);
					} else {
						throw BusinessError.create("OTP code not equal");
					}
				} else {
					throw BusinessError.create("OTP code has expired");
				}
			} else {
				throw BusinessError.create("Using OTP for unintended way is not valid.");
			}
		} else {
			throw BusinessError.create("OTP does not exist");
		}

		return;
	}

export { makeResetPassword };
export type { ResetPassword };