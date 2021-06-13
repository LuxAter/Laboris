import { Command, flags } from "@oclif/command";

import { highlight } from "cli-highlight";
import * as chalk from "chalk";

import { cfg } from "../common/config";

export default class Config extends Command {
  static description = "display the current JSON configuration";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [];

  async run() {
    const { args, flags } = this.parse(Config);

    await cfg().then(([cfg]: [any]) => {
      this.log(
        `${chalk.bold.white("Config")}: ${highlight(
          JSON.stringify(cfg, null, 2),
          {
            language: "json",
            ignoreIllegals: true,
          }
        )}`
      );
    });
  }
}
