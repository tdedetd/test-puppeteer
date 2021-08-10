const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const URL = 'https://angular.io/guide/example-apps-list';

(async() => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(URL, {
    waitUntil: 'networkidle2'
  });
  await page.screenshot({ path: path.resolve(__dirname, 'out', 'screen.png') });
  const html = await page.content();

  saveHtml(html, path.resolve(__dirname, 'out', 'index.html'));
  await browser.close();
})();

function saveHtml(html, path) {
  const stream = fs.createWriteStream(path);
  stream.once('open', () => {
    stream.write(html);
    stream.end();
  });
}
