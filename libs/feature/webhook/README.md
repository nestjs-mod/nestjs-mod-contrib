
# @nestjs-mod/webhook

Webhook module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @nestjs-mod/webhook
```


## Utilities

| Link | Description |
| ---- | ----------- |
| [CreateWebhookDto](#create-webhook-dto) | Properties |
| [FindManyResponseMeta](#find-many-response-meta) | Properties |
| [FindManyWebhookLogResponse](#find-many-webhook-log-response) | Properties |
| [FindManyWebhookResponse](#find-many-webhook-response) | Properties |
| [StatusResponse](#status-response) | Properties |
| [UpdateWebhookDto](#update-webhook-dto) | Properties |
| [Webhook](#webhook) | Properties |
| [WebhookApi](#webhook-api) | All URIs are relative to *http://localhost* |
| [WebhookEntities](#webhook-entities) | Properties |
| [WebhookError](#webhook-error) | Properties |
| [WebhookErrorEnum](#webhook-error-enum) | Enum |
| [WebhookEvent](#webhook-event) | Properties |
| [WebhookLog](#webhook-log) | Properties |
| [WebhookLogScalarFieldEnum](#webhook-log-scalar-field-enum) | Enum |
| [WebhookLogsControllerFindManyLogs400Response](#webhook-logs-controller-find-many-logs-400-response) | Properties |
| [WebhookRole](#webhook-role) | Enum |
| [WebhookScalarFieldEnum](#webhook-scalar-field-enum) | Enum |
| [WebhookStatus](#webhook-status) | Enum |
| [WebhookTestRequestResponse](#webhook-test-request-response) | Properties |
| [WebhookUser](#webhook-user) | Properties |
| [WebhookUserScalarFieldEnum](#webhook-user-scalar-field-enum) | Enum |


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [WebhookModule](#webhookmodule) | feature | Webhook module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction |


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
# WebhookEntities


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Webhook** | [**WebhookScalarFieldEnum**](WebhookScalarFieldEnum.md) |  | [default to undefined]
**WebhookLog** | [**WebhookLogScalarFieldEnum**](WebhookLogScalarFieldEnum.md) |  | [default to undefined]
**WebhookUser** | [**WebhookUserScalarFieldEnum**](WebhookUserScalarFieldEnum.md) |  | [default to undefined]

## Example

```typescript
import { WebhookEntities } from './api';

const instance: WebhookEntities = {
    Webhook,
    WebhookLog,
    WebhookUser,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# WebhookError


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **string** | Webhook error (WEBHOOK-000), Tenant ID not set (WEBHOOK-003), User ID not set (WEBHOOK-002), Forbidden (WEBHOOK-001), User not found (WEBHOOK-004), Event not found (WEBHOOK-005) | [default to undefined]
**code** | [**WebhookErrorEnum**](WebhookErrorEnum.md) |  | [default to undefined]
**metadata** | **object** |  | [optional] [default to undefined]

## Example

```typescript
import { WebhookError } from './api';

const instance: WebhookError = {
    message,
    code,
    metadata,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# WebhookErrorEnum


## Enum

* `Webhook000` (value: `'WEBHOOK-000'`)

* `Webhook001` (value: `'WEBHOOK-001'`)

* `Webhook002` (value: `'WEBHOOK-002'`)

* `Webhook003` (value: `'WEBHOOK-003'`)

* `Webhook004` (value: `'WEBHOOK-004'`)

* `Webhook005` (value: `'WEBHOOK-005'`)

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

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
# WebhookLogScalarFieldEnum


## Enum

* `Id` (value: `'id'`)

* `Request` (value: `'request'`)

* `ResponseStatus` (value: `'responseStatus'`)

* `Response` (value: `'response'`)

* `WebhookStatus` (value: `'webhookStatus'`)

* `WebhookId` (value: `'webhookId'`)

* `ExternalTenantId` (value: `'externalTenantId'`)

* `CreatedAt` (value: `'createdAt'`)

* `UpdatedAt` (value: `'updatedAt'`)

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# WebhookLogsControllerFindManyLogs400Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **string** | Webhook error (WEBHOOK-000), Tenant ID not set (WEBHOOK-003), User ID not set (WEBHOOK-002), Forbidden (WEBHOOK-001), User not found (WEBHOOK-004), Event not found (WEBHOOK-005) | [default to undefined]
**code** | [**WebhookErrorEnum**](WebhookErrorEnum.md) |  | [default to undefined]
**metadata** | **object** |  | [optional] [default to undefined]

## Example

```typescript
import { WebhookLogsControllerFindManyLogs400Response } from './api';

const instance: WebhookLogsControllerFindManyLogs400Response = {
    message,
    code,
    metadata,
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
# WebhookScalarFieldEnum


## Enum

* `Id` (value: `'id'`)

* `EventName` (value: `'eventName'`)

* `Endpoint` (value: `'endpoint'`)

* `Enabled` (value: `'enabled'`)

* `Headers` (value: `'headers'`)

* `RequestTimeout` (value: `'requestTimeout'`)

* `ExternalTenantId` (value: `'externalTenantId'`)

* `CreatedBy` (value: `'createdBy'`)

* `UpdatedBy` (value: `'updatedBy'`)

* `CreatedAt` (value: `'createdAt'`)

* `UpdatedAt` (value: `'updatedAt'`)

* `WorkUntilDate` (value: `'workUntilDate'`)

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

---
# WebhookUserScalarFieldEnum


## Enum

* `Id` (value: `'id'`)

* `ExternalTenantId` (value: `'externalTenantId'`)

* `ExternalUserId` (value: `'externalUserId'`)

* `UserRole` (value: `'userRole'`)

* `CreatedAt` (value: `'createdAt'`)

* `UpdatedAt` (value: `'updatedAt'`)

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

## Modules descriptions

### WebhookModule
Webhook module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction

#### Shared providers
`WebhookService`, `WebhookUsersService`

#### Shared imports
`HttpModule`, `PrismaModule`

#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`events`|List of available events|**optional**|-|-|
|`syncMode`|When we run an application in a serverless environment, our background tasks do not have time to complete, to disable background tasks and process requests on demand, we need to switch this property to true|**optional**|```false```|-|

#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`useGuards`|Use guards|`obj['useGuards']`, `process.env['WEBHOOK_USE_GUARDS']`|**optional**|```true```|```true```|
|`useFilters`|Use filters|`obj['useFilters']`, `process.env['WEBHOOK_USE_FILTERS']`|**optional**|```true```|```true```|
|`autoCreateUser`|Auto create user from guard|`obj['autoCreateUser']`, `process.env['WEBHOOK_AUTO_CREATE_USER']`|**optional**|```true```|```true```|
|`skipGuardErrors`|Skip any guard errors|`obj['skipGuardErrors']`, `process.env['WEBHOOK_SKIP_GUARD_ERRORS']`|**optional**|```false```|```false```|
|`cacheTTL`|TTL for cached data|`obj['cacheTTL']`, `process.env['WEBHOOK_CACHE_TTL']`|**optional**|```15000```|```15000```|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`guards`|External guards for controllers|**optional**|-|-|
|`mutateController`|Function for additional mutation of controllers|**optional**|-|-|

#### Feature configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`events`|List of available events|**optional**|-|-|

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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/webhook
[npm-url]: https://npmjs.org/package/@nestjs-mod/webhook
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/webhook
[downloads-url]: https://npmjs.org/package/@nestjs-mod/webhook
