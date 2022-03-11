import { PaginatedQueryResult } from "@/_lib/CQRS";
import { Repository } from "@/_lib/DDD";
import { User } from "./User";

type UserRepository = Repository<User.Type> & {
	findById(id: string): Promise<User.Type>;
	findByPhone(phone: string): Promise<User.Type>;
	findUsers(pagination): Promise<PaginatedQueryResult<User.Type[]>>;
};

export { UserRepository };