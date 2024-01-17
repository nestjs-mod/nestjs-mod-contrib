
# @nestjs-mod/pm2

Production process manager for Node.JS applications with a built-in load balancer for NestJS-mod (Wrapper for https://www.npmjs.com/package/pm2)

[![NPM version][npm-image]][npm-url] [![monthly downloads][downloads-image]][downloads-url] [![Telegram bot][telegram-image]][telegram-url]

## Installation

```bash
npm i --save @nestjs-mod/pm2
```


## Modules

| Link | Category | Description |
| ---- | -------- | ----------- |
| [Pm2](#pm2) | infrastructure | Production process manager for Node.JS applications with a built-in load balancer for NestJS-mod (Wrapper for https://www.npmjs.com/package/pm2) |


## Modules descriptions

### Pm2
Production process manager for Node.JS applications with a built-in load balancer for NestJS-mod (Wrapper for https://www.npmjs.com/package/pm2)

#### Configuration


| Key    | Description | Constraints | Default | Value |
| ------ | ----------- | ----------- | ------- | ----- |
|`ecosystemConfigFile`|Configuration file for PM2|**isNotEmpty** (ecosystemConfigFile should not be empty)|-|-|
|`applicationScriptFile`|Application script file name for run|**isNotEmpty** (applicationScriptFile should not be empty)|-|-|
|`autorestart`|Enable or disable auto restart after process failure.|**optional**|-|-|
|`name`| An arbitrary name that can be used to interact with (e.g. restart) the process later in other commands. Defaults to the script name without its extension (eg “testScript” for “testScript.js”)|**optional**|-|-|
|`script`|The path of the script to run|**optional**|-|-|
|`args`|A string or array of strings composed of arguments to pass to the script.|**optional**|-|-|
|`interpreter_args`|A string or array of strings composed of arguments to call the interpreter process with. Eg “–harmony” or [”–harmony”,”–debug”]. Only applies if interpreter is something other than “none”.|**optional**|-|-|
|`cwd`|The working directory to start the process with.|**optional**|-|-|
|`output`|The path to a file to append stdout output to. Can be the same file as error.|**optional**|-|-|
|`error`|The path to a file to append stderr output to. Can be the same file as output.|**optional**|-|-|
|`log_date_format`|The display format for log timestamps (eg “YYYY-MM-DD HH:mm Z”). The format is a moment display format.|**optional**|-|-|
|`pid`|The path to a file to write the pid of the started process. The file will be overwritten. Note that the file is not used in any way by pm2 and so the user is free to manipulate or remove that file at any time. The file will be deleted when the process is stopped or the daemon killed.|**optional**|-|-|
|`min_uptime`|The minimum uptime of the script before it’s considered successfully started.|**optional**|-|-|
|`max_restarts`|The maximum number of times in a row a script will be restarted if it exits in less than min_uptime.|**optional**|-|-|
|`max_memory_restart`|If sets and script’s memory usage goes about the configured number, pm2 restarts the script. Uses human-friendly suffixes: ‘K’ for kilobytes, ‘M’ for megabytes, ‘G’ for gigabytes’, etc. Eg “150M”.|**optional**|-|-|
|`node_args`|Arguments to pass to the interpreter|**optional**|```-r dotenv/config```|-|
|`time`|Prefix logs with time|**optional**|-|-|
|`wait_ready`|This will make PM2 listen for that event. In your application you will need to add process.send('ready'); when you want your application to be considered as ready.|**optional**|-|-|
|`kill_timeout`|The number of milliseconds to wait after a stop or restart command issues a SIGINT signal to kill the script forceably with a SIGKILL signal.|**optional**|-|-|
|`restart_delay`|Number of millseconds to wait before restarting a script that has exited.|**optional**|-|-|
|`interpreter`|The interpreter for your script (eg “python”, “ruby”, “bash”, etc). The value “none” will execute the ‘script’ as a binary executable.|**optional**|-|-|
|`exec_mode`|If sets to ‘cluster’, will enable clustering (running multiple instances of the script).|**optional**|-|-|
|`instances`|How many instances of script to create. Only relevant in exec_mode ‘cluster’.|**optional**|-|-|
|`merge_logs`|If true, merges the log files for all instances of script into one stderr log and one stdout log. Only applies in ‘cluster’ mode. For example, if you have 4 instances of ‘test.js’ started via pm2, normally you would have 4 stdout log files and 4 stderr log files, but with this option set to true you would only have one stdout file and one stderr file.|**optional**|-|-|
|`watch`| If set to true, the application will be restarted on change of the script file.|**optional**|-|-|
|`force`|By default, pm2 will only start a script if that script isn’t already running (a script is a path to an application, not the name of an application already running). If force is set to true, pm2 will start a new instance of that script.|**optional**|-|-|
|`ignore_watch`|-|**optional**|-|-|
|`cron`|-|**optional**|-|-|
|`execute_command`|-|**optional**|-|-|
|`write`|-|**optional**|-|-|
|`source_map_support`|-|**optional**|-|-|
|`disable_source_map_support`|-|**optional**|-|-|
|`env`|The environment variables to pass on to the process.|**optional**|-|-|

[Back to Top](#modules)

## Links

* https://github.com/nestjs-mod/nestjs-mod - A collection of utilities for unifying NestJS applications and modules
* https://github.com/nestjs-mod/nestjs-mod-contrib - Contrib repository for the NestJS-mod
* https://github.com/nestjs-mod/nestjs-mod-example - Example application built with [@nestjs-mod/schematics](https://github.com/nestjs-mod/nestjs-mod/tree/master/libs/schematics)


## License

MIT

[npm-image]: https://badgen.net/npm/v/@nestjs-mod/pm2
[npm-url]: https://npmjs.org/package/@nestjs-mod/pm2
[telegram-image]: https://img.shields.io/badge/group-telegram-blue.svg?maxAge=2592000
[telegram-url]: https://t.me/nestjs_mod
[downloads-image]: https://badgen.net/npm/dm/@nestjs-mod/pm2
[downloads-url]: https://npmjs.org/package/@nestjs-mod/pm2
