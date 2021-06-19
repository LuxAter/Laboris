import { Command, flags } from "@oclif/command";

import firebase from "firebase/app";
import "firebase/auth";
import * as _ from "lodash";

import { cfg, __DIRTY_CONFIG__ } from "../../common/config";
import { error, warning, success } from "../../common/message";
import { UserDeleteAnswer, userDeleteQuestion } from "../../common/prompts";

export default class UserDelete extends Command {
  static description = "delete the current user account";

  static flags = {
    help: flags.help({ char: "h" }),
    force: flags.boolean({
      char: "f",
      description: "force the user deletion, without confirmation",
    }),
  };

  static args = [{ name: "email", required: false, description: "user email" }];

  async run() {
    const { args, flags } = this.parse(UserDelete);

    var user = firebase.auth().currentUser;
    if (user === null) {
      error("Must sign in before deleting user account.");
      return;
    }

    await userDeleteQuestion(_.merge(args, flags), user).then(
      (answer: UserDeleteAnswer) => {
        if (!user) error("Must sign in before deleting user account.");
        else if (!answer.force) warning("Did not delete current user.");
        else
          return user
            .delete()
            .then(cfg)
            .then(([cfg]: [any]) => {
              _.set(cfg, "userToken", undefined);
              __DIRTY_CONFIG__ = true;
              success("Deleted user account");
            })
            .catch((err: any) => {
              error(err.message);
            });
      }
    );
  }
}
