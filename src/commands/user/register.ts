import { Command, flags } from "@oclif/command";

import firebase from "firebase/app";
import "firebase/auth";
import * as inquirer from "inquirer";
import * as _ from "lodash";

import { cfg, __DIRTY_CONFIG__ } from "../../common/config";

export default class UserRegister extends Command {
  static description = "describe the command here";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [{ name: "email", required: false, description: "user email" }];

  async run() {
    const { args, flags } = this.parse(UserRegister);

    await inquirer
      .prompt(
        [
          {
            type: "input",
            name: "email",
            message: "Email:",
          },
          {
            type: "password",
            name: "password",
            message: "Password:",
            mask: "*",
          },
          {
            type: "password",
            name: "passwordConfirm",
            message: "Confirm Password:",
            mask: "*",
          },
        ],
        args
      )
      .then((args: any) => {
        if (args.password !== args.passwordConfirm)
          return new Promise((resolve, reject) => {
            reject("Passwords do not match");
          });
        return firebase
          .auth()
          .createUserWithEmailAndPassword(args.email, args.password);
      })
      .then((userCredential: any) => {
        return cfg(userCredential.user);
      })
      .then(([cfg, user]: [any, any]) => {
        _.set(
          cfg,
          "userToken",
          Buffer.from(JSON.stringify(user)).toString("base64")
        );
        __DIRTY_CONFIG__ = true;
      })
      .catch((error: any) => {
        this.warn(error.message);
      });
  }
}
