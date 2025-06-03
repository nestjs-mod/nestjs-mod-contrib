# NotificationsEvent


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**type** | **string** |  | [default to undefined]
**operationName** | **string** |  | [default to undefined]
**subject** | **string** |  | [default to undefined]
**html** | **string** |  | [default to undefined]
**text** | **string** |  | [default to undefined]
**attempt** | **number** |  | [default to undefined]
**used** | **boolean** |  | [default to undefined]
**error** | **object** |  | [default to undefined]
**senderUserId** | **string** |  | [default to undefined]
**senderData** | **object** |  | [default to undefined]
**recipientGroupId** | **string** |  | [default to undefined]
**recipientUserId** | **string** |  | [default to undefined]
**recipientData** | **object** |  | [default to undefined]
**externalTenantId** | **string** |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**updatedAt** | **string** |  | [default to undefined]
**NotificationsUser_NotificationsEvent_recipientUserIdToNotificationsUser** | [**NotificationsUser**](NotificationsUser.md) |  | [optional] [default to undefined]
**NotificationsUser_NotificationsEvent_senderUserIdToNotificationsUser** | [**NotificationsUser**](NotificationsUser.md) |  | [optional] [default to undefined]

## Example

```typescript
import { NotificationsEvent } from './api';

const instance: NotificationsEvent = {
    id,
    type,
    operationName,
    subject,
    html,
    text,
    attempt,
    used,
    error,
    senderUserId,
    senderData,
    recipientGroupId,
    recipientUserId,
    recipientData,
    externalTenantId,
    createdAt,
    updatedAt,
    NotificationsUser_NotificationsEvent_recipientUserIdToNotificationsUser,
    NotificationsUser_NotificationsEvent_senderUserIdToNotificationsUser,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
