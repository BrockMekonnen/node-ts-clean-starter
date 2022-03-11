import { ApplicationService } from "@/_lib/DDD";

type ScopeParams = {
	userScope: [];
	allowedScope: [];
};

type HasRole = ApplicationService<ScopeParams, boolean>;

const makeScope = (): HasRole => async (payload) => {
	const { userScope, allowedScope } = payload;

	const isFound = userScope.some((role) => allowedScope.includes(role));

	return isFound;
};

export { makeScope };
export type { HasRole };
