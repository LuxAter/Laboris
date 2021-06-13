import { Command, flags } from "@oclif/command";

import firebase from "firebase/app";
import "firebase/auth";
import * as inquirer from "inquirer";
import * as _ from "lodash";

import { cfg, __DIRTY_CONFIG__ } from "../../common/config";

export default class UserDelete extends Command {
  static description = "describe the command here";

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
          return new Promise((resolve, reject) => {
            reject({message: "Please sign in before deleting account"});
          });
        return user.delete();
      })
      .then(() => {
        return cfg();
      })
      .then(([cfg]: [any]) => {
        _.set(cfg, "userToken", undefined);
        __DIRTY_CONFIG__ = true;
      })
      .catch((error: any) => {
        this.warn(error.message);
      });
  }
}
