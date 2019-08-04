interface User {
	id: number;
	email: string;
}

const generateJWT = (user: User, jwt: any): string => {
	return jwt.sign({
		data: {
			id: user.id,
			email: user.email,
		},
	});
};

export { generateJWT };
