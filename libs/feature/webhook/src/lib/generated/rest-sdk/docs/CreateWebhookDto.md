# CreateWebhookDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**eventName** | **string** |  | [default to undefined]
**endpoint** | **string** |  | [default to undefined]
**enabled** | **boolean** |  | [default to undefined]
**headers** | **object** |  | [optional] [default to undefined]
**requestTimeout** | **number** |  | [optional] [default to undefined]
**workUntilDate** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { CreateWebhookDto } from './api';

const instance: CreateWebhookDto = {
    eventName,
    endpoint,
    enabled,
    headers,
    requestTimeout,
    workUntilDate,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
