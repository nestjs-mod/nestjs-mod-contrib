CREATE TABLE IF NOT EXISTS "TwoFactorUser"(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "username" varchar(255),
    "secret" varchar(100) NOT NULL,
    "externalTenantId" uuid NOT NULL,
    "externalUserId" uuid NOT NULL,
    "createdAt" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PK_TWO_FACTOR_USER" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "UQ_TWO_FACTOR_USER" ON "TwoFactorUser"("externalTenantId", "externalUserId");

CREATE INDEX IF NOT EXISTS "IDX_TWO_FACTOR_USER__EXTERNAL_TENANT_ID" ON "TwoFactorUser"("externalTenantId");

---
CREATE TABLE IF NOT EXISTS "TwoFactorCode"(
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    "type" varchar(512) NOT NULL,
    "operationName" varchar(512) NOT NULL,
    "code" varchar(100) NOT NULL,
    "used" boolean NOT NULL,
    "outdated" boolean NOT NULL,
    "userId" uuid NOT NULL,
    "externalTenantId" uuid NOT NULL,
    "createdAt" timestamp DEFAULT now() NOT NULL,
    "updatedAt" timestamp DEFAULT now() NOT NULL
);

DO $$
BEGIN
    ALTER TABLE "TwoFactorCode"
        ADD CONSTRAINT "PK_TWO_FACTOR_CODES" PRIMARY KEY(id);
EXCEPTION
    WHEN invalid_table_definition THEN
        NULL;
END
$$;

DO $$
BEGIN
    ALTER TABLE "TwoFactorCode"
        ADD CONSTRAINT "FK_TWO_FACTOR_CODES__USER_ID" FOREIGN KEY("userId") REFERENCES "TwoFactorUser";
EXCEPTION
    WHEN duplicate_object THEN
        NULL;
END
$$;

CREATE UNIQUE INDEX IF NOT EXISTS "UQ_TWO_FACTOR_CODES" ON "TwoFactorCode"("userId", "operationName", "type", "code", "externalTenantId");

CREATE INDEX IF NOT EXISTS "IDX_TWO_FACTOR_CODES__USER_ID" ON "TwoFactorCode"("userId", "externalTenantId");

CREATE INDEX IF NOT EXISTS "IDX_TWO_FACTOR_CODES__EXTERNAL_TENANT_ID" ON "TwoFactorCode"("externalTenantId");

