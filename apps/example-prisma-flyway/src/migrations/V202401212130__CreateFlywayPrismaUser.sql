-- CreateTable
CREATE TABLE "FlywayPrismaUser" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "externalUserId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_FLYWAY_PRISMA_USER" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UQ_FLYWAY_PRISMA_USER" ON "FlywayPrismaUser"("externalUserId");
