import apiClient from "../clients/api";
import { parseCounter, runCommand, trim } from "../helpers";

export const getPrinterCodeGroupTotal = async (ip: string, codes: string[]) => {
  let total: number = 0;

  for (let i = 0; i < codes.length; i++) {
    let code = codes[i];

    let result = await runCommand(`snmpwalk -c public -v 1 ${ip} ${code}`);
    let count = parseCounter(trim(result));

    if (count) {
      total += count;
    }
  }

  return total;
};

export const fetchPrinterInfo = (token: string) => {
  return apiClient.call("/printers/info", { token });
};

export const sendReport = (token: string, type: string, total: number) => {
  return apiClient.call("/printers/update-report", {
    type,
    total,
    token,
  });
};
