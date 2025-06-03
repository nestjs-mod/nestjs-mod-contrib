# NotificationsError


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **string** | Notifications error (NOTIFICATIONS-000), Tenant ID not set (NOTIFICATIONS-001), User ID not set (NOTIFICATIONS-002), Forbidden (NOTIFICATIONS-003) | [default to undefined]
**code** | [**NotificationsErrorEnum**](NotificationsErrorEnum.md) |  | [default to undefined]
**metadata** | [**Array&lt;NotificationsErrorMetadata&gt;**](NotificationsErrorMetadata.md) |  | [optional] [default to undefined]

## Example

```typescript
import { NotificationsError } from './api';

const instance: NotificationsError = {
    message,
    code,
    metadata,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
