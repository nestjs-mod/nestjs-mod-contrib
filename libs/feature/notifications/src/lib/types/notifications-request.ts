export type NotificationsRequest = {
  externalTenantId: string;
  notificationIsAdmin?: boolean;
  headers: Record<string, string>;
};
