const cheerio = require("cheerio");
const axios = require("axios");

const searchString = "cats";
const encodedString = encodeURI(searchString);

const AXIOS_OPTIONS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.74 Safari/537.36 Edg/79.0.309.43",
  },
  params: { q: `${encodedString}`, tbm: "isch" },
};

function getLinks() {
  return axios
    .get(`http://www.google.com/ncr/search`, AXIOS_OPTIONS)
    .then(function ({ data }) {
      //   console.log(data);
      let $ = cheerio.load(data);

      const links = [];

      pattern =
        /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;

      const images = data.match(pattern);

      images.map((el, i) => {
        const indexStart = el.lastIndexOf('"http') + 1;
        const indexEnd = el.lastIndexOf('",');
        links[i] = el.slice(indexStart, indexEnd);
      });

      const fixedLinks = [];

      links.map((el, i) => {
        if (el.lastIndexOf(".jpg?") !== -1) {
          const indexEnd = el.lastIndexOf(".jpg?") + 4;
          fixedLinks[i] = el.slice(0, indexEnd);
        } else if (el.lastIndexOf(".png?") !== -1) {
          const indexEnd = el.lastIndexOf(".png?") + 4;
          fixedLinks[i] = el.slice(0, indexEnd);
        } else if (el.lastIndexOf(".svg?") !== -1) {
          const indexEnd = el.lastIndexOf(".png?") + 4;
          fixedLinks[i] = el.slice(0, indexEnd);
        } else if (el.lastIndexOf(".jpeg?") !== -1) {
          const indexEnd = el.lastIndexOf(".jpeg?") + 5;
          fixedLinks[i] = el.slice(0, indexEnd);
        } else fixedLinks[i] = el;
      });

      console.log(fixedLinks);
    });
}

getLinks();
