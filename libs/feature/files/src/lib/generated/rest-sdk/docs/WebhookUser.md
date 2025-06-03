# WebhookUser


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**externalTenantId** | **string** |  | [default to undefined]
**externalUserId** | **string** |  | [default to undefined]
**userRole** | [**WebhookRole**](WebhookRole.md) |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**updatedAt** | **string** |  | [default to undefined]
**Webhook_Webhook_createdByToWebhookUser** | [**Array&lt;Webhook&gt;**](Webhook.md) |  | [optional] [default to undefined]
**Webhook_Webhook_updatedByToWebhookUser** | [**Array&lt;Webhook&gt;**](Webhook.md) |  | [optional] [default to undefined]

## Example

```typescript
import { WebhookUser } from './api';

const instance: WebhookUser = {
    id,
    externalTenantId,
    externalUserId,
    userRole,
    createdAt,
    updatedAt,
    Webhook_Webhook_createdByToWebhookUser,
    Webhook_Webhook_updatedByToWebhookUser,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
