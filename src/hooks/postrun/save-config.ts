import { Hook } from "@oclif/config";
import { cfg, __DIRTY_CONFIG__ } from "../../common/config";
import { access, mkdir, writeFile } from "fs/promises";
import { join } from "path";

const hook: Hook<"postrun"> = async function (opts) {
  const file_path = join(this.config.configDir, "config.json");
  if (__DIRTY_CONFIG__ === true) {
    await access(this.config.configDir)
      .then(() => {
        return new Promise.resolve();
      })
      .catch(() => {
        return mkdir(this.config.configDir, { recursive: true });
      })
      .then(() => {
        return cfg();
      })
      .then(([cfg]: [any]) => {
        return writeFile(file_path, JSON.stringify(cfg));
      })
      .catch((err: any) => {
        this.warn(`Failed to save config file "${file_path}": ${err}`);
      });
  }
};

export default hook;
