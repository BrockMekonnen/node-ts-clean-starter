import { Event } from "@/_lib/events/Event";
import { v4 } from "uuid-mongodb";

namespace SendOTPEvent {
	export const topic = 'OTP' as const;
	export const eventType = 'SendOTPEvent' as const;

	type Params = {
		email: string;
		otpFor: 'Verification' | '2FA' | 'Forget';
	}

	type SendOTPEvent = Event<Params, typeof eventType, typeof topic>;

	export const create = (email: string, otpFor: 'Verification' | '2FA' | 'Forget'): SendOTPEvent => ({
		eventId: v4().toString(),
		eventType,
		topic,
		payload: { email: email, otpFor: otpFor },
	});

	export type Type = SendOTPEvent;
}

export { SendOTPEvent }