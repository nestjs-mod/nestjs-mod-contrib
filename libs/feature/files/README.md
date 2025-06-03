
# @nestjs-mod/files

Files module with an error filter, controller and rest-sdk for work with module from other nodejs appliaction

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @nestjs-mod/files
```


## Utilities

| Link | Description |
| ---- | ----------- |
| [CreateWebhookDto](#create-webhook-dto) | Properties |
| [FilesApi](#files-api) | All URIs are relative to *http://localhost* |
| [FilesError](#files-error) | Properties |
| [FilesErrorEnum](#files-error-enum) | Enum |
| [FilesPresignedUrls](#files-presigned-urls) | Properties |
| [FindManyResponseMeta](#find-many-response-meta) | Properties |
| [FindManyWebhookLogResponse](#find-many-webhook-log-response) | Properties |
| [FindManyWebhookResponse](#find-many-webhook-response) | Properties |
| [StatusResponse](#status-response) | Properties |
| [UpdateWebhookDto](#update-webhook-dto) | Properties |
| [Webhook](#webhook) | Properties |
| [WebhookApi](#webhook-api) | All URIs are relative to *http://localhost* |
| [WebhookEvent](#webhook-event) | Properties |
| [WebhookLog](#webhook-log) | Properties |
| [WebhookRole](#webhook-role) | Enum |
| [WebhookStatus](#webhook-status) | Enum |
| [WebhookTestRequestResponse](#webhook-test-request-response) | Properties |
| [WebhookUser](#webhook-user) | Properties |


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [FilesModule](#filesmodule) | feature | Files module with an error filter, controller and rest-sdk for work with module from other nodejs appliaction |


## Utilities descriptions

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

[Back to Top](#utilities)

---
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


[Back to Top](#utilities)

---
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

[Back to Top](#utilities)

---
# FilesErrorEnum


## Enum

* `Files000` (value: `'FILES-000'`)

* `Files001` (value: `'FILES-001'`)

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# FilesPresignedUrls


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**downloadUrl** | **string** |  | [default to undefined]
**uploadUrl** | **string** |  | [default to undefined]

## Example

```typescript
import { FilesPresignedUrls } from './api';

