import fetch from "node-fetch";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { join } from "path";

import constants from "./lib/constants.js";
import clearFilesDirectory from "./lib/clearFilesDirectory.js";
import parseArgs from "./lib/parseArgs.js";

if (!existsSync(constants.downloadDir)) { mkdirSync(constants.downloadDir) };
clearFilesDirectory();

const argv = parseArgs(process.argv);

const files = ["base", ...argv.locales, ...argv.arches, ...argv.dpis];

console.log(`Discord version ${argv.ver}, attempting to get: ${files.join(", ")}`);
let downloadCount = 0;

const baseUrl = new URL("https://aliucord.com/download/discord");

for(const file of files) {
    const fileUrl = new URL(`?v=${argv.ver}`.concat(file === "base" ? "" : `&split=config.${file}`), baseUrl);
    console.log(fileUrl);

    (async() => {
        try {
            const res = await fetch(fileUrl);
            const fileStream = createWriteStream(join(constants.downloadDir, file === "base" ? "base.apk" : `config.${file}.apk`));
            
            res.body.pipe(fileStream);
            res.body.on("error", (err) => { throw err });
            fileStream.on("finish", () => { downloadCount++; console.log(`Successfully downloaded ${file}.apk (${downloadCount}/${files.length})`) });

        } catch(e) {
            console.error(e);
            process.exit();
        }
    })();
}