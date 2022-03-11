import { messageSource } from "@/_lib/message/MessageBundle";

type AuthMessages = {
	auth: {
		error: {
			invalidToken: { token: string };
			badCredentials: { phone: string };
			wrongAuthorization: { strategy: string};
		};
		generated: { token: string };
	};
};

const authMessages = messageSource<AuthMessages>({
	auth: {
		error: {
			invalidToken: "Invalid Access token #({{ token }})",
			badCredentials: "Bad Credentials",
			wrongAuthorization: "Missing or wrong Authorization request header #({{ strategy }})"
		},
		generated: "Token Generated #({{ token }})",
	},
});

export { authMessages };
export type { AuthMessages };
