const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(process.env["API_KEY"]);
let totalResult = 0;

const params = {
  q: "movies",
  location: "Austin, TX",
};

function paginationCallback(result) {
  console.log(`\nCurrent page: ${result.serpapi_pagination.current}\n`);

  for (organicResult of result.organic_results) {
    console.log(organicResult.link);
    totalResult += links.length;
  }

  if (result.serpapi_pagination.current == 5) {
    console.log("Number of results: ", totalResult);
    return;
  }

  const num = params.num || 10;

  search.json(
    {
      ...params,
      start: result.serpapi_pagination.current * num,
    },
    paginationCallback
  );
}

search.json(params, paginationCallback);
