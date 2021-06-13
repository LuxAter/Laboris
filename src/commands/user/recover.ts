import {Command, flags} from '@oclif/command'

import firebase from "firebase/app";
import "firebase/auth";
import * as inquirer from "inquirer";

export default class UserRecover extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{ name: "email", required: false, description: "user email" }];

  async run() {
    const {args, flags} = this.parse(UserRecover)

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
        console.log("SENT EMAIL");
      })
      .catch((error: any) => {
        this.warn(error.message);
      });
  }
}
