const signUpUserValidation = {
	schema: {
		body: {
			type: 'object',
			properties: {
				name: { type: 'string' },
				email: { type: 'string', format: 'email' },
				password: {
					type: 'string',
					minLength: 8,
					maxLength: 64,
				},
			},
			required: ['email', 'password'],
		},
	},
};

const signInUserValidation = {
	schema: {
		body: {
			type: 'object',
			properties: {
				email: { type: 'string', format: 'email' },
				password: {
					type: 'string',
				},
			},
			required: ['email', 'password'],
		},
	},
};

export { signUpUserValidation, signInUserValidation };
