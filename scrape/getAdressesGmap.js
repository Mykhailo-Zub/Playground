const puppeteer = require("puppeteer");
const searchString = "new york";
const encodedString = encodeURI(searchString);

async function littleSquareParser() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.google.com/maps/search/${encodedString}`);
  await page.waitForSelector(".DFlfde[data-value]");

  const number = await page.evaluate(function getNumber() {
    return document
      .querySelector(".DFlfde[data-value]")
      .getAttribute("data-value");
  });

  await browser.close();
  console.log(number);
}

littleSquareParser();
