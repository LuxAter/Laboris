import {Hook} from '@oclif/config'

import firebase from "firebase/app";
import {firebaseConfig} from '../../firebase-config';

import {__APP__} from '../../common/firebase';

const hook: Hook<'prerun'> = async function (opts) {
  __APP__ = firebase.initializeApp(firebaseConfig);
}

export default hook
