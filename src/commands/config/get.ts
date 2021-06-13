import { Command, flags } from "@oclif/command";

import { highlight } from "cli-highlight";
import * as chalk from "chalk";
import * as _ from "lodash";

import { cfg } from "../../common/config";
import { info } from "../../common/message";

export default class ConfigGet extends Command {
  static description = "fetch a specific configuration value";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [{ name: "key", description: "configuration key to get" }];

  async run() {
    const { args, flags } = this.parse(ConfigGet);

    await cfg().then(([cfg]: [any]) => {
      var value = _.has(cfg, args.key) ? _.get(cfg, args.key) : null;
      if (_.isObject())
        info(
          `${chalk.bold.white(args.key)}:\n${highlight(
            JSON.stringify(value, null, 2),
            { language: "json", ignoreIllegals: true }
          )}`
        );
      else
        info(
          `${chalk.bold.white(args.key)}: ${highlight(
            JSON.stringify(value, null, 2),
            { language: "json", ignoreIllegals: true }
          )}`
        );
    });
  }
}
