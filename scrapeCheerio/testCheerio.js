const cheerio = require("cheerio");
const axios = require("axios");

const AXIOS_OPTIONS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
  },
};

function yourFunc() {
  const BASE_URL =
    "https://www.opentable.co.uk/s?dateTime=2021-05-30T19%3A00%3A00&covers=2&latitude=51.525225&longitude=-0.079615";

  return axios.get(BASE_URL, AXIOS_OPTIONS).then(function ({ data }) {
    let $ = cheerio.load(data);

    console.log(data);
  });
}

yourFunc();
