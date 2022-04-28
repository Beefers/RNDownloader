import { readdirSync, unlinkSync } from "fs";
import { join } from "path";

import constants from "./constants.js";

export default function clearFilesDirectory() {
    for (const file of readdirSync(constants.downloadDir)) {
        unlinkSync(join(constants.downloadDir, file));
    }
}