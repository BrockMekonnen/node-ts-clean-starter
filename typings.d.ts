declare namespace Express {
	export interface Request {
	  id: string;
	  container: import("@/container").Container;
	  accessToken: any;
	  auth: {
		isAuthenticated: boolean,
		isAuthorized: boolean,
		isInjected: boolean,
		credentials: { uid: string, scope: []},
		artifacts: { accessToken: string },
	  }
	}
  }
  