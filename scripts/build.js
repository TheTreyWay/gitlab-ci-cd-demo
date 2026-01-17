import fs from "node:fs";

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/build.txt", `Build OK @ ${new Date().toISOString()}\n`);
console.log("Built dist/build.txt");
