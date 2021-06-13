import { Command, flags } from "@oclif/command";

import { highlight } from "cli-highlight";
import * as chalk from "chalk";
import * as _ from "lodash";

import { cfg, __DIRTY_CONFIG__ } from "../../common/config";

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

    await cfg().then(([cfg]: [any]) => {
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
      const currentValue = _.has(cfg, args.key) ? _.get(cfg, args.key) : null;
      if(currentValue !== null && !flags.force)
        console.log(`prompt: ${currentValue}`);
      _.set(cfg, args.key, val);
      __DIRTY_CONFIG__ = true;
    });
  }
}
