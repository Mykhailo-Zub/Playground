const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const searchString = "new york";
const encodedString = encodeURI(searchString);

puppeteer.use(StealthPlugin());

async function mapsParser() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // await page.goto(`https://www.google.com/maps/search/${encodedString}`);
  await page.goto(
    `https://www.google.com/maps/place/Cozy+Corner+Bar/@40.6985781,-73.9120939,14.69z/data=!3m1!5s0x89c25c2844ad5fef:0xa1bb13bc1da24fab!4m13!1m7!3m6!1s0x89c24fa5d33f083b:0xc80b8f06e177fe62!2sNew+York,+NY,+USA!3b1!8m2!3d40.7127753!4d-74.0059728!3m4!1s0x0:0x4775c11e3980845!8m2!3d40.7017226!4d-73.8988121`
  );
  // await page.waitForSelector(".QSFF4");
  await page.waitForNavigation();

  const adress = await page.evaluate(function () {
    return document.querySelector(".QSFF4-text").innerHTML;
  });

  const website = await page.evaluate(function () {
    return document.querySelector('button[data-tooltip="Open website"]');
    // .getAttribute("aria-label")
    // .replace("Website: ", "");
  });

  await browser.close();
  console.log("Adress: ", adress);
  console.log("Website: ", website);
}

mapsParser();
