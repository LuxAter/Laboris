import { Command, flags } from "@oclif/command";

import firebase from "firebase/app";
import "firebase/auth";
import * as inquirer from "inquirer";
import * as _ from "lodash";

import { cfg, __DIRTY_CONFIG__ } from "../../common/config";
import { error, success } from "../../common/message";

export default class UserDelete extends Command {
  static description = "delete the current user account";

  static flags = {
    help: flags.help({ char: "h" }),
    force: flags.boolean({ char: "f" }),
  };

  static args = [{ name: "email", required: false, description: "user email" }];

  async run() {
    const { args, flags } = this.parse(UserDelete);

    await inquirer
      .prompt(
        [
          {
            type: "input",
            name: "email",
            message: "Email:",
          },
          {
            type: "confirm",
            name: "force",
            message: "Are you sure you want to delete your account:",
          },
        ],
        args
      )
      .then((args: any) => {
        var user = firebase.auth().currentUser;
        if (user === null)
          return Promise.reject({
            message: "Please sign in before deleting your account.",
          });
        if (args.email !== user.email)
          return Promise.reject({
            message: "Provided email does not match current user.",
          });
        if (!args.force)
          return Promise.reject({ message: "Did not delete current user." });
        return user.delete();
      })
      .then(() => {
        return cfg();
      })
      .then(([cfg]: [any]) => {
        _.set(cfg, "userToken", undefined);
        __DIRTY_CONFIG__ = true;
        success("Deleted user account");
      })
      .catch((err: any) => {
        error(err.message);
      });
  }
}
