const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Get all footers in `.route-view`s
$('.route-view').each((idx, el) => {
    const id = $(el).attr('id'); // view-chapter-x.y
    const h2Text = $(el).find('h2').first().text().trim();
    const footer = $(el).find('footer.app-footer, .app-footer').first();
    console.log(idx, id, '->', h2Text, footer.text().trim());
});
