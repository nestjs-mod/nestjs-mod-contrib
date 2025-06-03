export type TransactionPrismaClient<T> = Omit<
    T,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;