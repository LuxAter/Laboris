import { Command, flags } from "@oclif/command";

import firebase from "firebase/app";
import "firebase/auth";
import * as inquirer from "inquirer";
import * as _ from "lodash";

import { cfg, __DIRTY_CONFIG__ } from "../../common/config";
import { success, error } from "../../common/message";
import { UserSigninAnswer, userSigninQuestion } from "../../common/prompts";

export default class UserSignin extends Command {
  static description = "sign-in to an existing account";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [{ name: "email", required: false, description: "user email" }];

  async run() {
    const { args, flags } = this.parse(UserSignin);

    await userSigninQuestion(_.merge(args, flags))
      .then((answer: UserSigninAnswer) => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(answer.email, answer.password);
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
        success(`Signed in as ${user.email}`);
        __DIRTY_CONFIG__ = true;
      })
      .catch((err: any) => {
        error(err.message);
      });
  }
}
