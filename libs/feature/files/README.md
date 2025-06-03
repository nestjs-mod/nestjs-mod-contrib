
# @nestjs-mod/files

Files module with an error filter, controller and rest-sdk for work with module from other nodejs appliaction

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram][telegram-image]][telegram-url] [![Discord][discord-image]][discord-url]

## Installation

```bash
npm i --save @nestjs-mod/files
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [FilesModule](#filesmodule) | feature | Files module with an error filter, controller and rest-sdk for work with module from other nodejs appliaction |


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
