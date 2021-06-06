const puppeteer = require("puppeteer");
const queryup = "coffee";
const query = encodeURI(queryup);
let currentPage = 0;
let pageForLog = 1;
const pages = 2;

async function GSearch(searchQuery) {
  for (let i = 0; i < pages; i++) {
    const browser = await puppeteer.launch({
      // headless: false,
    });
    const page = await browser.newPage();
    await page.goto(
      `https://www.google.com/search?q=${searchQuery}&start=${currentPage}&lr=lang_en`
    );
    await await page.waitForSelector(".yuRUbf > a");

    const links = await page.evaluate(function getUrls() {
      return Array.from(document.querySelectorAll(".yuRUbf > a")).map((el) => ({
        title: el.querySelector("h3").innerText,
        link: el.getAttribute("href"),
      }));
    });

    await browser.close();
    console.log("----- Page number: " + pageForLog + " -----");
    console.log(links);
    currentPage += 10;
    pageForLog++;
  }
}

GSearch(query);
