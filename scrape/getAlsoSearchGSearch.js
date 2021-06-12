const puppeteer = require("puppeteer");
const searchString = "ferrari";
const encodedString = encodeURI(searchString);
const url = "https://www.google.com";

async function getAlsoSearch() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${url}/search?q=${encodedString}&hl=en&gl=us`);
  await page.waitForSelector(".sATSHe .PZPZlf > a");

  let peopleAlsoSearchLinks = await page.evaluate(function () {
    return Array.from(document.querySelectorAll(".sATSHe .PZPZlf > a")).map(
      (el) => el.getAttribute("href")
    );
  });

  await browser.close();

  if (peopleAlsoSearchLinks.length === 10) {
    peopleAlsoSearchLinks = peopleAlsoSearchLinks.slice(5);
  }

  peopleAlsoSearchLinks = peopleAlsoSearchLinks.map((el) => url + el);
  console.log(peopleAlsoSearchLinks);
}

getAlsoSearch();
