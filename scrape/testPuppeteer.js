const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

async function scrapeOpenTable() {
  const BASE_URL =
    "https://www.opentable.co.uk/s?dateTime=2021-05-30T19%3A00%3A00&covers=2&latitude=51.525225&longitude=-0.079615";

  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(BASE_URL);
  // More commands here...
  /* You may view the docs at:
       https://devdocs.io/puppeteer/
     And more magic at:
       https://www.npmjs.com/package/puppeteer
     Github:
       https://github.com/puppeteer/puppeteer
  */

  // await browser.close();
}

scrapeOpenTable();
