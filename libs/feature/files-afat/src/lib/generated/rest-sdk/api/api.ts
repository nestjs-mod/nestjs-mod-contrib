export * from './files-rest.service';
import { FilesRestService } from './files-rest.service';
export * from './webhook-rest.service';
import { WebhookRestService } from './webhook-rest.service';
export const APIS = [FilesRestService, WebhookRestService];
