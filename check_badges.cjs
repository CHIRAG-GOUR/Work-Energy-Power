const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);

$('h1, h2, span.module-badge, footer, .module-badge').each((i, el) => {
    const text = $(el).text();
    if(text.includes('Chapter 1') || text.includes('Module 1') || text.includes('mod 1')) 
        console.log(el.tagName, ':', text.replace(/\s+/g, ' ').trim());
});

console.log('--- ALL BADGES ---');
$('.module-badge').each((i, el) => {
    console.log($(el).text().trim());
});
