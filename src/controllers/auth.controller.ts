import { conflict, unauthorized } from '@hapi/boom';
import * as argon2 from 'argon2';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { generateJWT } from '../services/auth.service';
import { createUser, findUserByEmail } from '../services/user.service';
import {
	signInUserValidation,
	signUpUserValidation,
} from '../validations/user.validation';

export default async (
	fastify: FastifyInstance,
	_opts: any,
	_next: any,
): Promise<void> => {
	fastify.post(
		'/signup',
		signUpUserValidation,
		async (
			request: FastifyRequest,
			reply: FastifyReply<ServerResponse>,
		): Promise<any> => {
			const { name, email, password } = request.body;
			const user = await findUserByEmail(email);
			if (user) {
				reply.status(409).send(conflict('User already exists'));
				return false;
			}
			const userCreated = await createUser({ name, email, password });
			if (userCreated) {
				reply.status(201).send({ message: 'User successfully created!' });
			}
		},
	);

	fastify.post(
		'/signin',
		signInUserValidation,
		async (
			request: FastifyRequest,
			reply: FastifyReply<ServerResponse>,
		): Promise<any> => {
			const { email, password } = request.body;
			const user = await findUserByEmail(email);

			if (!user) {
				reply.status(401).send(unauthorized());
				return false;
			}

			const valid = argon2.verify(user.password, password);
			if (!valid) {
				reply.status(401).send(unauthorized());
				return false;
			}

			const generatedToken = generateJWT(user, fastify.jwt);
			reply.status(200).send({ token: generatedToken, user: { email } });
		},
	);
};
