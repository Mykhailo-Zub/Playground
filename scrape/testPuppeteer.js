const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

let scrape = async () => {
  const browser = await puppeteer.launch(
    {
      headless: false,
    },
    { args: ["--no-sandbox", "--disabled-setuid-sandbox"] }
  );
  const page = await browser.newPage();

  const searchQuery = "Alitas+del+Cadillac+Tumbaco";
  const Url = `https://www.google.com/`;

  const click1 = ".gLFyf";

  await page.goto(Url);
  await page.waitForSelector(click1);
  // await page.click(click1);
  await page.type(click1, searchQuery, {delay: 10})
  await page.waitForTimeout(3000);

//   const commentString = await page.evaluate(function () {
//     return document.querySelector(".jANrlb div:last-child").textContent;
//   });

//   const index = commentString.indexOf(" ");
//   const option1 = parseInt(commentString.slice(0, index));
//   const option2 = parseInt(commentString.slice(index + 1));

//   function totalComments() {
//     if (option1) {
//       return option1;
//     } else {
//       return option2;
//     }
//   }

//   let currentComments = 0;

//   while (currentComments < totalComments() - 1) {
//     currentComments = await page.evaluate(function () {
//       return document.querySelectorAll(".ODSEW-ShBeI").length;
//     });
//     await page.waitForTimeout(3000);
//     await page.evaluate(function () {
//       const lastElementInContainer = [
//         ...document.querySelectorAll(".ODSEW-ShBeI"),
//       ].pop();
//       lastElementInContainer.scrollIntoView();
//     });
//   }

//   let result = await page.evaluate(function () {
//     return Array.from(document.querySelectorAll(".ODSEW-ShBeI-text")).map(
//       (el) => el.innerText.replace(/\s/gi, " ").replace(/  /gi, "")
//     );
//   });

//   await browser.close();

//   result = result.filter((el) => el.length > 0);
//   return result;
};

scrape().then(console.log);
