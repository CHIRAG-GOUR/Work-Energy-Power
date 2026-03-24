const fs = require('fs');
const ch = require('cheerio');
const $ = ch.load(fs.readFileSync('index.html', 'utf8'));

$('div.route-view').each((i, el) => {
    console.log(i, $(el).attr('id'), $(el).find('h2').first().text().replace(/\s+/g, ' ').substring(0, 50));
});
