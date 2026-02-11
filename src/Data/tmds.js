// src/tmdb.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;;




const BASE_URL = "https://api.themoviedb.org/3";

// 1️⃣ Find movie by IMDb ID
export async function fetchTMDbByImdb(imdbId) {
  const res = await fetch(
    `${BASE_URL}/find/${imdbId}?api_key=${API_KEY}&external_source=imdb_id`
  );
  const data = await res.json();
  return data.movie_results?.[0];
}

// 2️⃣ Fetch cast by TMDb movie ID
export async function fetchMovieCast(tmdbId) {
  const res = await fetch(
    `${BASE_URL}/movie/${tmdbId}/credits?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data.cast || [];
}
// src/Data/tmdb.js
export async function fetchMovieTrailer(tmdbId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }`
  );

  const data = await res.json();
  const videos = data.results || [];

  // Priority order
  return (
    videos.find(v => v.type === "Trailer" && v.site === "YouTube") ||
    videos.find(v => v.type === "Teaser" && v.site === "YouTube") ||
    videos.find(v => v.site === "YouTube") ||
    null
  );
}
