import { makePredicate } from "@/_lib/Predicate";
import { BaseError, Exception } from "@/_lib/errors/BaseError";

namespace BadRequestError {
	const type = Symbol();
	const code = "BadRequestError";

	export const create = (message: string): Exception =>
		new BaseError({ type, code, message });

	export const is = makePredicate<Exception>(type);
}

export { BadRequestError };
