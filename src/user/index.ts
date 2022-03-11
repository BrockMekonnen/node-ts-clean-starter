import { asFunction } from "awilix";
import { withMongoProvider } from "@/_lib/MongoProvider";
import { toContainerValues } from "@/_lib/di/containerAdapters";
import {
	initUserCollection,
	UserCollection,
} from "./infrastructure/UserCollection";
import { userMessages } from "./messages";
import { makeMongoUserRepository } from "./infrastructure/UserRepositoryMongo";
import { CreateUser, makeCreateUser } from "./app/useCases/CreateUser";
import { GetUser, makeGetUser } from "./app/useCases/GetUser";
import { ListUser, makeListUser } from "./app/useCases/ListUsers";
import { UserRepository } from "./domain/UserRepository";
import { makeModule } from "@/context";
import { makeUserController } from "./interface/routes";

type UserRegistry = {
	userCollection: UserCollection;
	userRepository: UserRepository;
	createUser: CreateUser;
	getUser: GetUser;
	listUsers: ListUser;
};

const userModule = makeModule(
	"user",
	async ({
		container: { register, build },
		messageBundle: { updateBundle },
	}) => {
		const collections = await build(
			withMongoProvider({
				userCollection: initUserCollection,
			})
		);

		updateBundle(userMessages);

		register({
			...toContainerValues(collections),
			userRepository: asFunction(makeMongoUserRepository),
			createUser: asFunction(makeCreateUser),
			getUser: asFunction(makeGetUser),
			listUsers: asFunction(makeListUser),
		});

		build(makeUserController);
	}
);

export { userModule };
export type { UserRegistry };
