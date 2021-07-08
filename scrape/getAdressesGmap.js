const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const urlsFromMaps = [
  `https://www.google.com/maps/place/Cozy+Corner+Bar/@40.6985781,-73.9120939,14.69z/data=!3m1!5s0x89c25c2844ad5fef:0xa1bb13bc1da24fab!4m13!1m7!3m6!1s0x89c24fa5d33f083b:0xc80b8f06e177fe62!2sNew+York,+NY,+USA!3b1!8m2!3d40.7127753!4d-74.0059728!3m4!1s0x0:0x4775c11e3980845!8m2!3d40.7017226!4d-73.8988121`,
  "https://www.google.com/maps/place/Sala+Thai/@40.7758638,-73.9779344,16.25z/data=!4m13!1m7!3m6!1s0x89c24fa5d33f083b:0xc80b8f06e177fe62!2z0J3RjNGOLdCZ0L7RgNC6LCDQodCo0JA!3b1!8m2!3d40.7127753!4d-74.0059728!3m4!1s0x89c259959260d1af:0x6e21d141e50b1e60!8m2!3d40.7801136!4d-73.9803273",
];

puppeteer.use(StealthPlugin());

async function mapsParser(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForNavigation();

  const adress = await page.evaluate(function () {
    return document.querySelector(".QSFF4-text").innerHTML;
  });

  const website = await page.evaluate(function () {
    return document.querySelector(
      'button[data-tooltip="Open website"] .QSFF4-text' //data-tooltip should be changed if the displayed language of google services is different from English
    ).innerHTML;
  });

  await browser.close();
  console.log("Adress: ", adress);
  console.log("Website: ", website);
}

urlsFromMaps.map(mapsParser);
