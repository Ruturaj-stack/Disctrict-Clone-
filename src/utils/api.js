const API_KEY = "f15cf5a6";  // <-- only your key here
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (searchTerm = "Avengers") => {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}`);
  const data = await res.json();
  return data.Search || [];
};
