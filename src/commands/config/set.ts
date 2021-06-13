import { Command, flags } from "@oclif/command";

import { highlight } from "cli-highlight";
import * as chalk from "chalk";
import * as _ from "lodash";
import * as inquirer from "inquirer";

import { cfg, __DIRTY_CONFIG__ } from "../../common/config";
import { success, warning } from "../../common/message";

export default class ConfigSet extends Command {
  static description = "manually set a configuration value";

  static flags = {
    help: flags.help({ char: "h" }),
    force: flags.boolean({
      char: "f",
      description: "force rewrite of config value",
    }),
  };

  static args = [
    { name: "key", description: "configuration key to set" },
    { name: "value", description: "value to set configuration key" },
  ];

  async run() {
    const { args, flags } = this.parse(ConfigSet);

    await cfg()
      .then(([cfg]: [any]) => {
        const currentValue = _.has(cfg, args.key) ? _.get(cfg, args.key) : null;
        if (currentValue !== null && !flags.force)
          return inquirer
            .prompt(
              [
                {
                  type: "confirm",
                  name: "force",
                  message: `Overwrite current value (${highlight(
                    JSON.stringify(currentValue, null, 2),
                    { language: "json", ignoreIllegals: true }
                  )})?`,
                },
              ],
              flags
            )
            .then((args: any) => {
              return Promise.resolve([cfg, args.force]);
            });
        else return Promise.resolve([cfg, true]);
      })
      .then(([cfg, conf]: [any, boolean]) => {
        var val: any = null;
        if (!isNaN(args.value) && !isNaN(parseFloat(args.value))) {
          val = parseFloat(args.value);
        } else {
          try {
            val = JSON.parse(args.value);
          } catch (err) {
            val = args.value;
          }
        }

        if (conf) {
          _.set(cfg, args.key, val);
          success(
            `Set config value ${chalk.blue(args.key)} to ${highlight(
              JSON.stringify(val ? val : null, null, 2),
              {
                language: "json",
                ignoreIllegals: true,
              }
            )}`
          );
          __DIRTY_CONFIG__ = true;
        } else {
          warning(`Did not set config value for ${chalk.blue(args.key)}`);
        }
      });
  }
}
