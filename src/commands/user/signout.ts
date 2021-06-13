import { Command, flags } from "@oclif/command";

import * as _ from "lodash";

import { cfg, __DIRTY_CONFIG__ } from "../../common/config";

export default class UserSignout extends Command {
  static description = "describe the command here";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [];

  async run() {
    const { args, flags } = this.parse(UserSignout);

    await cfg().then(([cfg]: [any]) => {
      if (_.has(cfg, "userToken")) {
        _.set(cfg, "userToken", undefined);
        __DIRTY_CONFIG__ = true;
        console.log("Signed out");
      } else {
        this.warn("No currently authenticated user");
      }
    });
  }
}
