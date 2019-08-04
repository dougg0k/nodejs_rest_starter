import * as dotenv from 'dotenv';
import * as fastify from 'fastify';
import * as cors from 'fastify-cors';
import * as helmet from 'fastify-helmet';
import * as jwt from 'fastify-jwt';
import * as rateLimiter from 'fastify-rate-limit';
import * as logProcessErrors from 'log-process-errors';
import 'reflect-metadata';
import * as socketIO from 'socket.io';
import { createConnection } from 'typeorm';
import authController from './controllers/auth.controller';
import userController from './controllers/user.controller';

logProcessErrors();
dotenv.config();

const setupApp = (): fastify.FastifyInstance => {
	const app = fastify({
		logger: {
			level: 'info',
		},
	});
	const io = socketIO(app.server);

	app
		.register(helmet)
		.register(cors, {
			credentials: true,
			origin: process.env.CORS_ORIGIN,
		})
		.register(rateLimiter, {
			timeWindow: 15 * 60 * 1000, // 15 minutes
			max: 10000, // limit each IP to X requests per timeWindow
		})
		.register(jwt, {
			secret: process.env.JWT_SECRET as string,
			sign: {
				expiresIn: '6 hours',
			},
		})
		.decorate('authenticate', async (request: any, reply: any) => {
			try {
				await request.jwtVerify();
			} catch (err) {
				reply.send(err);
			}
		})
		.decorate('socketio', io)
		.register(authController, { prefix: '/auth' })
		.register(userController, { prefix: '/users' });

	return app;
};

const watchForErrors = (app: any, dbConn: any): void => {
	process.on('uncaughtException', error => {
		app.log.error(`${new Date().toUTCString()} - uncaughtException: `, error);
		process.exit(1);
	});
	process.on('unhandledRejection', error => {
		app.log.error('uncaughtRejection: ', error);
	});
	process.on('SIGINT', async () => {
		try {
			await dbConn.close();
			process.exit(0);
		} catch (err) {
			process.exit(1);
		}
	});
};

const startServer = async (): Promise<void> => {
	const dbConn = await createConnection();
	const app = setupApp();

	const PORT = Number(process.env.APP_PORT) || 4000;
	app.listen({ port: PORT }, () =>
		console.log(`🚀 Server ready at port ${PORT}`),
	);

	watchForErrors(app, dbConn);
};

startServer();
