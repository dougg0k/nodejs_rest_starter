const isDev = process.env.NODE_ENV === 'development';
module.exports = {
	type: 'postgres',
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DB,
	logging: isDev,
	synchronize: isDev,
	entities: isDev ? ['src/models/**/*'] : ['models/**/*'],
	migrations: isDev ? ['src/migrations/**/*'] : ['migrations/**/*'],
	subscribers: isDev ? ['src/subscribers/**/*'] : ['subscribers/**/*'],
	'cli.entitiesdockerDir': 'src/models/',
	'cli.migrationsDir': 'src/migrations/',
	'cli.subscribersDir': 'src/subscribers/',
};
