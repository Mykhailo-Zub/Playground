const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(process.env["API_KEY"]);

const params = {
  q: "watch movies online free",
  location: "Austin, TX",
};

function paginationCallback(result) {
  console.log(`\nCurrent page: ${result.serpapi_pagination.current}\n`);

  for (organicResult of result.organic_results) {
    console.log({
      title: organicResult.title,
      link: organicResult.link,
    });
  }

  if (result.serpapi_pagination.current == 2) return;

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
