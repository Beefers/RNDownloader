import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export default function parseArgs(processArgv) {
    return yargs(hideBin(processArgv)).option("ver").array("locales").array("arches").array("dpis").check((argv, options) => {
        if (!argv.locales || !argv.arches || !argv.dpis || argv.locales.length === 0 || argv.arches.length === 0 || argv.dpis.length === 0) {
            return "You must specify at least one locale, one arch and one dpi";
        }
        return true;
    }).argv;
}