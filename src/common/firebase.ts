export var __APP__: any = null;

export function firestore(...args: any[]): any {
  return new Promise((resolve, reject) => {
    if (__APP__ !== null) resolve([__APP__.firestore(), ...args]);
    else
      setTimeout(() => {
        if (__APP__ !== null) resolve([__APP__.firestore(), ...args]);
        else reject();
      }, 250);
  });
}
