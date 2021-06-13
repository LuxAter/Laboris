laboris
=======

Personal task and time manager

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/laboris.svg)](https://npmjs.org/package/laboris)
[![Downloads/week](https://img.shields.io/npm/dw/laboris.svg)](https://npmjs.org/package/laboris)
[![License](https://img.shields.io/npm/l/laboris.svg)](https://github.com/LuxAter/laboris/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g laboris
$ laboris COMMAND
running command...
$ laboris (-v|--version|version)
laboris/0.0.0 linux-x64 node-v16.3.0
$ laboris --help [COMMAND]
USAGE
  $ laboris COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`laboris autocomplete [SHELL]`](#laboris-autocomplete-shell)
* [`laboris commands`](#laboris-commands)
* [`laboris config`](#laboris-config)
* [`laboris config:get [KEY]`](#laboris-configget-key)
* [`laboris config:set [KEY] [VALUE]`](#laboris-configset-key-value)
* [`laboris hello [FILE]`](#laboris-hello-file)
* [`laboris help [COMMAND]`](#laboris-help-command)
* [`laboris update [CHANNEL]`](#laboris-update-channel)
* [`laboris user [FILE]`](#laboris-user-file)
* [`laboris user:delete [EMAIL]`](#laboris-userdelete-email)
* [`laboris user:recover [EMAIL]`](#laboris-userrecover-email)
* [`laboris user:register [EMAIL]`](#laboris-userregister-email)
* [`laboris user:signin [EMAIL]`](#laboris-usersignin-email)
* [`laboris user:signout`](#laboris-usersignout)

## `laboris autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ laboris autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ laboris autocomplete
  $ laboris autocomplete bash
  $ laboris autocomplete zsh
  $ laboris autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.3.0/src/commands/autocomplete/index.ts)_

## `laboris commands`

list all the commands

```
USAGE
  $ laboris commands

OPTIONS
  -h, --help              show CLI help
  -j, --json              display unfiltered api data in json format
  -x, --extended          show extra columns
  --columns=columns       only show provided columns (comma-separated)
  --csv                   output is csv format [alias: --output=csv]
  --filter=filter         filter property by partial string matching, ex: name=foo
  --hidden                show hidden commands
  --no-header             hide table header from output
  --no-truncate           do not truncate output to fit screen
  --output=csv|json|yaml  output in a more machine friendly format
  --sort=sort             property to sort by (prepend '-' for descending)
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v1.3.0/src/commands/commands.ts)_

## `laboris config`

display the current JSON configuration

```
USAGE
  $ laboris config

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/config.ts](https://github.com/LuxAter/laboris/blob/v0.0.0/src/commands/config.ts)_

## `laboris config:get [KEY]`

fetch a specific configuration value

```
USAGE
  $ laboris config:get [KEY]

ARGUMENTS
  KEY  configuration key to get

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/config/get.ts](https://github.com/LuxAter/laboris/blob/v0.0.0/src/commands/config/get.ts)_

## `laboris config:set [KEY] [VALUE]`

manually set a configuration value

```
USAGE
  $ laboris config:set [KEY] [VALUE]

ARGUMENTS
  KEY    configuration key to set
  VALUE  value to set configuration key

OPTIONS
  -f, --force  force rewrite of config value
  -h, --help   show CLI help
```

_See code: [src/commands/config/set.ts](https://github.com/LuxAter/laboris/blob/v0.0.0/src/commands/config/set.ts)_

## `laboris hello [FILE]`

describe the command here

```
USAGE
  $ laboris hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ laboris hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/LuxAter/laboris/blob/v0.0.0/src/commands/hello.ts)_

## `laboris help [COMMAND]`

display help for laboris

```
USAGE
  $ laboris help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `laboris update [CHANNEL]`

update the laboris CLI

```
USAGE
  $ laboris update [CHANNEL]
```

_See code: [@oclif/plugin-update](https://github.com/oclif/plugin-update/blob/v1.3.10/src/commands/update.ts)_

## `laboris user [FILE]`

describe the command here

```
USAGE
  $ laboris user [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/user.ts](https://github.com/LuxAter/laboris/blob/v0.0.0/src/commands/user.ts)_

## `laboris user:delete [EMAIL]`

describe the command here

```
USAGE
  $ laboris user:delete [EMAIL]

ARGUMENTS
  EMAIL  user email

OPTIONS
  -f, --force
  -h, --help   show CLI help
```

_See code: [src/commands/user/delete.ts](https://github.com/LuxAter/laboris/blob/v0.0.0/src/commands/user/delete.ts)_

## `laboris user:recover [EMAIL]`

describe the command here

```
USAGE
  $ laboris user:recover [EMAIL]

ARGUMENTS
  EMAIL  user email

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/user/recover.ts](https://github.com/LuxAter/laboris/blob/v0.0.0/src/commands/user/recover.ts)_

## `laboris user:register [EMAIL]`

describe the command here

```
USAGE
  $ laboris user:register [EMAIL]

ARGUMENTS
  EMAIL  user email

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/user/register.ts](https://github.com/LuxAter/laboris/blob/v0.0.0/src/commands/user/register.ts)_

## `laboris user:signin [EMAIL]`

describe the command here

```
USAGE
  $ laboris user:signin [EMAIL]

ARGUMENTS
  EMAIL  user email

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/user/signin.ts](https://github.com/LuxAter/laboris/blob/v0.0.0/src/commands/user/signin.ts)_

## `laboris user:signout`

describe the command here

```
USAGE
  $ laboris user:signout

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/user/signout.ts](https://github.com/LuxAter/laboris/blob/v0.0.0/src/commands/user/signout.ts)_
