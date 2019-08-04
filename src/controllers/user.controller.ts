import { notFound } from '@hapi/boom';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { findUserByEmail } from '../services/user.service';

export default async (
	fastify: FastifyInstance,
	_opts: any,
	_next: any,
): Promise<void> => {
	fastify.get(
		'/',
		{
			preValidation: [fastify.authenticate],
		},
		async (_request: FastifyRequest, reply: FastifyReply<ServerResponse>) => {
			fastify.socketio.on('some-channel', (socket: any) => {
				socket.emit('for-users', { msg: 'Hello' });
			});
			reply.code(200).send({ users: [{ name: 'User1' }, { name: 'User2' }] });
		},
	);

	fastify.get(
		'/me',
		{
			preValidation: [fastify.authenticate],
		},
		async (request: any, reply: FastifyReply<ServerResponse>) => {
			const user = await findUserByEmail(request.user.data.email);
			if (user) {
				delete user.password;
				reply.status(200).send(user);
			} else {
				reply.status(404).send(notFound('Not found, something went wrong'));
			}
		},
	);
};
