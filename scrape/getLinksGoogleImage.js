const puppeteer = require("puppeteer");
const searchString = "dollar to euro";
const encodedString = encodeURI(searchString);

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.google.com/search?q=${encodedString}&tbm=isch`);
  await page.waitForSelector(".rg_i[src]");

  const links = await page.evaluate(function getImgsUrls() {
    return Array.from(document.querySelectorAll(".rg_i[src]")).map((el) =>
      el.getAttribute("src")
    );
  });

  await browser.close();

  console.log(links);
}

run(SEARCH_URL);
