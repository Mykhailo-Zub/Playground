const puppeteer = require("puppeteer");
const queryup = "nodejs+tutorial";
const query = encodeURI(queryup);

async function YTSearch(searchQuery) {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto(
    `https://www.youtube.com/results?search_query=${searchQuery}`
  );
  await page.waitForSelector("div#contents");
  await page.waitForTimeout(10000);

  const titles = await page.evaluate(function () {
    return Array.from(
      document.querySelectorAll("ytd-video-renderer a#video-title")
    ).map((el) => ({
      title: el.getAttribute("title"),
      link: "https://www.youtube.com" + el.getAttribute("href"),
    }));
  });

  await browser.close();
  console.log(titles);
}

YTSearch(query);
