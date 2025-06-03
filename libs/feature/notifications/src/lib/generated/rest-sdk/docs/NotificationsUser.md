# NotificationsUser


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**externalTenantId** | **string** |  | [default to undefined]
**externalUserId** | **string** |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**updatedAt** | **string** |  | [default to undefined]
**NotificationsEvent_NotificationsEvent_recipientUserIdToNotificationsUser** | [**Array&lt;NotificationsEvent&gt;**](NotificationsEvent.md) |  | [optional] [default to undefined]
**NotificationsEvent_NotificationsEvent_senderUserIdToNotificationsUser** | [**Array&lt;NotificationsEvent&gt;**](NotificationsEvent.md) |  | [optional] [default to undefined]

## Example

```typescript
import { NotificationsUser } from './api';

const instance: NotificationsUser = {
    id,
    externalTenantId,
    externalUserId,
    createdAt,
    updatedAt,
    NotificationsEvent_NotificationsEvent_recipientUserIdToNotificationsUser,
    NotificationsEvent_NotificationsEvent_senderUserIdToNotificationsUser,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
