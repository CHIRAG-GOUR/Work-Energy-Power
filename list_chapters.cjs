const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const ids = [];
let i = 0;
// We'll rename them 1.1, 1.2, 1.3, 2.1... depends on what the user wants.
$('.route-view').each((idx, el) => {
    ids.push($(el).attr('id'));
    // let's grab the first h1 or h2 inside to print its name
    console.log($(el).attr('id'), '->', $(el).find('h1, h2').first().text().replace(/\n/g, '').trim());
});

console.log($('.module-badge').map((i, el) => $(el).text()).get());
