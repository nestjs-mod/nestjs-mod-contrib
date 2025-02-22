/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigModel, ConfigModelProperty, NumberTransformer } from '@nestjs-mod/common';
import { IsNotEmpty } from 'class-validator';
import { StartOptions } from 'pm2';

@ConfigModel()
export class Pm2Configuration implements StartOptions {
  @ConfigModelProperty({
    description: 'Configuration file for PM2',
  })
  @IsNotEmpty()
  ecosystemConfigFile!: string;

  @ConfigModelProperty({
    description: 'Application script file name for run',
  })
  @IsNotEmpty()
  applicationScriptFile!: string;

  /**
   * Enable or disable auto restart after process failure (default: true).
   */
  @ConfigModelProperty({
    description: 'Enable or disable auto restart after process failure',
  })
  autorestart?: boolean;

  /**
   * An arbitrary name that can be used to interact with (e.g. restart) the process
   * later in other commands. Defaults to the script name without its extension
   * (eg “testScript” for “testScript.js”)
   */
  @ConfigModelProperty({
    description:
      ' An arbitrary name that can be used to interact with (e.g. restart) the process later in other commands. Defaults to the script name without its extension (eg “testScript” for “testScript.js”)',
  })
  name?: string;

  /**
   * The path of the script to run
   */
  @ConfigModelProperty({
    description: 'The path of the script to run',
  })
  script?: string;

  /**
   * A string or array of strings composed of arguments to pass to the script.
   */
  @ConfigModelProperty({
    description: 'A string or array of strings composed of arguments to pass to the script',
  })
  args?: string | string[];

  /**
   * A string or array of strings composed of arguments to call the interpreter process with.
   * Eg “–harmony” or [”–harmony”,”–debug”]. Only applies if interpreter is something other
   * than “none” (its “node” by default).
   */
  @ConfigModelProperty({
    description:
      'A string or array of strings composed of arguments to call the interpreter process with. Eg “–harmony” or [”–harmony”,”–debug”]. Only applies if interpreter is something other than “none”',
  })
  interpreter_args?: string | string[];

  /**
   * The working directory to start the process with.
   */
  @ConfigModelProperty({
    description: 'The working directory to start the process with',
  })
  cwd?: string;

  /**
   * (Default: “~/.pm2/logs/app_name-out.log”) The path to a file to append stdout output to.
   * Can be the same file as error.
   */
  @ConfigModelProperty({
    description: 'The path to a file to append stdout output to. Can be the same file as error',
  })
  output?: string;

  /**
   * (Default: “~/.pm2/logs/app_name-error.err”) The path to a file to append stderr output to. Can be the same file as output.
   */
  @ConfigModelProperty({
    description: 'The path to a file to append stderr output to. Can be the same file as output',
  })
  error?: string;

  /**
   * The display format for log timestamps (eg “YYYY-MM-DD HH:mm Z”). The format is a moment display format.
   */
  @ConfigModelProperty({
    description:
      'The display format for log timestamps (eg “YYYY-MM-DD HH:mm Z”). The format is a moment display format',
  })
  log_date_format?: string;

  /**
   * Default: “~/.pm2/logs/~/.pm2/pids/app_name-id.pid”)
   * The path to a file to write the pid of the started process. The file will be overwritten.
   * Note that the file is not used in any way by pm2 and so the user is free to manipulate or
   * remove that file at any time. The file will be deleted when the process is stopped or the daemon killed.
   */
  @ConfigModelProperty({
    description:
      'The path to a file to write the pid of the started process. The file will be overwritten. Note that the file is not used in any way by pm2 and so the user is free to manipulate or remove that file at any time. The file will be deleted when the process is stopped or the daemon killed',
  })
  pid?: string;

  /**
   * The minimum uptime of the script before it’s considered successfully started.
   */
  @ConfigModelProperty({
    description: 'The minimum uptime of the script before it’s considered successfully started',
    transform: new NumberTransformer()
  })
  min_uptime?: number;

  /**
   * The maximum number of times in a row a script will be restarted if it exits in less than min_uptime.
   */
  @ConfigModelProperty({
    description: 'The maximum number of times in a row a script will be restarted if it exits in less than min_uptime',
    transform: new NumberTransformer()
  })
  max_restarts?: number;

  /**
   * If sets and script’s memory usage goes about the configured number, pm2 restarts the script.
   * Uses human-friendly suffixes: ‘K’ for kilobytes, ‘M’ for megabytes, ‘G’ for gigabytes’, etc. Eg “150M”.
   */
  @ConfigModelProperty({
    description:
      'If sets and script’s memory usage goes about the configured number, pm2 restarts the script. Uses human-friendly suffixes: ‘K’ for kilobytes, ‘M’ for megabytes, ‘G’ for gigabytes’, etc. Eg “150M”',
  })
  max_memory_restart?: number | string;

