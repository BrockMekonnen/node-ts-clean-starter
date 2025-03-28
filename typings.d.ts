// declare namespace Express {
// 	export interface Request {
// 	  id: string;
// 	  container: import("@/container").Container;
// 	  accessToken: any;
// 	  auth: {
// 		isAuthenticated: boolean,
// 		isAuthorized: boolean,
// 		isInjected: boolean,
// 		credentials: { uid: string, scope: []},
// 		artifacts: { accessToken: string },
// 	  }
// 	}
//   }

import { Container } from "@/container"; // Adjust import as needed
import { Request as ExpressRequest } from "express";
import { IncomingMessage } from "http"; // Explicitly import to avoid conflicts

declare module "express-serve-static-core" {
  interface Request extends IncomingMessage {
    id: string; // Make sure this type matches IncomingMessage's id (if exists)
    container: Container;
    accessToken: any;
    auth: {
      isAuthenticated: boolean;
      isAuthorized: boolean;
      isInjected: boolean;
      credentials: { uid: string; scope: [] };
      artifacts: { accessToken: string };
    };
  }
}