import { OTPSchema } from "@/_sharedKernel/domain/entity/OTP";
import { Collection, Db } from "mongodb";
import { MUUID } from "uuid-mongodb";

type UserSchema = {
	_id: MUUID;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	password: string;
	roles: string[];
	otp?: OTPSchema;
	isEmailVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
	version: number;
};

type UserCollection = Collection<UserSchema>;

const initUserCollection = async (db: Db): Promise<UserCollection> => {
	const collection: UserCollection = db.collection("users");

	await collection.createIndex({ phone: 1 }, { unique: true });

	return collection;
};

export { initUserCollection };
export type { UserSchema, UserCollection };
