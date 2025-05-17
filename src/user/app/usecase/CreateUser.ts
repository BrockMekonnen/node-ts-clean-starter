import { User } from "@/user/domain/User";
import { UserRepository } from "@/user/domain/UserRepository";
import { ApplicationService } from "@/_lib/DDD";
import { SendOTPEvent } from '@/user/app/events/SendOTPEvent';
import { eventProvider } from "@/_lib/pubSub/EventEmitterProvider";
import { AuthRepository } from "@/auth/domain/AuthRepository";
import { BusinessError } from "@/_shared/domain/error/BusinessError";

type Dependencies = {
	userRepository: UserRepository;
	authRepository: AuthRepository;
};

type CreateUserDTO = Readonly<{
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	isTermAndConditionAgreed: boolean;
}>;

type CreateUser = ApplicationService<CreateUserDTO, string>;

const makeCreateUser = eventProvider<Dependencies, CreateUser>(
	({ userRepository, authRepository }, enqueue): CreateUser =>
		async (payload) => {
			//* check if phone exists
			try {
				const user = await userRepository.findByPhone(payload.phone);
				if (user) {
					throw BusinessError.create("User already exists by the provided phone number.")
				}
			} catch (error) {
				//* continue
			}

			//* check if email exists
			try {
				const user = await userRepository.findByEmail(payload.email);
				if (user) {
					throw BusinessError.create("User already exists by the provided email address.")
				}
			} catch (error) {
				//* continue
			}

			const id = await userRepository.getNextId();

			let hashedPassword = await authRepository.hash(payload.password);

			const user = User.create({
				id,
				firstName: payload.firstName,
				lastName: payload.lastName,
				phone: payload.phone,
				email: payload.email.toLowerCase(),
				password: hashedPassword,
			});

			await userRepository.store(user);

			enqueue(SendOTPEvent.create(user.email, "Verification"));

			return id.value;
		}
)

export { makeCreateUser };
export type { CreateUser };


