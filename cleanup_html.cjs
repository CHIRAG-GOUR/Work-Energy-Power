const fs = require('fs');
const ch = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = ch.load(html);

// Remove all existing footers to deduplicate them
$.root().find('footer').remove();

// Get all route-views (chapters)
const views = $('.route-view').toArray();

// Remove duplicate extra views if any
if (views.length > 2) {
    for (let i = 2; i < views.length; i++) {
        $(views[i]).remove();
    }
}

// ----------------------------------------
// Fix View 1 (Module 1 Chapter 1)
// ----------------------------------------
const view1 = $('#view-chapter-1.1');
// Ensure it says "Mod 1 Chapter 1" maybe?
// Actually the user said: "I want it like 1.2 have mod 1 chapter 2 , and so on ."
// Does the user have a sidebar? Let's check if there's a sidebar we missed.
const sidebar = $('#sidebar, .sidebar, nav, .navigation, .bottom-nav');
if (sidebar.length) {
    console.log("Found sidebar!", sidebar.html().substring(0, 100));
}

// Insert clean footer
view1.append('<footer class="app-footer fade-in" style="animation-delay: 1.1s; grid-column: 1 / -1; margin-top:2rem;">Mod 1 Chapter 1 | skillizee.io</footer>');

// ----------------------------------------
// Fix View 2 (Module 1 Chapter 2)
// ----------------------------------------
const view2 = $(views[1]);
view2.attr('id', 'view-chapter-1.2');

// Make sure the title is clean
const h2_2 = view2.find('h2').first();
if (h2_2.length && !h2_2.text().toLowerCase().includes('chapter 2')) {
    h2_2.text('Chapter 2: ' + h2_2.text());
}

// Insert module badge if missing
if (!view2.find('.module-badge').length) {
    const banner = view2.find('.banner-card').first();
    if (banner.length) {
        banner.prepend('<div class="header-content" style="margin-bottom:1rem;"><span class="module-badge">Module 1</span></div>');
    } else {
        view2.prepend('<div class="header-content" style="margin-bottom:1rem; padding: 1rem;"><span class="module-badge">Module 1</span></div>');
    }
}

// Insert clean footer
view2.append('<footer class="app-footer fade-in" style="animation-delay: 1.1s; grid-column: 1 / -1; margin-top: 2rem;">Mod 1 Chapter 2 | skillizee.io</footer>');

fs.writeFileSync('index.html', $.html());
console.log('index.html cleaned and formatted with correct views and footers.');
