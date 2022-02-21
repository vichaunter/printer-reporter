import {
  fetchPrinterInfo,
  getPrinterCodeGroupTotal,
  sendReport,
} from "./controllers/printer";
import { CodeGroup, ctx, Printer } from "./ctx";

// const DEMO = "iso.3.6.1.2.1.43.10.2.1.4.1.1 = Counter32: 374671";

const printerService = async (ctx: ctx, printer: Printer) => {
  const { codeGroups } = printer;
  let codeGroupsList: CodeGroup[];
  let printerIp: string | undefined;

  if (codeGroups) {
    codeGroupsList = codeGroups;
    printerIp = printer.ip;
  } else {
    const { data } = await fetchPrinterInfo(printer.token);
    if (!data.codegroups.length || !data.ip) {
      throw Error("Invalid printer setup, missing ip or codegroups");
    }
    codeGroupsList = data.codegroups;
    printerIp = data.ip;
  }

  codeGroupsList.forEach(async (codeGroup, i) => {
    const total = await getPrinterCodeGroupTotal(
      printerIp as string,
      codeGroup.codes
    );

    if (ctx.debug) {
      console.log({ token: printer.token, codeGroup, total });
    } else {
      setTimeout(() => {
        sendReport(printer.token, codeGroup.type, total);
      }, (i + 1) * 5000);
    }
  });
};

const service = (ctx: ctx) => {
  const { printers } = ctx;

  if ((!printers || printers.length, !Array.isArray(printers))) {
    throw Error("Missing printers, put at least one");
  }

  printers.forEach((printer) => printerService(ctx, printer));
};

export default service;
