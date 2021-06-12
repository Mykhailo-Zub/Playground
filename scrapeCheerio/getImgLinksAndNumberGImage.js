const axios = require("axios");

const searchString = "cats";
const encodedString = encodeURI(searchString);

const AXIOS_OPTIONS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.74 Safari/537.36 Edg/79.0.309.43",
  },
  params: { q: encodedString, tbm: "isch" },
};

const decodeUrl = (url) => decodeURIComponent(JSON.parse(`"${url}"`));

function getLinks() {
  return axios
    .get(`https://www.google.com/search`, AXIOS_OPTIONS)
    .then(function ({ data: html }) {
      const pattern =
        /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;

      const matches = html.matchAll(pattern);

      return [...matches].map(({ groups: { url } }) => decodeUrl(url));
    });
}

getLinks().then((links) =>
  console.log(links, "\nNumber of results: ", links.length)
);
