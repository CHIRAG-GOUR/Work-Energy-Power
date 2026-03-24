const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);
$('footer').each((i, el) => {
   console.log(i, $(el).text().trim());
   console.log('  Parent:', $(el).parent()[0].name, 'id:', $(el).parent().attr('id'), 'class:', $(el).parent().attr('class'));
});
