const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const cheerio = require('cheerio');
const $ = cheerio.load(html);

$('.route-view').each((idx, el) => {
    let id = $(el).attr('id');
    console.log(`\n--- View ${idx} (${id}) ---`);
    console.log($(el).html().substring(0, 150));
    console.log('... footer is: ', $(el).find('footer').text().trim());
});
