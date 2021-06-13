import { Command, flags } from "@oclif/command";

import * as _ from "lodash";

import { cfg, __DIRTY_CONFIG__ } from "../../common/config";
import { success, warning } from "../../common/message";

export default class UserSignout extends Command {
  static description = "sign-out of the current user";

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
        success("Signed out of current user");
      } else {
        warning("No user is currently signed in");
      }
    });
  }
}
