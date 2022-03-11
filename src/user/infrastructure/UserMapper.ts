import { DataMapper } from "@/_lib/DDD";
import { from } from "uuid-mongodb";
import { User } from "../domain/User";
import { UserSchema } from "./UserCollection";
import { UserIdProvider } from "./UserIdProvider";

const UserMapper: DataMapper<User.Type, UserSchema> = {
	toOrmEntity: (domainEntity: User.Type) => ({
		_id: from(domainEntity.id.value),
		firstName: domainEntity.firstName,
		lastName: domainEntity.lastName,
		phone: domainEntity.phone,
		email: domainEntity.email,
		password: domainEntity.password,
		gender: domainEntity.gender,
		role: domainEntity.role,
		createdAt: domainEntity.createdAt,
		updatedAt: domainEntity.updatedAt,
		version: domainEntity.version,
	}),
	toOrmEntities: function (ormEntities: User.Type[]) {
		return ormEntities.map( entity => this.toOrmEntity(entity));
	},
	toDomainEntity: (domainEntity: UserSchema) => ({
		id: UserIdProvider.create(from(domainEntity._id).toString()),
		firstName: domainEntity.firstName,
		lastName: domainEntity.lastName,
		phone: domainEntity.phone,
		email: domainEntity.email,
		password: domainEntity.password,
		gender: domainEntity.gender,
		role: domainEntity.role,
		createdAt: domainEntity.createdAt,
		updatedAt: domainEntity.updatedAt,
		version: domainEntity.version,
	}),
	toDomainEntities: function (domainEntities: any[]) {
		return domainEntities.map( entity => this.toDomainEntity(entity));
	}
};

export { UserMapper };
