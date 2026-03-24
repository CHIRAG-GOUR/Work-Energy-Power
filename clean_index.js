
import fs from "fs";
import * as cheerio from "cheerio";

const html = fs.readFileSync("index.html", "utf8");
const patchHtml = fs.readFileSync("patch2.html", "utf8");

const $ = cheerio.load(html);

// Remove ANY existing router-view or view-chapter elements if they managed to sneak out
// Actually let us reconstruct:
// We want to just grab the raw articles of chapter 1. They go up until the last footer inside main.
let mainContent = $("main.ui-grid");

// Since things are messy, let us just wipe out everything inside `<main>` and start fresh
// Oh wait, I dont have the original pure main. 

// Let us find elements with `fade-in`, and split them manually.
// Or wait, from my original `index.html` structure: I can fetch the `index.html` from `git`? No git.
// What about finding ALL elements in main.ui-grid that belong to chapter 1?
// Everything up to the footer "app-footer" is chapter 1.

let ch1Elements = [];
let foundFooter = false;

mainContent.find("> *").each((i, el) => {
    // If it is our router wrappers, flatten them out.
    if ($(el).attr("id") === "router-view") {
        $(el).children().each((j, wrapper) => {
            $(wrapper).children().each((k, child) => {
                 let rawHtml = $.html(child);
                 if (!foundFooter && !rawHtml.includes("CHAPTER 2") && !$(child).html().includes("view-chapter-1.2")) {
                     ch1Elements.push(child);
                     if ($(child).hasClass("app-footer")) {
                         foundFooter = true;
                     }
                 }
            });
        });
    } else {
        let rawHtml = $.html(el);
        if (!foundFooter && !rawHtml.includes("CHAPTER 2") && !$(el).html().includes("view-chapter-1.2")) {
             ch1Elements.push(el);
             if ($(el).hasClass("app-footer")) {
                 foundFooter = true;
             }
        }
    }
});

mainContent.empty();

const routerView = $("<div id=\"router-view\"></div>");
const chapter1View = $("<div id=\"view-chapter-1.1\" class=\"route-view\"></div>");
ch1Elements.forEach(el => chapter1View.append(el));

const chapter2View = $("<div id=\"view-chapter-1.2\" class=\"route-view hidden\" style=\"display:none;\"></div>");
chapter2View.html(patchHtml);

routerView.append(chapter1View);
routerView.append(chapter2View);
mainContent.append(routerView);

fs.writeFileSync("index.html", $.html());
console.log("Successfully rebuilt via Cheerio!");

