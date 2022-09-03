import { asFunction } from "awilix";
import { withMongoProvider } from "@/_lib/MongoProvider";
import { toContainerValues } from "@/_lib/di/containerAdapters";
import {
	initUserCollection,
	UserCollection,
} from "./infrastructure/UserCollection";
import { makeMongoUserRepository } from "./infrastructure/UserRepositoryMongo";
import { CreateUser, makeCreateUser } from "./app/usecases/CreateUser";
import { GetUser, makeGetUser } from "./app/usecases/GetUser";
import { UserRepository } from "./domain/UserRepository";
import { makeModule } from "@/context";
import { makeUserController } from "./interface/routes";
import { FindUsers } from "./app/query/FindUsers";
import { makeMongoFindUsers } from "./infrastructure/FindUsersMongo";

type UserRegistry = {
	userCollection: UserCollection;
	userRepository: UserRepository;
	createUser: CreateUser;
	getUser: GetUser;
	findUsers: FindUsers;
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
			getUser: asFunction(makeGetUser),
			findUsers: asFunction(makeMongoFindUsers),
		});

		await initialize(makeUserController);
	}
);

export { userModule };
export type { UserRegistry };
