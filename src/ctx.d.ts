export type Code = "bn" | "color" | "lvl1" | "lvl2" | "lvl3" | "scans";

export type CodeGroup = {
  type: Code;
  codes: Array<string>;
};

export type Printer = {
  token: string;
  ip?: string;
  codeGroups?: Array<CodeGroup>;
};

export type ctx = {
  baseUrl: string;
  printers: Array<Printer>;
  log: boolean | string | undefined;
  debug?: boolean;
};
