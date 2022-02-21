import { execSync } from "child_process";

export const runCommand = async (command: string) => {
  try {
    return execSync(command).toString();
  } catch (e: any) {
    throw Error(e.message);
  }
};

export const parseCounter = (str: string): number | null => {
  const regex = new RegExp(/[0-9]+$/);
  const match = regex.exec(str);

  return match ? Number(match[0]) : match;
};

export const trim = (str: string) => {
  return str.replace(/(\r\n|\n|\r)/gm, "");
};
