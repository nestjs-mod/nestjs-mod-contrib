# Webhook


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**eventName** | **string** |  | [default to undefined]
**endpoint** | **string** |  | [default to undefined]
**enabled** | **boolean** |  | [default to undefined]
**headers** | **object** |  | [default to undefined]
**requestTimeout** | **number** |  | [default to undefined]
**externalTenantId** | **string** |  | [default to undefined]
**createdBy** | **string** |  | [default to undefined]
**updatedBy** | **string** |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**updatedAt** | **string** |  | [default to undefined]
**workUntilDate** | **string** |  | [default to undefined]
**WebhookUser_Webhook_createdByToWebhookUser** | [**WebhookUser**](WebhookUser.md) |  | [optional] [default to undefined]
**WebhookUser_Webhook_updatedByToWebhookUser** | [**WebhookUser**](WebhookUser.md) |  | [optional] [default to undefined]
**WebhookLog** | [**Array&lt;WebhookLog&gt;**](WebhookLog.md) |  | [optional] [default to undefined]

## Example

```typescript
import { Webhook } from './api';

const instance: Webhook = {
    id,
    eventName,
    endpoint,
    enabled,
    headers,
    requestTimeout,
    externalTenantId,
    createdBy,
    updatedBy,
    createdAt,
    updatedAt,
    workUntilDate,
    WebhookUser_Webhook_createdByToWebhookUser,
    WebhookUser_Webhook_updatedByToWebhookUser,
    WebhookLog,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
