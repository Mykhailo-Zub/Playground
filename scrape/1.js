const puppeteer = require("puppeteer"); // Require the Package we need...

let scrape = async () => {
  // Prepare scrape...

  const browser = await puppeteer.launch(
    {
      headless: false,
    },
    { args: ["--no-sandbox", "--disabled-setuid-sandbox"] }
  ); // Prevent non-needed issues for *NIX
  const page = await browser.newPage(); // Create request for the new page to obtain...

  const busqueda = "Alitas+del+Cadillac+Tumbaco";
  const Url = `https://www.google.com/maps/search/${busqueda}`;

  const click1 = ".widget-pane-link";

  await page.goto(Url); // Define the Maps URL to Scrape...
  await page.waitForSelector(click1);
  await page.click(click1);
  await page.waitForNavigation();
  console.log(page.url());
  console.log("3");
  console.log("how many?", (await page.$$(".section-review-text")).length);

  //div.section-result:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h3:nth-child(1) > span:nth-child(1)

  let listLength = await page.evaluate((sel) => {
    window.scrollBy(0, window.innerHeight);
    return document.getElementsByClassName(sel).length;
  }, comentarioLength);

  console.log(listLength);

  for (let i = 1; i <= listLength; i++) {
    let selectorComentarios = comentarios.replace("Index", i);

    const result = await page.evaluate((sel) => {
      // Let's create variables and store values...

      return document.querySelector(sel).innerText;
    }, selectorComentarios);

    if (!result) {
      continue;
    }

    console.log(i + result);
  }

  /*await page.evaluate(_ => {
        window.scrollBy(0, window.innerHeight)
    })*/

  browser.close(); // Close the Browser...
  return result; // Return the results with the Review...
};

scrape().then((value) => {
  // Scrape and output the results...

  console.log(value); // Yay, output the Results...
});
