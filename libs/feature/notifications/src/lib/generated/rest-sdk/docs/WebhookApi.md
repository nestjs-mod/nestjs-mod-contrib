# WebhookApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**webhookControllerCreateOne**](#webhookcontrollercreateone) | **POST** /api/webhook | |
|[**webhookControllerDeleteOne**](#webhookcontrollerdeleteone) | **DELETE** /api/webhook/{id} | |
|[**webhookControllerEvents**](#webhookcontrollerevents) | **GET** /api/webhook/events | |
|[**webhookControllerFindMany**](#webhookcontrollerfindmany) | **GET** /api/webhook | |
|[**webhookControllerFindOne**](#webhookcontrollerfindone) | **GET** /api/webhook/{id} | |
|[**webhookControllerProfile**](#webhookcontrollerprofile) | **GET** /api/webhook/profile | |
|[**webhookControllerTestRequest**](#webhookcontrollertestrequest) | **POST** /api/webhook/test-request | |
|[**webhookControllerUpdateOne**](#webhookcontrollerupdateone) | **PUT** /api/webhook/{id} | |
|[**webhookLogsControllerDeleteOne**](#webhooklogscontrollerdeleteone) | **DELETE** /api/webhook/logs/{id} | |
|[**webhookLogsControllerFindManyLogs**](#webhooklogscontrollerfindmanylogs) | **GET** /api/webhook/logs | |
|[**webhookLogsControllerFindOne**](#webhooklogscontrollerfindone) | **GET** /api/webhook/logs/{id} | |

# **webhookControllerCreateOne**
> Webhook webhookControllerCreateOne(createWebhookDto)


### Example

```typescript
import {
    WebhookApi,
    Configuration,
    CreateWebhookDto
} from './api';

const configuration = new Configuration();
const apiInstance = new WebhookApi(configuration);

let createWebhookDto: CreateWebhookDto; //

const { status, data } = await apiInstance.webhookControllerCreateOne(
    createWebhookDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createWebhookDto** | **CreateWebhookDto**|  | |


### Return type

**Webhook**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |
|**400** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **webhookControllerDeleteOne**
> StatusResponse webhookControllerDeleteOne()


### Example

```typescript
import {
    WebhookApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WebhookApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.webhookControllerDeleteOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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
|**400** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **webhookControllerEvents**
> Array<WebhookEvent> webhookControllerEvents()


### Example

```typescript
import {
    WebhookApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WebhookApi(configuration);

const { status, data } = await apiInstance.webhookControllerEvents();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<WebhookEvent>**

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

# **webhookControllerFindMany**
> FindManyWebhookResponse webhookControllerFindMany()


### Example

```typescript
import {
    WebhookApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WebhookApi(configuration);

let curPage: number; // (optional) (default to undefined)
let perPage: number; // (optional) (default to undefined)
let searchText: string; // (optional) (default to undefined)
let sort: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.webhookControllerFindMany(
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

**FindManyWebhookResponse**

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

# **webhookControllerFindOne**
> Webhook webhookControllerFindOne()


### Example

```typescript
import {
    WebhookApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WebhookApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.webhookControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Webhook**

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

# **webhookControllerProfile**
> WebhookUser webhookControllerProfile()


### Example

```typescript
import {
    WebhookApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WebhookApi(configuration);

const { status, data } = await apiInstance.webhookControllerProfile();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**WebhookUser**

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

# **webhookControllerTestRequest**
> WebhookTestRequestResponse webhookControllerTestRequest(createWebhookDto)


### Example

```typescript
import {
    WebhookApi,
    Configuration,
    CreateWebhookDto
} from './api';

const configuration = new Configuration();
const apiInstance = new WebhookApi(configuration);

let createWebhookDto: CreateWebhookDto; //

const { status, data } = await apiInstance.webhookControllerTestRequest(
    createWebhookDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createWebhookDto** | **CreateWebhookDto**|  | |


### Return type

**WebhookTestRequestResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |
|**400** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **webhookControllerUpdateOne**
> Webhook webhookControllerUpdateOne(updateWebhookDto)


### Example

```typescript
import {
    WebhookApi,
    Configuration,
    UpdateWebhookDto
} from './api';

const configuration = new Configuration();
const apiInstance = new WebhookApi(configuration);

let id: string; // (default to undefined)
let updateWebhookDto: UpdateWebhookDto; //

const { status, data } = await apiInstance.webhookControllerUpdateOne(
    id,
    updateWebhookDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateWebhookDto** | **UpdateWebhookDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Webhook**

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

# **webhookLogsControllerDeleteOne**
> StatusResponse webhookLogsControllerDeleteOne()


### Example

```typescript
import {
    WebhookApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WebhookApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.webhookLogsControllerDeleteOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


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
|**400** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **webhookLogsControllerFindManyLogs**
> FindManyWebhookLogResponse webhookLogsControllerFindManyLogs()


### Example

```typescript
import {
    WebhookApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WebhookApi(configuration);

let webhookId: string; // (default to undefined)
let curPage: number; // (optional) (default to undefined)
let perPage: number; // (optional) (default to undefined)
let searchText: string; // (optional) (default to undefined)
let sort: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.webhookLogsControllerFindManyLogs(
    webhookId,
    curPage,
    perPage,
    searchText,
    sort
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **webhookId** | [**string**] |  | defaults to undefined|
| **curPage** | [**number**] |  | (optional) defaults to undefined|
| **perPage** | [**number**] |  | (optional) defaults to undefined|
| **searchText** | [**string**] |  | (optional) defaults to undefined|
| **sort** | [**string**] |  | (optional) defaults to undefined|


### Return type

**FindManyWebhookLogResponse**

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

# **webhookLogsControllerFindOne**
> WebhookLog webhookLogsControllerFindOne()


### Example

```typescript
import {
    WebhookApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new WebhookApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.webhookLogsControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**WebhookLog**

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

