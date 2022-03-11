type AggregateId<T> = {
	value: T;
};

type AggregateRoot<ID extends AggregateId<any>> = {
	readonly id: ID;
};

type Repository<
	T extends AggregateRoot<any>,
	ID extends AggregateId<any> = T["id"]
> = {
	getNextId(): Promise<ID>;
	store(entity: T): Promise<void>;
};

type ApplicationService<P, R> = (payload: P) => Promise<R>;

type DataMapper<AR extends AggregateRoot<any>, DATA> = {
	toDomainEntity(ormEntity: DATA): AR;
	toDomainEntities(ormEntities: any[]): AR[];
	toOrmEntity(domainEntity: AR): DATA;
	toOrmEntities(domainEntities: AR[]): DATA[];
};

export {
	AggregateId,
	AggregateRoot,
	Repository,
	ApplicationService,
	DataMapper,
};
