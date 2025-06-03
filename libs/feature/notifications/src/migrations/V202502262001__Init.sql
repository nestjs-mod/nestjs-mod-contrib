CREATE TABLE IF NOT EXISTS "NotificationsUser"(
    "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "externalTenantId" uuid NOT NULL,
    "externalUserId" uuid NOT NULL,
    "createdAt" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PK_NOTIFICATIONS_USER" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "UQ_NOTIFICATIONS_USER" ON "NotificationsUser"("externalTenantId", "externalUserId");

CREATE INDEX IF NOT EXISTS "IDX_NOTIFICATIONS_USER__EXTERNAL_TENANT_ID" ON "NotificationsUser"("externalTenantId");

---
CREATE TABLE IF NOT EXISTS "NotificationsEvent"(
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    "type" varchar(512) NOT NULL,
    "operationName" varchar(512) NOT NULL,
    "subject" varchar(512) NOT NULL,
    "html" text NOT NULL,
    "text" text,
    "attempt" int NOT NULL,
    "used" boolean NOT NULL,
    "error" jsonb,
    "senderUserId" uuid,
    "senderData" jsonb,
    "recipientGroupId" uuid NOT NULL,
    "recipientUserId" uuid NOT NULL,
    "recipientData" jsonb,
    "externalTenantId" uuid NOT NULL,
    "createdAt" timestamp DEFAULT now() NOT NULL,
    "updatedAt" timestamp DEFAULT now() NOT NULL
);

DO $$
BEGIN
    ALTER TABLE "NotificationsEvent"
        ADD CONSTRAINT "PK_NOTIFICATIONS_EVENTS" PRIMARY KEY(id);
EXCEPTION
    WHEN invalid_table_definition THEN
        NULL;
END
$$;

DO $$
BEGIN
    ALTER TABLE "NotificationsEvent"
        ADD CONSTRAINT "FK_NOTIFICATIONS__SENDER_USER_ID" FOREIGN KEY("senderUserId") REFERENCES "NotificationsUser";
EXCEPTION
    WHEN duplicate_object THEN
        NULL;
END
$$;

DO $$
BEGIN
    ALTER TABLE "NotificationsEvent"
        ADD CONSTRAINT "FK_NOTIFICATIONS__RECIPIENT_USER_ID" FOREIGN KEY("recipientUserId") REFERENCES "NotificationsUser";
EXCEPTION
    WHEN duplicate_object THEN
        NULL;
END
$$;

CREATE UNIQUE INDEX IF NOT EXISTS "UQ_NOTIFICATIONS" ON "NotificationsEvent"("senderUserId", "recipientUserId", "operationName", "type", "html", "subject", "externalTenantId");

CREATE INDEX IF NOT EXISTS "IDX_NOTIFICATIONS__SENDER_USER_ID" ON "NotificationsEvent"("senderUserId", "externalTenantId");

CREATE INDEX IF NOT EXISTS "IDX_NOTIFICATIONS__RECIPIENT_USER_ID" ON "NotificationsEvent"("recipientUserId", "externalTenantId");

CREATE INDEX IF NOT EXISTS "IDX_NOTIFICATIONS__RECIPIENT_GROUP_ID" ON "NotificationsEvent"("recipientGroupId", "externalTenantId");

CREATE INDEX IF NOT EXISTS "IDX_NOTIFICATIONS__EXTERNAL_TENANT_ID" ON "NotificationsEvent"("externalTenantId");

