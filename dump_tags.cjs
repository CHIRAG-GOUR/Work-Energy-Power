const fs = require('fs');
const ch = require('cheerio');
const $ = ch.load(fs.readFileSync('index.html', 'utf8'));

$('div.route-view').each((i, el) => {
   const badge = $(el).find('.module-badge').text().trim();
   const footer = $(el).find('footer, .app-footer').text().trim();
   console.log(`View ${i}: badge="${badge}", footer="${footer}"`);
});

console.log("Stray footers outside of route views:");
$('body > footer').each((i, el) => {
   console.log(`Stray ${i}:`, $(el).text().trim());
});
