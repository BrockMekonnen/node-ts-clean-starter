import { AggregateRoot } from "@/_lib/DDD";
import { makeWithInvariants } from "@/_lib/WithInvariants";
import { OTP } from "@/_sharedKernel/domain/entity/OTP";
import { UserId } from "./UserId";

namespace User {

	type User = AggregateRoot<UserId> &
		Readonly<{
			firstName: string;
			lastName: string;
			phone: string;
			email: string;
			password: string;
			otp?: OTP;
			isEmailVerified: boolean;
			roles: string[];
			createdAt: Date;
			updatedAt: Date;
			version: number;
		}>;

	const withInvariants = makeWithInvariants<User>(function (self, assert) {
		assert(self.firstName?.length > 0);
		assert(self.lastName?.length > 0);
		assert(self.phone?.length > 0);
		assert(self.email?.length > 0);
		assert(self.password?.length > 0);
	});

	type UserProps = Readonly<{
		id: UserId;
		firstName: string;
		lastName: string;
		phone: string;
		email: string;
		password: string;
	}>;

	export const create = withInvariants(function (props: UserProps): User {
		return {
			...props,
			roles: ['Employee'],
			otp: undefined,
			isEmailVerified: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			version: 0,
		};
	});

	export const updateOTP = withInvariants(function (
		self: User,
		otp?: OTP
	): User {
		return {
			...self,
			otp,
		};
	});

	export const changePassword = withInvariants(
		(self: User, newPassword: string): User => ({
			...self,
			password: newPassword,
		})
	);

	export const markAsEmailVerified = withInvariants(function (
		self: User
	): User {
		return {
			...self,
			isEmailVerified: true,
		};
	});

	export type Type = User;
}

export { User };
