import * as _ from "lodash";

import { cfg } from "./config";
import { warning} from "./message";

export var __APP__: any = null;

export function firestore(...args: any[]): any {
  return cfg(...args)
    .then(([cfg, ...args]: [object, any[]]) => {
      return new Promise((resolve, reject) => {
        if (__APP__ !== null) resolve([cfg, __APP__.firestore(), ...args]);
        else
          setTimeout(() => {
            if (__APP__ !== null) resolve([cfg, __APP__.firestore(), ...args]);
            else reject();
          }, 250);
      });
    })
    .then(([cfg, db, ...args]: [any, any, any[]]) => {
      if (_.has(cfg, "debug") && _.get(cfg, "debug") === true) {
        warning("Using local emulator for DB");
        db.useEmulator("localhost", 8080);
      }
      return Promise.resolve([db, ...args]);
    });
}
