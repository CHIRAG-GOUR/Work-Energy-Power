const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find nav links
$('.nav-btn, .nav-item, a[data-route], button[data-route]').each((i, el) => {
    console.log('Nav Link:', $(el).text(), '->', $(el).attr('data-route') || $(el).attr('href'));
});
