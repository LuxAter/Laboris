import { Command, flags } from "@oclif/command";

import firebase from "firebase/app";
import "firebase/auth";

import { info, warning } from "../common/message";

export default class User extends Command {
  static description = "display basic user information";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [];

  async run() {
    const { args, flags } = this.parse(User);

    var user = firebase.auth().currentUser;
    if (user === null) warning("No user is currently signed in");
    else info(`Current user: ${user.email}`);
  }
}
