# FilesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**filesControllerDeleteFile**](#filescontrollerdeletefile) | **POST** /api/files/delete-file | |
|[**filesControllerGetPresignedUrl**](#filescontrollergetpresignedurl) | **GET** /api/files/get-presigned-url | |

# **filesControllerDeleteFile**
> StatusResponse filesControllerDeleteFile()


### Example

```typescript
import {
    FilesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FilesApi(configuration);

let downloadUrl: string; // (default to undefined)

const { status, data } = await apiInstance.filesControllerDeleteFile(
    downloadUrl
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **downloadUrl** | [**string**] |  | defaults to undefined|


### Return type

**StatusResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **filesControllerGetPresignedUrl**
> FilesPresignedUrls filesControllerGetPresignedUrl()


### Example

```typescript
import {
    FilesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FilesApi(configuration);

let ext: string; // (default to undefined)

const { status, data } = await apiInstance.filesControllerGetPresignedUrl(
    ext
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **ext** | [**string**] |  | defaults to undefined|


### Return type

**FilesPresignedUrls**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

