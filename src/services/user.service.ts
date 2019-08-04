import * as argon2 from 'argon2';
import { User } from './../models/User';

interface CreateUser {
	name: string;
	email: string;
	password: string;
}

const findUserByEmail = async (email: string): Promise<User | null> => {
	const user = await User.findOne({ email });
	if (user) {
		return user;
	} else {
		return null;
	}
};

const createUser = async (user: CreateUser): Promise<User | null> => {
	const passwordHashed = await argon2.hash(user.password);
	return await User.create({
		name: user.name,
		email: user.email,
		password: passwordHashed,
	}).save();
};

export { findUserByEmail, createUser };
