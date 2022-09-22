import { asFunction } from "awilix";
import { withMongoProvider } from "@/_lib/MongoProvider";
import { toContainerValues } from "@/_lib/di/containerAdapters";
import {
	initUserCollection,
	UserCollection,
} from "./infrastructure/UserCollection";
import { makeMongoUserRepository } from "./infrastructure/UserRepositoryMongo";
import { CreateUser, makeCreateUser } from "./app/usecases/CreateUser";
import { UserRepository } from "./domain/UserRepository";
import { makeModule } from "@/context";
import { makeUserController } from "./interface/routes";
import { FindUsers } from "./app/query/FindUsers";
import { makeMongoFindUsers } from "./infrastructure/FindUsersMongo";
import { makeOTPSentListener } from "./interface/email/OTPSentListener";
import { GetOTP, makeGetOTP } from "./app/usecases/GetOTP";
import { makeSendOTPToEmail, SendOTPToEmail } from "./app/usecases/SendOTPToEmail";
import { makeVerifyEmailWithOTP, VerifyEmailWithOTP } from "./app/usecases/VerifyEmailWithOTP";
import { FindUserById } from '@/user/app/query/FindUserById';
import { makeMongoFindUserById } from "./infrastructure/FindUserByIdMongo";
import { makeResetPassword, ResetPassword } from "./app/usecases/ResetPassword";

type UserRegistry = {
	userCollection: UserCollection;
	userRepository: UserRepository;
	createUser: CreateUser;
	findUserById: FindUserById;
	findUsers: FindUsers;
	getOTP: GetOTP;
	sendOTPToEmail: SendOTPToEmail;
	verifyEmailWithOTP: VerifyEmailWithOTP;
	resetPassword: ResetPassword;
};

const userModule = makeModule("user",
	async ({ container: { register }, initialize }) => {
		const [collections] = await initialize(
			withMongoProvider({
				userCollection: initUserCollection,
			})
		);

		register({
			...toContainerValues(collections),
			userRepository: asFunction(makeMongoUserRepository),
			createUser: asFunction(makeCreateUser),
			findUserById: asFunction(makeMongoFindUserById),
			findUsers: asFunction(makeMongoFindUsers),
			getOTP: asFunction(makeGetOTP),
			sendOTPToEmail: asFunction(makeSendOTPToEmail),
			verifyEmailWithOTP: asFunction(makeVerifyEmailWithOTP),
			resetPassword: asFunction(makeResetPassword),
		});

		await initialize(makeUserController, makeOTPSentListener);
	}
);

export { userModule };
export type { UserRegistry };
