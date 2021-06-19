import { Command, flags } from "@oclif/command";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { __APP__, firestore } from "../common/firebase";
import { error } from "../common/message";

export default class List extends Command {
  static description = "describe the command here";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [];

  async run() {
    const { args, flags } = this.parse(List);
    const user = firebase.auth().currentUser;

    if (user === null) {
      error("You must log in before preforming database queries");
      return;
    }

    await firestore()
      .then(([db]: [any]) => {
        return db.collection("tasks").where("uid", "==", user.uid).get();
      })
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          console.log(doc.id, " => ", doc.data());
        });
      });
    __APP__.delete();
  }
}
