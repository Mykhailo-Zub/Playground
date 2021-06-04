const puppeteer = require("puppeteer");

const url = "https://www.nseindia.com/get-quotes/equity?symbol=SBIN";

async function getDataFromNse() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.nseindia.com/get-quotes/equity?symbol=SBIN");
  await page.waitForSelector("footer");

  const objectArray = await page.evaluate(function () {
    return Array.from(document.querySelectorAll(".table-wrap tbody td")).map(
      (el) => el.textContent()
    );
  });

  await browser.close();
  console.log(objectArray);
}

getDataFromNse();
