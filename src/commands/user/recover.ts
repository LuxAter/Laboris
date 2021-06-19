import { Command, flags } from "@oclif/command";

import firebase from "firebase/app";
import "firebase/auth";
import * as _ from "lodash";

import { error, info } from "../../common/message";
import { UserRecoverAnswer, userRecoverQuestion } from "../../common/prompts";

export default class UserRecover extends Command {
  static description = "send password recover email";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [{ name: "email", required: false, description: "user email" }];

  async run() {
    const { args, flags } = this.parse(UserRecover);

    await userRecoverQuestion(_.merge(args, flags))
      .then((answer: UserRecoverAnswer) => {
        return firebase.auth().sendPasswordResetEmail(answer.email);
      })
      .then(() => {
        info("Sent password rest email");
      })
      .catch((err: any) => {
        error(err.message);
      });
  }
}
