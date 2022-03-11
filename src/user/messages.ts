import { messageSource } from "@/_lib/message/MessageBundle";

type UserMessages = {
	user: {
		error: {
			notFound: { id: string };
			alreadyExists: { id: string };
		};
		created: { id: string };
	};
};

const userMessages = messageSource<UserMessages>({
	user: {
		error: {
			alreadyExists:
				"Can't recreate the user #({{ id }}) because it was already created.",
			notFound: "Can't find user #({{ id }})",
		},
		created: "User created with id #({{ id }})",
	},
});

export { userMessages };
export type { UserMessages };