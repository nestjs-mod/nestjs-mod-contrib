# WebhookLogsControllerFindManyLogs400Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **string** | Webhook error (WEBHOOK-000), Tenant ID not set (WEBHOOK-003), User ID not set (WEBHOOK-002), Forbidden (WEBHOOK-001), User not found (WEBHOOK-004), Event not found (WEBHOOK-005) | [default to undefined]
**code** | [**WebhookErrorEnum**](WebhookErrorEnum.md) |  | [default to undefined]
**metadata** | **object** |  | [optional] [default to undefined]

## Example

```typescript
import { WebhookLogsControllerFindManyLogs400Response } from './api';

const instance: WebhookLogsControllerFindManyLogs400Response = {
    message,
    code,
    metadata,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
