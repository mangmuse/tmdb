const bearerToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTQ0MTQ4ZWIzOTExZjlkNGY2MzAxZGY5YjBjOTZlMiIsInN1YiI6IjY2MjViMGM4NjJmMzM1MDE3ZGRhMDFhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.my0shwxxFlTtv5hBOjqmYeciNLHwcg3xR8WykTmWv5M";

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${bearerToken}`,
  },
};
export async function getMovies() {
  try {
    const resourceType = "movie/popular";
    const languageParam = "en-US";
    const url = `https://api.themoviedb.org/3/${resourceType}?language=${languageParam}&page=1`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  } catch (e) {
    throw new Error(e);
  }
}
