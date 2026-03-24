
import fs from "fs";

let html = fs.readFileSync("index.html", "utf-8");

// Parse the html, looking for boundaries.
// Chapter 1
let headerStart = `<header class="glass-card header-card fade-in"`;
let ch2Start = `<!-- ===============================`;
let footerStart = `<footer class="app-footer`;

let preHeader = html.substring(0, html.indexOf(headerStart));
let ch1Part = html.substring(html.indexOf(headerStart), html.indexOf(ch2Start));
let ch2Part = html.substring(html.indexOf(ch2Start), html.indexOf(footerStart));
let postFooter = html.substring(html.indexOf(footerStart));

const newHtml = `${preHeader}
<div id="router-view">
  <div id="view-chapter-1.1" class="route-view">
    ${ch1Part}
  </div>
  <div id="view-chapter-1.2" class="route-view" style="display: none;">
    ${ch2Part}
  </div>
</div>
${postFooter}`;

fs.writeFileSync("index.html", newHtml);
console.log("Separated chapters inside index.html");

