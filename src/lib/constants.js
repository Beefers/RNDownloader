import { fileURLToPath } from "url";
import { join, dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
    locales: ["de", "en"],
    arches: ["arm64_v8a", "armeabi_v7a", "x86_64", "x86"],
    dpis: ["xxhdpi", "hdpi"],

    downloadDir: join(__dirname, "../../", "downloads/"),
}