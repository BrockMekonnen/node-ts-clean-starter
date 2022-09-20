type AuthRepository = {
	generate(payload): Promise<string>;
	decode(accessToken: string);
	hash(plainText: string): Promise<string>;
	compare(plainText: string, hashedText: string): Promise<boolean>;
}

export { AuthRepository };
