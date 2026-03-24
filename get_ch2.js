
import fs from "fs";
let html = fs.readFileSync("index.html", "utf8");
let ch2 = html.substring(html.indexOf("<div id=\"view-chapter-1.2\""));
console.log(ch2.substring(0, 1000));

