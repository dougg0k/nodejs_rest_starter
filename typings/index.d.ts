import { IncomingMessage, Server, ServerResponse } from 'http';

declare module 'fastify' {
	export interface FastifyInstance<
		HttpServer = Server,
		HttpRequest = IncomingMessage,
		HttpResponse = ServerResponse
	> {
		socketio: SocketIO.Server;
		authenticate: any;
	}
	export interface FastifyRequest<HttpRequest> {
		user: any;
	}
}
