const puppeteer = require("puppeteer");
const searchString = "coffee";
const encodedString = encodeURI(searchString);
const url = "https://www.google.com";

async function getRelated() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${url}/search?q=${encodedString}`);
  await page.waitForSelector(".k8XOCe");

  let relatedLinks = await page.evaluate(function () {
    return Array.from(document.querySelectorAll("a.k8XOCe")).map((el) =>
      el.getAttribute("href")
    );
  });

  await browser.close();
  relatedLinks = relatedLinks.map((el) => url + el);
  console.log(relatedLinks);
}

getRelated();
