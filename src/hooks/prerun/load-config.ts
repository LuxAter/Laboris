import { Hook } from "@oclif/config";
import { __CONFIG__, __DEFAULT_CONFIG__ } from "../../common/config";
import { readFile } from "fs/promises";
import { join } from "path";

import firebase from "firebase/app";
import "firebase/auth";
import * as _ from "lodash";

const hook: Hook<"prerun"> = async function (opts) {
  await readFile(join(this.config.configDir, "config.json"))
    .then((res: Buffer) => {
      __CONFIG__ = JSON.parse(res.toString());
      if (_.has(__CONFIG__, "userToken")) {
        const userData = JSON.parse(Buffer.from(_.get(__CONFIG__, "userToken"), 'base64').toString());
        const user: firebase.User = new (firebase as any).User(userData, userData.stsTokenManager, userData)
        firebase.auth().updateCurrentUser(user);
      }
    })
    .catch(() => {
      __CONFIG__ = __DEFAULT_CONFIG__;
    });
};

export default hook;
