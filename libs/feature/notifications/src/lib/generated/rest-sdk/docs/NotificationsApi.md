# NotificationsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**notificationsControllerFindMany**](#notificationscontrollerfindmany) | **GET** /api/notifications | |
|[**notificationsControllerFindOne**](#notificationscontrollerfindone) | **GET** /api/notifications/{id} | |
|[**notificationsControllerUpdateOne**](#notificationscontrollerupdateone) | **PUT** /api/notifications/{id} | |

# **notificationsControllerFindMany**
> FindManyNotificationResponse notificationsControllerFindMany()


### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let curPage: number; // (optional) (default to undefined)
let perPage: number; // (optional) (default to undefined)
let searchText: string; // (optional) (default to undefined)
let sort: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.notificationsControllerFindMany(
    curPage,
    perPage,
    searchText,
    sort
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **curPage** | [**number**] |  | (optional) defaults to undefined|
| **perPage** | [**number**] |  | (optional) defaults to undefined|
| **searchText** | [**string**] |  | (optional) defaults to undefined|
| **sort** | [**string**] |  | (optional) defaults to undefined|


### Return type

**FindManyNotificationResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **notificationsControllerFindOne**
> NotificationsEventDto notificationsControllerFindOne()


### Example

```typescript
import {
    NotificationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.notificationsControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**NotificationsEventDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **notificationsControllerUpdateOne**
> NotificationsEventDto notificationsControllerUpdateOne(updateNotificationsEventDto)


### Example

```typescript
import {
    NotificationsApi,
    Configuration,
    UpdateNotificationsEventDto
} from './api';

const configuration = new Configuration();
const apiInstance = new NotificationsApi(configuration);

let id: string; // (default to undefined)
let updateNotificationsEventDto: UpdateNotificationsEventDto; //

const { status, data } = await apiInstance.notificationsControllerUpdateOne(
    id,
    updateNotificationsEventDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateNotificationsEventDto** | **UpdateNotificationsEventDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**NotificationsEventDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**400** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

