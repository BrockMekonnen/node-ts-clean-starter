type OTP = {
	code: string;
	expirationTime: Date;
	verified: boolean;
	for: "Verification" | "2FA" | "Forget";
}

type OTPSchema = {
	code: string;
	expirationTime: Date;
	verified: boolean;
	for: "Verification" | "2FA" | "Forget";
}

export type {OTP, OTPSchema}