export var __DIRTY_CONFIG__: boolean = false;
export var __CONFIG__: any = null;
export var __DEFAULT_CONFIG__: any = {};

export function cfg(...args: any[]): any {
  return new Promise((resolve, reject) => {
    if (__CONFIG__ !== null) resolve([__CONFIG__, ...args]);
    else
      setTimeout(() => {
        if (__CONFIG__ !== null) resolve([__CONFIG__, ...args]);
        else reject();
      }, 250);
  });
}
