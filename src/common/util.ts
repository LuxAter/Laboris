import { highlight } from "cli-highlight";

export function highlightJson(value: any): string {
  return highlight(JSON.stringify(value, null, 2), {
    language: "json",
    ignoreIllegals: true,
  });
}
