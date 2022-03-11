type AuthRepository = {
	generate(payload): Promise<string>;
	decode(accessToken: string);
};

export { AuthRepository };
