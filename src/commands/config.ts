import { Command, flags } from "@oclif/command";

import { highlight } from "cli-highlight";
import * as chalk from "chalk";

import { cfg } from "../common/config";
import { info } from "../common/message";

export default class Config extends Command {
  static description = "display the current JSON configuration";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [];

  async run() {
    const { args, flags } = this.parse(Config);

    await cfg().then(([cfg]: [any]) => {
      info(
        `${chalk.bold.white('Config')}:\n${highlight(
          JSON.stringify(cfg, null, 2),
          { language: "json", ignoreIllegals: true }
        )}`
      );
    });
  }
}
