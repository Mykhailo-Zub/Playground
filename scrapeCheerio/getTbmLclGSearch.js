const cheerio = require("cheerio");
const axios = require("axios");

const searchString = "restaurants near me";
const encodedString = encodeURI(searchString);
const UULE = "w+CAIQICIfTmV3IFlvcmssTmV3IFlvcmssVW5pdGVkIFN0YXRlcw";

const AXIOS_OPTIONS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
  },
};

function getLinks() {
  return axios
    .get(
      `https://www.google.com/search?q=${encodedString}&uule=${UULE}&tbm=lcl`,
      AXIOS_OPTIONS
    )
    .then(function ({ data }) {
      let $ = cheerio.load(data);

      const restaurants = [];

      $(".dbg0pd > div").each((i, el) => {
        restaurants[i] = $(el).text();
      });

      console.log(restaurants);
    });
}

getLinks();
