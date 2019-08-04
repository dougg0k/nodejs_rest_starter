export default async (_req: any, _res: any, next: any) => {
	// code and att to index.ts before routes using .use()
	next();
};
