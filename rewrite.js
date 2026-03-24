
import fs from "fs";
let html = fs.readFileSync("index.html", "utf8");
const ch2Patch = fs.readFileSync("patch2.html", "utf8");

// let us find the start of the <main> tag safely
let headerIdx = html.indexOf(`<header class="glass-card header`);
let mainIdx = html.substring(0, headerIdx).lastIndexOf("<main");

let preMain = html.substring(0, mainIdx);
let postMainIdx = html.lastIndexOf("</main>");
let mainContent = html.substring(mainIdx, postMainIdx);
let postMain = html.substring(postMainIdx);

// Now, extract JUST the Chapter 1 HTML by cutting off at the chapter 2 banner or the first corrupted div
// Looking at the console output before, the corruption started with nested `<div id="router-view">`
// Let us strip OUT all the routing divs we added to get back to pure HTML
mainContent = mainContent.replace(/<div id="router-view">/g, "");
mainContent = mainContent.replace(/<div id="view-chapter-1\.1" class="route-view">/g, "");
mainContent = mainContent.replace(/<div id="view-chapter-1\.2" class="route-view" style="display: none;">/g, "");
mainContent = mainContent.replace(/<div id="view-chapter-1\.2" class="route-view">/g, "");

// Remove all chapter 2 strings that got duplicated.
// We know chapter 2 starts with: <!-- ===============================        CHAPTER 2
let ch2StartRaw = `<!-- ===============================
       CHAPTER 2: SCIENTIFIC CONCEPTION`;
let firstCh2Idx = mainContent.indexOf(`<!-- ===============================`);

let ch1Content = "";
if(firstCh2Idx !== -1) {
   ch1Content = mainContent.substring(0, firstCh2Idx);
} else {
   ch1Content = mainContent;
}

// Clean up leftover `</div>` that we orphaned by removing the `<div id="router-view"` etc.
// Actually Chapter 1 ends right after its footer.
// Let us find the end of Chapter 1 footer:
let footerStr = `<footer class="app-footer fade-in" style="animation-delay: 1.1s;">
    Chapter 1 | skillizee.io
  </footer>`;
let ch1FooterIdx = ch1Content.indexOf(footerStr);
if (ch1FooterIdx !== -1) {
    ch1Content = ch1Content.substring(0, ch1FooterIdx + footerStr.length);
}

// Now reconstruct cleanly
let cleanMain = `
<main class="ui-grid">
<div id="router-view">
  <div id="view-chapter-1.1" class="route-view">
    ${ch1Content.replace("<main class=\"ui-grid\">", "")}
  </div>
  
  <div id="view-chapter-1.2" class="route-view hidden" style="display: none;">
    ${ch2Patch}
  </div>
</div>
`;

let finalHtml = preMain + cleanMain + postMain;
fs.writeFileSync("index.html", finalHtml);
console.log("REWRITTEN CLEANLY!");

