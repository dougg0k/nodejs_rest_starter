## NodeJS + Fastify REST + TypeORM + JWT Auth + Typescript + Kubernetes + Docker - Starter

Usage:
```
git clone git@github.com:dougg0k/nodejs_rest_starter.git
```

Check .env.example

## Dev:

- Type `npm start` with a postgres instance running or use Docker: `docker-compose -f docker-compose.dev.yml up -d` to start development
- You can watch logs by using `docker logs container-id -f`
- Follow, for best practices: https://github.com/i0natan/nodebestpractices

## Production:

- You need to alter k8s files as needed with your own data
- Add proper variables to GitLab accordingly to .gitlab-ci.yml needs
