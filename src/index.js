import fetch from "node-fetch";
import { createWriteStream, existsSync, mkdirSync } from "fs";

import { fileURLToPath } from "url";
import { join, dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).option("ver").array("locales").array("arches").array("dpis").check((argv, options) => {
    if (!argv.locales || !argv.arches || !argv.dpis || argv.locales.length === 0 || argv.arches.length === 0 || argv.dpis.length === 0) {
        return "You must specify at least one locale, one arch and one dpi";
    }
    return true;
}).argv;

const files = ["base", ...argv.locales, ...argv.arches, ...argv.dpis];
const downloadDir = join(__dirname, "../", "downloads/");

if (!existsSync(downloadDir)) { mkdirSync(downloadDir) };

console.log(`Discord version ${argv.ver}, attempting to get: ${files.join(", ")}`);
let downloadCount = 0;

const baseUrl = new URL("https://aliucord.com/download/discord");

for(const file of files) {
    const fileUrl = new URL(`?v=${argv.ver}`.concat(file === "base" ? "" : `&split=config.${file}`), baseUrl);

    (async() => {
        try {
            const res = await fetch(fileUrl);
            const fileStream = createWriteStream(join(downloadDir, file === "base" ? "base.apk" : `config.${file}.apk`));

            
            res.body.pipe(fileStream);
            res.body.on("error", (err) => { throw err });
            fileStream.on("finish", () => { downloadCount++; console.log(`Successfully downloaded ${file}.apk (${downloadCount}/${files.length})`) });

        } catch(e) {
            console.error(e);
            process.exit();
        }
    })();
}