import { Command, flags } from "@oclif/command";

import firebase from "firebase/app";
import "firebase/auth";
import * as _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import { __APP__, firestore } from "../../common/firebase";
import { success, error } from "../../common/message";
import { taskNewQuestion, TaskNewAnswer } from "../../common/prompts";

export default class TaskNew extends Command {
  static description = "create a new task/habbit";

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [];

  async run() {
    const { args, flags } = this.parse(TaskNew);
    const user = firebase.auth().currentUser;

    if (user === null) {
      error("You must log in before creating a new task");
      return;
    }

    await firestore().then(async ([db]: [firebase.firestore.Firestore]) => {
      const answer: TaskNewAnswer = await taskNewQuestion(
        _.merge(args, flags),
        db,
        user.uid
      );
      const uuid = uuidv4();
      var batch = db.batch();
      batch.set(
        db.collection("tasks").doc(uuid),
        {
          uuid: uuid,
          label: answer.label,
          priority: answer.priority,
          users: [user.uid, ...(answer.users || [])],
          createdDate: firebase.firestore.Timestamp.now(),
          modifiedDate: firebase.firestore.FieldValue.serverTimestamp(),
          parents: answer.parents || [],
          children: answer.children || [],
          tags: answer.tags || [],
        },
        { merge: true }
      );
      if (answer.parents)
        answer.parents.forEach((parentUuid: string) => {
          batch.update(db.collection("tasks").doc(parentUuid), {
            children: firebase.firestore.FieldValue.arrayUnion(uuid),
            modifiedDate: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      if (answer.children)
        answer.children.forEach((childUuid: string) => {
          batch.update(db.collection("tasks").doc(childUuid), {
            parents: firebase.firestore.FieldValue.arrayUnion(uuid),
            modifiedDate: firebase.firestore.FieldValue.serverTimestamp(),
          });
        });
      try {
        await batch.commit();
        success(`Created new task "${answer.label}"`);
      } catch (err) {
        error(`Failed to create new task "${answer.label}": ${err}`);
      }
    });
    __APP__.delete();
  }
}
