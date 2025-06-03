
# @nestjs-mod/notifications

Notifications module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @nestjs-mod/notifications
```


## Utilities

| Link | Description |
| ---- | ----------- |
| [CreateWebhookDto](#create-webhook-dto) | Properties |
| [FindManyNotificationResponse](#find-many-notification-response) | Properties |
| [FindManyResponseMeta](#find-many-response-meta) | Properties |
| [FindManyWebhookLogResponse](#find-many-webhook-log-response) | Properties |
| [FindManyWebhookResponse](#find-many-webhook-response) | Properties |
| [NotificationsApi](#notifications-api) | All URIs are relative to *http://localhost* |
| [NotificationsControllerFindMany400Response](#notifications-controller-find-many-400-response) | Properties |
| [NotificationsEntities](#notifications-entities) | Properties |
| [NotificationsError](#notifications-error) | Properties |
| [NotificationsErrorEnum](#notifications-error-enum) | Enum |
| [NotificationsErrorMetadata](#notifications-error-metadata) | Properties |
| [NotificationsErrorMetadataConstraint](#notifications-error-metadata-constraint) | Properties |
| [NotificationsEvent](#notifications-event) | Properties |
| [NotificationsEventDto](#notifications-event-dto) | Properties |
| [NotificationsEventScalarFieldEnum](#notifications-event-scalar-field-enum) | Enum |
| [NotificationsUser](#notifications-user) | Properties |
| [NotificationsUserScalarFieldEnum](#notifications-user-scalar-field-enum) | Enum |
| [StatusResponse](#status-response) | Properties |
| [UpdateNotificationsEventDto](#update-notifications-event-dto) | Properties |
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
| [NotificationsModule](#notificationsmodule) | feature | Notifications module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction |


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
# FindManyNotificationResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**notifications** | [**Array&lt;NotificationsEvent&gt;**](NotificationsEvent.md) |  | [default to undefined]
**meta** | [**FindManyResponseMeta**](FindManyResponseMeta.md) |  | [default to undefined]

## Example

```typescript
import { FindManyNotificationResponse } from './api';

