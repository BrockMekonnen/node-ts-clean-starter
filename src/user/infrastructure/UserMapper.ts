import { DataMapper } from "@/_lib/DDD";
import { from } from "uuid-mongodb";
import { User } from "../domain/User";
import { UserSchema } from "./UserCollection";
import { UserIdProvider } from "./UserIdProvider";

const UserMapper: DataMapper<User.Type, UserSchema> = {
	toData: (entity: User.Type) => ({
		_id: from(entity.id.value),
		firstName: entity.firstName,
		lastName: entity.lastName,
		phone: entity.phone,
		email: entity.email,
		password: entity.password,
		roles: entity.roles,
		isEmailVerified: entity.isEmailVerified,
		otp: entity.otp,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
		version: entity.version,
	}),
	toEntity: (data: UserSchema) => ({
		id: UserIdProvider.create(from(data._id).toString()),
		firstName: data.firstName,
		lastName: data.lastName,
		phone: data.phone,
		email: data.email,
		password: data.password,
		roles: data.roles,
		otp: data.otp,
		isEmailVerified: data.isEmailVerified,
		createdAt: data.createdAt,
		updatedAt: data.updatedAt,
		version: data.version,
	}),
};

export { UserMapper };
