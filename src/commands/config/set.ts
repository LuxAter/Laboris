import { Command, flags } from "@oclif/command";

import * as chalk from "chalk";
import * as _ from "lodash";

import { highlightJson } from "../../common/util";
import { cfg, __DIRTY_CONFIG__ } from "../../common/config";
import { success, warning } from "../../common/message";
import {
  configSetQuestion,
  ConfigSetAnswer,
} from "../../common/prompts";

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
      .then(async ([cfg]: [any]) => {
        const answers = await configSetQuestion(_.merge(args, flags), cfg);
        return Promise.resolve([cfg, answers]);
      })
      .then(([cfg, answers]: [any, ConfigSetAnswer]) => {
        var val: any = null;
        if (answers.value.length === 0) {
          val = undefined;
        } else if (!isNaN(parseFloat(answers.value))) {
          val = parseFloat(answers.value);
        } else {
          try {
            val = JSON.parse(answers.value);
          } catch (err) {
            val = answers.value;
          }
        }

        if (answers.force === undefined || answers.force === true) {
          _.set(cfg, answers.key, val);
          success(
            `Set config value ${chalk.blue(answers.key)} to ${highlightJson(
              val === undefined ? null : val
            )}`
          );
          __DIRTY_CONFIG__ = true;
        } else {
          warning(`Did not set config value for ${chalk.blue(answers.key)}`);
        }
      });
  }
}
