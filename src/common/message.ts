import * as chalk from "chalk";
import * as figures from "figures";
import * as _ from "lodash";

interface MessageType {
  icon: string;
  labelColor: (a: string) => string;
  iconColor: (a: string) => string;
}

interface MessageDisplayOptions {
  icon?: boolean;
  label?: boolean;
  color?: boolean;
}

var __TYPES__: { [key: string]: MessageType } = {
  info: {
    icon: figures.info,
    labelColor: chalk.bold.bgBlue.black,
    iconColor: chalk.bold.blue,
  },
  success: {
    icon: figures.tick,
    labelColor: chalk.bold.bgGreen.black,
    iconColor: chalk.bold.green,
  },
  warning: {
    icon: figures.warning,
    labelColor: chalk.bold.bgYellow.black,
    iconColor: chalk.bold.yellow,
  },
  error: {
    icon: figures.cross,
    labelColor: chalk.bold.bgRed.black,
    iconColor: chalk.bold.red,
  },
};
var __LONGEST_LABEL__: number = _.maxBy(
  Object.keys(__TYPES__),
  (str: string) => str.length
).length;

export function displayMessage(
  type: string,
  msg: string,
  options: MessageDisplayOption = {}
): void {
  const msgType: MessageType | Null = __TYPES__[type];

  const label: string = options.label === true ? _.upperCase(`${type}:`) : "";
  const icon: string =
    msgType && (options.icon === true || options.icon === undefined)
      ? msgType.icon
      : "";
  const labelColor: (a: string) => string = msgType
    ? msgType.labelColor
    : chalk.reset;
  const iconColor: (a: string) => string = msgType
    ? msgType.iconColor
    : chalk.reset;
  const indentSize: number =
    icon.length +
    label.length +
    (icon.length !== 0 && label.length !== 0 ? 1 : 0) +
    3;

  console.log(
    ` ${iconColor(icon)}${icon.length !== 0 ? " " : ""}${labelColor(label)}${
      label.length !== 0 ? " " : ""
    }${msg.replaceAll("\n", _.padEnd("\n", indentSize))}`
  );
}

export function info(msg: string, options: MessageDisplayOption = {}): void {
  displayMessage("info", msg, options);
}
export function success(msg: string, options: MessageDisplayOption = {}): void {
  displayMessage("success", msg, options);
}
export function warning(msg: string, options: MessageDisplayOption = {}): void {
  displayMessage("warning", msg, options);
}
export function error(msg: string, options: MessageDisplayOption = {}): void {
  displayMessage("error", msg, options);
}
