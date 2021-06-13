import { Command, flags } from "@oclif/command";

import { highlight } from "cli-highlight";
import * as chalk from "chalk";
import * as _ from "lodash";

import { cfg } from "../../common/config";

export default class ConfigGet extends Command {
  static description = "fetch a specific configuration value";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [{ name: "key", description: "configuration key to get" }];

  async run() {
    const { args, flags } = this.parse(ConfigGet);

    await cfg().then(([cfg]: [any]) => {
      this.log(
        `${chalk.bold.white(args.key)}: ${highlight(
          JSON.stringify(
            _.has(cfg, args.key) ? _.get(cfg, args.key) : null,
            null,
            2
          ),
          { language: "json", ignoreIllegals: true }
        )}`
      );
    });
  }
}
