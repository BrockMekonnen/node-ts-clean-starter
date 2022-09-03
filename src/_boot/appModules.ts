import { authModule } from "@/auth";
import { userModule, UserRegistry } from "@/user";

type AppModulesConfig = {};

const appModules = [authModule, userModule];

type AppModulesRegistry = UserRegistry;

export { appModules };
export type { AppModulesConfig, AppModulesRegistry };
