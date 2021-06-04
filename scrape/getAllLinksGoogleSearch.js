const puppeteer = require("puppeteer");
const queryup = "watch movies online free";
const query = encodeURI(queryup);
let currentPage = 0;
const pages = 5;

async function googler() {
  for (let i = 0; i < pages; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://www.google.com/search?q=${query}&start=${currentPage}`
    );
    await await page.waitForSelector(".yuRUbf > a");

    const links = await page.evaluate(function getUrls() {
      return Array.from(document.querySelectorAll(".yuRUbf > a")).map((el) =>
        el.getAttribute("href")
      );
    });

    await browser.close();
    console.log("----- Page number: " + currentPage / 10 + " -----");
    console.log(links);
    currentPage += 10;
  }
}

googler();
