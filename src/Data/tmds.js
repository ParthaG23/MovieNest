// src/tmdb.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;;




const BASE_URL = "https://api.themoviedb.org/3";

/* Fetch full TMDb movie data using IMDb ID
 */
export async function fetchTMDbByImdb(imdbId) {
  try {
    // STEP 1: Find TMDb ID using IMDb ID
    const findRes = await fetch(
      `${BASE_URL}/find/${imdbId}?api_key=${API_KEY}&external_source=imdb_id`
    );
    const findData = await findRes.json();

    const movie = findData.movie_results?.[0];
    if (!movie) return null;

    // STEP 2: Fetch FULL movie details (includes genres)
    const detailsRes = await fetch(
      `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}`
    );
    const details = await detailsRes.json();

    return details;
  } catch (error) {
    console.error("TMDb fetch error:", error);
    return null;
  }
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
