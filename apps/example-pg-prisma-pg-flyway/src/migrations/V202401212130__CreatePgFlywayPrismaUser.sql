-- CreateTable
CREATE TABLE IF NOT EXISTS "PgFlywayPrismaUser"(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "externalUserId" uuid NOT NULL,
    "createdAt" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PK_PG_FLYWAY_PRISMA_USER" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "UQ_PG_FLYWAY_PRISMA_USER" ON "PgFlywayPrismaUser"("externalUserId");

