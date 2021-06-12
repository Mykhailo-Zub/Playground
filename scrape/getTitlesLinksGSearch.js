const puppeteer = require("puppeteer");
const queryup = "collider";
const query = encodeURI(queryup);
let currentPage = 0;
let pageForLog = 1;
const pages = 2;
let isNext = true;

async function GSearch(searchQuery) {
  for (let i = 0; i < pages && isNext; i++) {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(
      `https://www.google.com/search?q=${searchQuery}&start=${currentPage}&lr=lang_en&uule=w+CAIQICIaQXVzdGluLFRleGFzLFVuaXRlZCBTdGF0ZXM`
    );
    await page.waitForSelector(".yuRUbf > a");

    const links = await page.evaluate(function getUrls() {
      return Array.from(document.querySelectorAll(".yuRUbf > a")).map((el) => ({
        title: el.querySelector("h3").innerText,
        link: el.getAttribute("href"),
      }));
    });

    isNext = await page.evaluate(function isNext() {
      return document.querySelector("a#pnnext");
    });

    await browser.close();
    console.log("----- Page number: " + pageForLog + " -----");
    console.log(links);
    currentPage += 10;
    pageForLog++;
  }
}

GSearch(query);
