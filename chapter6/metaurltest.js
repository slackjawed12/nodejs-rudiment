import { fileURLToPath } from "url";
console.log(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));
console.log(__dirname);
