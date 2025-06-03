# UpdateNotificationsEventDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**type** | **string** |  | [optional] [default to undefined]
**operationName** | **string** |  | [optional] [default to undefined]
**subject** | **string** |  | [optional] [default to undefined]
**html** | **string** |  | [optional] [default to undefined]
**text** | **string** |  | [optional] [default to undefined]
**attempt** | **number** |  | [optional] [default to undefined]
**used** | **boolean** |  | [optional] [default to undefined]
**error** | **object** |  | [optional] [default to undefined]
**senderData** | **object** |  | [optional] [default to undefined]
**recipientGroupId** | **string** |  | [optional] [default to undefined]
**recipientData** | **object** |  | [optional] [default to undefined]
**externalTenantId** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { UpdateNotificationsEventDto } from './api';

const instance: UpdateNotificationsEventDto = {
    type,
    operationName,
    subject,
    html,
    text,
    attempt,
    used,
    error,
    senderData,
    recipientGroupId,
    recipientData,
    externalTenantId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
