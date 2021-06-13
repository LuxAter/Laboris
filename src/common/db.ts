import firebase from "firebase/app"
import "firebase/firestore"
// import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"

interface Database {
  users: any,
  tasks: any
};

export function db(...args: any[]): any {
  return Promise.resolve(firebase.firestore());
}
