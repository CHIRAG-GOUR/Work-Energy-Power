const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load(fs.readFileSync('index.html', 'utf8'));

$('button, a').each((i, el) => {
    let t = $(el).text().trim().toLowerCase();
    if(t.includes('chapter') || t.includes('mod')) {
        console.log(t);
    }
});

// Also print the nav html structure if it exists:
console.log($('.navigation, #navigation, nav, .bottom-bar').html() || 'No nav found');
