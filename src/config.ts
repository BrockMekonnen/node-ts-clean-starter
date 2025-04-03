import { MainConfig } from '@/_boot';
import { environment, EnvironmentConfig, envNumber, envString } from '@/_lib/Environment';

type Configuration = MainConfig & EnvironmentConfig;

const config: Configuration = {
	appName: 'clean-node-ts-api',
	cli: process.argv.includes('--cli'),
	environment: environment(),
	repl: {
		port: envNumber('REPL_PORT', 2580),
	},
	http: {
		host: envString('HOST', '0.0.0.0'),
		port: envNumber('PORT', 3000),
		cors: true,
	},
	swagger: {
		title: 'Template API',
		version: '1.0.0',
		basePath: '/api',
		docEndpoint: '/api-docs',
	},
	mongodb: {
		database: envString('DB_NAME', 'ts-clean-starter'),
		host: envString('DB_HOST', 'mongodb://127.0.0.1:27017'),
		username: envString('DB_USER', 'root'),
		password: envString('DB_PASS', 'example'),
	},
};

export { config };
export type { Configuration };


