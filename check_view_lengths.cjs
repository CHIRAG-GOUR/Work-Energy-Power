const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('.route-view').each((idx, el) => {
    let id = $(el).attr('id');
    console.log(`--- View ${idx} (${id}) Length: ${$(el).html().length}`);
    console.log($(el).html().substring(0, 100)); // preview
});
