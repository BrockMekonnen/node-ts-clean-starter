import { User } from "@/user/domain/User";
import { UserRepository } from "@/user/domain/UserRepository";
import { ApplicationService } from "@/_lib/DDD";
import { SendOTPEvent } from '@/user/app/events/SendOTPEvent';
import { eventProvider } from "@/_lib/pubSub/EventEmitterProvider";

type Dependencies = {
	userRepository: UserRepository;
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
	({ userRepository }, enqueue): CreateUser =>
		async (payload) => {
			const id = await userRepository.getNextId();

			const user = User.create({
				id,
				firstName: payload.firstName,
				lastName: payload.lastName,
				phone: payload.phone,
				email: payload.email,
				password: payload.password,
			});

			await userRepository.store(user);

			enqueue(SendOTPEvent.create(user.email, "Verification"));

			return id.value;
		}
)

export { makeCreateUser };
export type { CreateUser };


