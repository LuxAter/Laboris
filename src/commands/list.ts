import { Command, flags } from "@oclif/command";

import firebase from "firebase/app";
import "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../common/db";

export default class List extends Command {
  static description = "describe the command here";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [];

  async run() {
    const { args, flags } = this.parse(List);
    const user = firebase.auth().currentUser;

    await db().then((db: any) => {console.log(db);})
    //   .then((db: any) => {
    //     return db.tasks.where('uid', '==', user.uid).get()
    //   })
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => console.log(doc.id, " => ", doc.data()));
    //   });
  }
}
