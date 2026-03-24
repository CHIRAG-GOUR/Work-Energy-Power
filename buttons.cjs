const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);
$('button').each((i, el) => console.log('Button:', $(el).text().trim()));
