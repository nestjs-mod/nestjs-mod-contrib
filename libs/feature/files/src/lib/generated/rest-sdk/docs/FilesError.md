# FilesError


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **string** | Files error (FILES-000), Forbidden (FILES-001) | [default to undefined]
**code** | [**FilesErrorEnum**](FilesErrorEnum.md) |  | [default to undefined]
**metadata** | **object** |  | [optional] [default to undefined]

## Example

```typescript
import { FilesError } from './api';

const instance: FilesError = {
    message,
    code,
    metadata,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