const instance: FindManyNotificationResponse = {
    notifications,
    meta,
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


[Back to Top](#utilities)

---
# NotificationsControllerFindMany400Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **string** | Notifications error (NOTIFICATIONS-000), Tenant ID not set (NOTIFICATIONS-001), User ID not set (NOTIFICATIONS-002), Forbidden (NOTIFICATIONS-003) | [default to undefined]
**code** | [**NotificationsErrorEnum**](NotificationsErrorEnum.md) |  | [default to undefined]
**metadata** | [**Array&lt;NotificationsErrorMetadata&gt;**](NotificationsErrorMetadata.md) |  | [optional] [default to undefined]

## Example

```typescript
import { NotificationsControllerFindMany400Response } from './api';

const instance: NotificationsControllerFindMany400Response = {
    message,
    code,
    metadata,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# NotificationsEntities


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**NotificationsUser** | [**NotificationsUserScalarFieldEnum**](NotificationsUserScalarFieldEnum.md) |  | [default to undefined]
**NotificationsEvent** | [**NotificationsEventScalarFieldEnum**](NotificationsEventScalarFieldEnum.md) |  | [default to undefined]

## Example

```typescript
import { NotificationsEntities } from './api';

const instance: NotificationsEntities = {
    NotificationsUser,
    NotificationsEvent,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# NotificationsError


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **string** | Notifications error (NOTIFICATIONS-000), Tenant ID not set (NOTIFICATIONS-001), User ID not set (NOTIFICATIONS-002), Forbidden (NOTIFICATIONS-003) | [default to undefined]
**code** | [**NotificationsErrorEnum**](NotificationsErrorEnum.md) |  | [default to undefined]
**metadata** | [**Array&lt;NotificationsErrorMetadata&gt;**](NotificationsErrorMetadata.md) |  | [optional] [default to undefined]

## Example

```typescript
import { NotificationsError } from './api';

const instance: NotificationsError = {
    message,
    code,
    metadata,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# NotificationsErrorEnum


## Enum

* `Notifications000` (value: `'NOTIFICATIONS-000'`)

* `Notifications001` (value: `'NOTIFICATIONS-001'`)

* `Notifications002` (value: `'NOTIFICATIONS-002'`)

* `Notifications003` (value: `'NOTIFICATIONS-003'`)

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# NotificationsErrorMetadata


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**property** | **string** |  | [default to undefined]
**constraints** | [**Array&lt;NotificationsErrorMetadataConstraint&gt;**](NotificationsErrorMetadataConstraint.md) |  | [default to undefined]
**children** | [**Array&lt;NotificationsErrorMetadata&gt;**](NotificationsErrorMetadata.md) |  | [optional] [default to undefined]

## Example

```typescript
import { NotificationsErrorMetadata } from './api';

const instance: NotificationsErrorMetadata = {
    property,
    constraints,
    children,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# NotificationsErrorMetadataConstraint


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [default to undefined]
**description** | **string** |  | [default to undefined]

## Example

```typescript
import { NotificationsErrorMetadataConstraint } from './api';

const instance: NotificationsErrorMetadataConstraint = {
    name,
    description,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
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

[Back to Top](#utilities)

---
# NotificationsEventDto


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
**senderData** | **object** |  | [default to undefined]
**recipientGroupId** | **string** |  | [default to undefined]
**recipientData** | **object** |  | [default to undefined]
**externalTenantId** | **string** |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**updatedAt** | **string** |  | [default to undefined]

## Example

```typescript
import { NotificationsEventDto } from './api';

const instance: NotificationsEventDto = {
    id,
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
    createdAt,
    updatedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
# NotificationsEventScalarFieldEnum


## Enum

* `Id` (value: `'id'`)

* `Type` (value: `'type'`)

* `OperationName` (value: `'operationName'`)

* `Subject` (value: `'subject'`)

* `Html` (value: `'html'`)

* `Text` (value: `'text'`)

* `Attempt` (value: `'attempt'`)

* `Used` (value: `'used'`)

* `Error` (value: `'error'`)

* `SenderUserId` (value: `'senderUserId'`)

* `SenderData` (value: `'senderData'`)

* `RecipientGroupId` (value: `'recipientGroupId'`)

* `RecipientUserId` (value: `'recipientUserId'`)

* `RecipientData` (value: `'recipientData'`)

* `ExternalTenantId` (value: `'externalTenantId'`)

* `CreatedAt` (value: `'createdAt'`)

* `UpdatedAt` (value: `'updatedAt'`)

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)

[Back to Top](#utilities)

---
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

[Back to Top](#utilities)

---
# NotificationsUserScalarFieldEnum


## Enum

* `Id` (value: `'id'`)

* `ExternalTenantId` (value: `'externalTenantId'`)

* `ExternalUserId` (value: `'externalUserId'`)

* `CreatedAt` (value: `'createdAt'`)

* `UpdatedAt` (value: `'updatedAt'`)

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

### NotificationsModule
Notifications module with an error filter, guard, controller, database migrations and rest-sdk for work with module from other nodejs appliaction

#### Shared providers
`NotificationsService`

#### Shared imports
`PrismaModule`, `PrismaToolsModule`, `WebhookModule`

#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`checkAccessValidator`|External function for validate|**optional**|-|-|

#### Static environments


| Key    | Description | Sources | Constraints | Default | Value |
| ------ | ----------- | ------- | ----------- | ------- | ----- |
|`useFilters`|Use filters|`obj['useFilters']`, `process.env['NOTIFICATIONS_USE_FILTERS']`|**optional**|```true```|```true```|
|`mailTransport`|Mail transport (example: smtps://username@domain.com:password@smtp.domain.com)|`obj['mailTransport']`, `process.env['NOTIFICATIONS_MAIL_TRANSPORT']`|**optional**|-|-|
|`mailDefaultSenderName`|Default sender name (example: Username)|`obj['mailDefaultSenderName']`, `process.env['NOTIFICATIONS_MAIL_DEFAULT_SENDER_NAME']`|**optional**|-|-|
|`mailDefaultSenderEmail`|Default sender email (example: username@domain.com)|`obj['mailDefaultSenderEmail']`, `process.env['NOTIFICATIONS_MAIL_DEFAULT_SENDER_EMAIL']`|**optional**|-|-|

#### Static configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`guards`|External guards for controllers|**optional**|-|-|
|`mutateController`|Function for additional mutation of controllers|**optional**|-|-|

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

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/notifications
[npm-url]: https://npmjs.org/package/@nestjs-mod/notifications
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[discord-image]: https://img.shields.io/badge/discord-online-brightgreen.svg
[discord-url]: https://discord.gg/meY7UXaG
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/notifications
[downloads-url]: https://npmjs.org/package/@nestjs-mod/notifications
