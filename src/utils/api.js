const API_KEY = "f15cf5a6";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (searchTerm = "Avengers", page = 1) => {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`);
  const data = await res.json();
  return data.Search || [];
};

export const fetchMoviesBatch = async (desiredCount = 200, queries = [
  "Avengers","Batman","Spider-Man","Mission","Star Wars","Harry Potter",
  "Thor","Iron Man","Captain","Matrix","Joker","Guardians","Fast","Furious","Bond",
  "Transformers","Deadpool","Wolverine","Hobbit","Lord","King","Queen","Alien","Predator",
  "Terminator","Rocky","Creed","John Wick","Mad Max","Godzilla","Kong","Dune","Blade","Ghost"
]) => {
  const seen = new Set();
  const out = [];

  for (const q of queries) {
    for (let page = 1; page <= 10; page++) {
      const items = await fetchMovies(q, page);
      for (const m of items) {
        if (!m || !m.imdbID || m.Poster === "N/A") continue;
        if (seen.has(m.imdbID)) continue;
        seen.add(m.imdbID);
        out.push(m);
        if (out.length >= desiredCount) return out;
      }
      // If page yields no results, break early for this query
      if (!items || items.length === 0) break;
    }
    if (out.length >= desiredCount) break;
  }

  return out;
};