const instance: FilesPresignedUrls = {
    downloadUrl,
    uploadUrl,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# FindManyResponseMeta


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**curPage** | **number** |  | [optional] [default to undefined]
**perPage** | **number** |  | [optional] [default to undefined]
**totalResults** | **number** |  | [default to undefined]

## Example

```typescript
import { FindManyResponseMeta } from './api';

const instance: FindManyResponseMeta = {
    curPage,
    perPage,
    totalResults,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# FindManyWebhookLogResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**webhookLogs** | [**Array&lt;WebhookLog&gt;**](WebhookLog.md) |  | [default to undefined]
**meta** | [**FindManyResponseMeta**](FindManyResponseMeta.md) |  | [default to undefined]

## Example

```typescript
import { FindManyWebhookLogResponse } from './api';

const instance: FindManyWebhookLogResponse = {
    webhookLogs,
    meta,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# FindManyWebhookResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**webhooks** | [**Array&lt;Webhook&gt;**](Webhook.md) |  | [default to undefined]
**meta** | [**FindManyResponseMeta**](FindManyResponseMeta.md) |  | [default to undefined]

## Example

```typescript
import { FindManyWebhookResponse } from './api';

const instance: FindManyWebhookResponse = {
    webhooks,
    meta,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# StatusResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **string** |  | [default to undefined]

## Example

```typescript
import { StatusResponse } from './api';

const instance: StatusResponse = {
    message,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# UpdateWebhookDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**eventName** | **string** |  | [optional] [default to undefined]
**endpoint** | **string** |  | [optional] [default to undefined]
**enabled** | **boolean** |  | [optional] [default to undefined]
**headers** | **object** |  | [optional] [default to undefined]
**requestTimeout** | **number** |  | [optional] [default to undefined]
**workUntilDate** | **string** |  | [optional] [default to undefined]

## Example

```typescript
import { UpdateWebhookDto } from './api';

const instance: UpdateWebhookDto = {
    eventName,
    endpoint,
    enabled,
    headers,
    requestTimeout,
    workUntilDate,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
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

[Back to Top](#utilities)

---
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


[Back to Top](#utilities)

---
# WebhookEvent


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**eventName** | **string** |  | [default to undefined]
**description** | **string** |  | [default to undefined]
**example** | **object** |  | [default to undefined]

## Example

```typescript
import { WebhookEvent } from './api';

const instance: WebhookEvent = {
    eventName,
    description,
    example,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# WebhookLog


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**request** | **object** |  | [default to undefined]
**responseStatus** | **string** |  | [default to undefined]
**response** | **object** |  | [default to undefined]
**webhookStatus** | [**WebhookStatus**](WebhookStatus.md) |  | [default to undefined]
**webhookId** | **string** |  | [default to undefined]
**externalTenantId** | **string** |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**updatedAt** | **string** |  | [default to undefined]
**Webhook** | [**Webhook**](Webhook.md) |  | [optional] [default to undefined]

## Example

```typescript
import { WebhookLog } from './api';

const instance: WebhookLog = {
    id,
    request,
    responseStatus,
    response,
    webhookStatus,
    webhookId,
    externalTenantId,
    createdAt,
    updatedAt,
    Webhook,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# WebhookRole


## Enum

* `Admin` (value: `'Admin'`)

* `User` (value: `'User'`)

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# WebhookStatus


## Enum

* `Pending` (value: `'Pending'`)

* `Process` (value: `'Process'`)

* `Success` (value: `'Success'`)

* `Error` (value: `'Error'`)

* `Timeout` (value: `'Timeout'`)

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# WebhookTestRequestResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**request** | **object** |  | [default to undefined]
**responseStatus** | **string** |  | [default to undefined]
**response** | **object** |  | [default to undefined]
**webhookStatus** | [**WebhookStatus**](WebhookStatus.md) |  | [default to undefined]

## Example

```typescript
import { WebhookTestRequestResponse } from './api';

const instance: WebhookTestRequestResponse = {
    request,
    responseStatus,
    response,
    webhookStatus,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# WebhookUser


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [default to undefined]
**externalTenantId** | **string** |  | [default to undefined]
**externalUserId** | **string** |  | [default to undefined]
**userRole** | [**WebhookRole**](WebhookRole.md) |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**updatedAt** | **string** |  | [default to undefined]
**Webhook_Webhook_createdByToWebhookUser** | [**Array&lt;Webhook&gt;**](Webhook.md) |  | [optional] [default to undefined]
**Webhook_Webhook_updatedByToWebhookUser** | [**Array&lt;Webhook&gt;**](Webhook.md) |  | [optional] [default to undefined]

## Example

```typescript
import { WebhookUser } from './api';

const instance: WebhookUser = {
    id,
    externalTenantId,
    externalUserId,
    userRole,
    createdAt,
    updatedAt,
    Webhook_Webhook_createdByToWebhookUser,
    Webhook_Webhook_updatedByToWebhookUser,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

## Modules descriptions

### FilesModule
Files module with an error filter, controller and rest-sdk for work with module from other nodejs appliaction

#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`getFromDownloadUrlWithoutBucketNames`|Function for get from download url without bucket names|**optional**|-|-|
|`getPresignedUrls`|Function for get presigned urls|**optional**|-|-|
|`deleteFile`|Function for delete file|**optional**|-|-|
|`buckets`|Buckets with policy|**optional**|```{"images":{"policy":{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:PutObject","s3:AbortMultipartUpload","s3:DeleteObject","s3:GetObject"],"Resource":["arn:aws:s3:::images/*.jpg","arn:aws:s3:::images/*.jpeg","arn:aws:s3:::images/*.png","arn:aws:s3:::images/*.gif"]}],"Conditions":[["content-length-range",5242880]]},"ext":["jpg","jpeg","png","gif"]},"video":{"policy":{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:PutObject","s3:AbortMultipartUpload","s3:DeleteObject","s3:GetObject"],"Resource":["arn:aws:s3:::video/*.mp4"]}],"Conditions":[["content-length-range",52428800]]},"ext":["mp4"]},"documents":{"policy":{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"AWS":["*"]},"Action":["s3:PutObject","s3:AbortMultipartUpload","s3:DeleteObject","s3:GetObject"],"Resource":["arn:aws:s3:::documents/*.doc","arn:aws:s3:::documents/*.docx","arn:aws:s3:::documents/*.xls","arn:aws:s3:::documents/*.md","arn:aws:s3:::documents/*.odt","arn:aws:s3:::documents/*.txt","arn:aws:s3:::documents/*.xml","arn:aws:s3:::documents/*.rtf","arn:aws:s3:::documents/*.csv"]}],"Conditions":[["content-length-range",10485760]]},"ext":["doc","docx","xls","md","odt","txt","xml","rtf","csv"]}}```|-|

#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`filesDefaultUserId`|Default user id|`obj['filesDefaultUserId']`, `process.env['FILES_FILES_DEFAULT_USER_ID']`|**optional**|```default```|```default```|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |

[Back to Top](#modules)

## Links

* https://github.com/nestjs-mod/nestjs-mod - A collection of utilities for unifying NestJS applications and modules
* https://github.com/nestjs-mod/nestjs-mod-contrib - Contrib repository for the NestJS-mod
* https://github.com/nestjs-mod/nestjs-mod-example - Example application built with [@nestjs-mod/schematics](https://github.com/nestjs-mod/nestjs-mod/tree/master/libs/schematics)
* https://github.com/nestjs-mod/nestjs-mod/blob/master/apps/example-basic/INFRASTRUCTURE.MD - A simple example of infrastructure documentation.
* https://github.com/nestjs-mod/nestjs-mod-contrib/blob/master/apps/example-prisma/INFRASTRUCTURE.MD - An extended example of infrastructure documentation with a docker-compose file and a data base.
* https://dev.to/endykaufman/collection-of-nestjs-mod-utilities-for-unifying-applications-and-modules-on-nestjs-5256 - Article about the project NestJS-mod
* https://habr.com/ru/articles/788916 - Коллекция утилит NestJS-mod для унификации приложений и модулей на NestJS


## License

MIT

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/files
[npm-url]: https://npmjs.org/package/@nestjs-mod/files
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/files
[downloads-url]: https://npmjs.org/package/@nestjs-mod/files
