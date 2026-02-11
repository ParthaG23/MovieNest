// src/Data/tmdb.js

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/* --------------------------------------------------
   Fetch FULL DETAILS (Movie / Anime / Web Series)
-------------------------------------------------- */
export async function fetchTMDbDetails(tmdbId, type = "movie") {
  try {
    const endpoint =
      type === "tv"
        ? `${BASE_URL}/tv/${tmdbId}`
        : `${BASE_URL}/movie/${tmdbId}`;

    const res = await fetch(`${endpoint}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error("TMDb fetch failed");

    return await res.json();
  } catch (error) {
    console.error("TMDb details error:", error);
    return null;
  }
}

/* --------------------------------------------------
   Fetch CAST (Movie / TV)
-------------------------------------------------- */
export async function fetchCast(tmdbId, type = "movie") {
  try {
    const endpoint =
      type === "tv"
        ? `${BASE_URL}/tv/${tmdbId}/credits`
        : `${BASE_URL}/movie/${tmdbId}/credits`;

    const res = await fetch(`${endpoint}?api_key=${API_KEY}`);
    const data = await res.json();

    return data.cast || [];
  } catch (error) {
    console.error("TMDb cast error:", error);
    return [];
  }
}

/* --------------------------------------------------
   Fetch TRAILER (Movie / TV)
-------------------------------------------------- */
export async function fetchTrailer(tmdbId, type = "movie") {
  try {
    const endpoint =
      type === "tv"
        ? `${BASE_URL}/tv/${tmdbId}/videos`
        : `${BASE_URL}/movie/${tmdbId}/videos`;

    const res = await fetch(`${endpoint}?api_key=${API_KEY}`);
    const data = await res.json();

    const videos = data.results || [];
    return (
      videos.find(v => v.type === "Trailer" && v.site === "YouTube") ||
      videos.find(v => v.type === "Teaser" && v.site === "YouTube") ||
      videos.find(v => v.site === "YouTube") ||
      null
    );
  } catch (error) {
    console.error("TMDb trailer error:", error);
    return null;
  }
}
