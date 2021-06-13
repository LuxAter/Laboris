import {Hook} from '@oclif/config'

import firebase from "firebase/app";
import {firebaseConfig} from '../../firebase-config';

const hook: Hook<'prerun'> = async function (opts) {
  firebase.initializeApp(firebaseConfig);
}

export default hook