  /**
   * Arguments to pass to the interpreter
   */
  @ConfigModelProperty({
    description: 'Arguments to pass to the interpreter',
    default: '-r dotenv/config',
  })
  node_args?: string;

  /**
   * Prefix logs with time
   */
  @ConfigModelProperty({
    description: 'Prefix logs with time',
  })
  time?: boolean;

  /**
   * This will make PM2 listen for that event. In your application you will need to add process.send('ready');
   * when you want your application to be considered as ready.
   */
  @ConfigModelProperty({
    description:
      "This will make PM2 listen for that event. In your application you will need to add process.send('ready'); when you want your application to be considered as ready.",
  })
  wait_ready?: boolean;

  /**
   * (Default: 1600)
   * The number of milliseconds to wait after a stop or restart command issues a SIGINT signal to kill the
   * script forceably with a SIGKILL signal.
   */
  @ConfigModelProperty({
    description:
      'The number of milliseconds to wait after a stop or restart command issues a SIGINT signal to kill the script forceably with a SIGKILL signal',
      transform: new NumberTransformer()
  })
  kill_timeout?: number;

  /**
   * (Default: 0) Number of millseconds to wait before restarting a script that has exited.
   */
  @ConfigModelProperty({
    description: 'Number of millseconds to wait before restarting a script that has exited',
    transform: new NumberTransformer()
  })
  restart_delay?: number;

  /**
   * (Default: “node”) The interpreter for your script (eg “python”, “ruby”, “bash”, etc).
   * The value “none” will execute the ‘script’ as a binary executable.
   */
  @ConfigModelProperty({
    description:
      'The interpreter for your script (eg “python”, “ruby”, “bash”, etc). The value “none” will execute the ‘script’ as a binary executable',
  })
  interpreter?: string;

  /**
   * (Default: ‘fork’) If sets to ‘cluster’, will enable clustering
   * (running multiple instances of the script).
   */
  @ConfigModelProperty({
    description: 'If sets to ‘cluster’, will enable clustering (running multiple instances of the script)',
  })
  exec_mode?: string;

  /**
   * (Default: 1) How many instances of script to create. Only relevant in exec_mode ‘cluster’.
   */
  @ConfigModelProperty({
    description: 'How many instances of script to create. Only relevant in exec_mode ‘cluster’',
    transform: new NumberTransformer()
  })
  instances?: number;

  /**
   * (Default: false) If true, merges the log files for all instances of script into one stderr log
   * and one stdout log. Only applies in ‘cluster’ mode. For example, if you have 4 instances of
   * ‘test.js’ started via pm2, normally you would have 4 stdout log files and 4 stderr log files,
   * but with this option set to true you would only have one stdout file and one stderr file.
   */
  @ConfigModelProperty({
    description:
      'If true, merges the log files for all instances of script into one stderr log and one stdout log. Only applies in ‘cluster’ mode. For example, if you have 4 instances of ‘test.js’ started via pm2, normally you would have 4 stdout log files and 4 stderr log files, but with this option set to true you would only have one stdout file and one stderr file',
  })
  merge_logs?: boolean;

  /**
   * If set to true, the application will be restarted on change of the script file.
   */
  @ConfigModelProperty({
    description: ' If set to true, the application will be restarted on change of the script file',
  })
  watch?: boolean | string[];

  /**
   * (Default: false) By default, pm2 will only start a script if that script isn’t
   * already running (a script is a path to an application, not the name of an application
   * already running). If force is set to true, pm2 will start a new instance of that script.
   */
  @ConfigModelProperty({
    description:
      'By default, pm2 will only start a script if that script isn’t already running (a script is a path to an application, not the name of an application already running). If force is set to true, pm2 will start a new instance of that script',
  })
  force?: boolean;

  @ConfigModelProperty()
  ignore_watch?: string[];

  @ConfigModelProperty()
  cron?: any;

  @ConfigModelProperty()
  execute_command?: any;

  @ConfigModelProperty()
  write?: any;

  @ConfigModelProperty()
  source_map_support?: any;

  @ConfigModelProperty()
  disable_source_map_support?: any;

  /**
   * The environment variables to pass on to the process.
   */
  @ConfigModelProperty({
    description: 'The environment variables to pass on to the process',
  })
  env?: { [key: string]: string };
}
