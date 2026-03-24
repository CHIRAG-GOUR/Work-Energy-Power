const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);
console.log('a tags:', $('a').length);
console.log('nav tags:', $('nav').length);
console.log('button tags:', $('button').length);
console.log('span tags:', $('span').length);
