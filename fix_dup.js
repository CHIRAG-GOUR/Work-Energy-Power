
import fs from "fs";
let html = fs.readFileSync("index.html", "utf8");
html = html.replace(/<div id="router-view">\s*<div id="view-chapter-1\.1" class="route-view">\s*<div id="router-view">\s*<div id="view-chapter-1\.1" class="route-view">/g, `<div id="router-view">\n  <div id="view-chapter-1.1" class="route-view">`);
fs.writeFileSync("index.html", html);
console.log("Fixed duplicates");

