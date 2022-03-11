import { authModule } from "@/auth";
import { AuthMessages } from "@/auth/messages";
import { userModule, UserRegistry } from "@/user";
import { UserMessages } from "@/user/messages";

type AppModuleMessages = UserMessages & AuthMessages;

type AppModuleConfig = {};

const appModules = [authModule, userModule];

type AppModulesRegistry = UserRegistry;

export { appModules };
export type { AppModuleMessages, AppModuleConfig, AppModulesRegistry };
