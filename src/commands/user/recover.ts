import { Command, flags } from "@oclif/command";

import firebase from "firebase/app";
import "firebase/auth";
import * as inquirer from "inquirer";

import { error, info } from "../../common/message";

export default class UserRecover extends Command {
  static description = "send password recover email";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [{ name: "email", required: false, description: "user email" }];

  async run() {
    const { args, flags } = this.parse(UserRecover);

    await inquirer
      .prompt(
        [
          {
            type: "input",
            name: "email",
            message: "Email:",
          },
        ],
        args
      )
      .then((args: any) => {
        return firebase.auth().sendPasswordResetEmail(args.email);
      })
      .then(() => {
        info("Sent password rest email");
      })
      .catch((err: any) => {
        error(err.message);
      });
  }
}
