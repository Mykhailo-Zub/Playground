const puppeteer = require("puppeteer");
const queryup = "movies";
const query = encodeURI(queryup);
let currentPage = 0;
const pages = 2;
let totalResult = 0;

async function googler() {
  for (let i = 0; i < pages; i++) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://www.google.com/search?q=${query}&start=${currentPage}`
    );
    await page.waitForSelector(".yuRUbf > a");

    const links = await page.evaluate(function getUrls() {
      return Array.from(document.querySelectorAll(".yuRUbf > a")).map((el) =>
        el.getAttribute("href")
      );
    });

    await browser.close();
    console.log("----- Page number: " + currentPage / 10 + " -----");
    console.log(links);
    totalResult += links.length;
    currentPage += 10;
  }
  console.log("Number of result: ", totalResult);
}

googler();
