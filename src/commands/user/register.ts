import { Command, flags } from "@oclif/command";

import firebase from "firebase/app";
import "firebase/auth";
import * as _ from "lodash";

import { cfg, __DIRTY_CONFIG__ } from "../../common/config";
import { success, error } from "../../common/message";
import { UserRegisterAnswer, userRegisterQuestion } from "../../common/prompts";

export default class UserRegister extends Command {
  static description = "create a new user";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [{ name: "email", required: false, description: "user email" }];

  async run() {
    const { args, flags } = this.parse(UserRegister);

    await userRegisterQuestion(_.merge(args, flags))
      .then((answer: UserRegisterAnswer) => {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(answer.email, answer.password);
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
        success(`Created a new user for ${user.email}`);
        __DIRTY_CONFIG__ = true;
      })
      .catch((err: any) => {
        error(err.message);
      });
  }
}
