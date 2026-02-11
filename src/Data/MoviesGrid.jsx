import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import LoadingSkeleton from "../Components/LoadingSkeleton";
import { fetchTMDbByImdb } from "./tmds";

// TEMP local data (later replace with Firebase / Cloud DB)
import movies from "./Movies";

const MOVIES_PER_PAGE = 12;
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MoviesGrid = ({ filter, searchText }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [tmdbMovies, setTmdbMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Cache TMDb responses (prevents duplicate API calls)
  const tmdbCache = useRef({});

  /* --------------------------------------------------
     1️⃣ FILTER BY CATEGORY ONLY (cloud safe)
  -------------------------------------------------- */
  const filteredMovies = useMemo(() => {
    return filter
      ? movies.filter((m) => m.category === filter)
      : movies;
  }, [filter]);

  /* --------------------------------------------------
     2️⃣ PAGINATION
  -------------------------------------------------- */
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;

  const currentMovies = useMemo(() => {
    return filteredMovies.slice(
      startIndex,
      startIndex + MOVIES_PER_PAGE
    );
  }, [filteredMovies, startIndex]);

  /* --------------------------------------------------
     3️⃣ FETCH TMDb DATA FOR CURRENT PAGE
  -------------------------------------------------- */
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function loadTMDb() {
      const merged = await Promise.all(
        currentMovies.map(async (movie) => {
          // use cache if available
          if (!tmdbCache.current[movie.imdbId]) {
            tmdbCache.current[movie.imdbId] =
              await fetchTMDbByImdb(movie.imdbId);
          }

          const tmdb = tmdbCache.current[movie.imdbId];

          return {
            imdbId: movie.imdbId,
            category: movie.category,

            // 🔹 ALL DATA FROM TMDb
            title: tmdb?.title || tmdb?.name || "Unknown",

            year: tmdb?.release_date
              ? tmdb.release_date.split("-")[0]
              : tmdb?.first_air_date
              ? tmdb.first_air_date.split("-")[0]
              : "N/A",

            poster: tmdb?.poster_path
              ? IMAGE_BASE + tmdb.poster_path
              : "/no-image.png",

            rating: tmdb?.vote_average
              ? tmdb.vote_average.toFixed(1)
              : "N/A",

            genres: tmdb?.genres
              ? tmdb.genres.map((g) => g.name).slice(0, 2)
              : [],
          };
        })
      );

      if (isMounted) {
        setTmdbMovies(merged);
        setLoading(false);
      }
    }

    loadTMDb();

    return () => {
      isMounted = false;
    };
  }, [currentMovies]);

  /* --------------------------------------------------
     4️⃣ SEARCH ON TMDb TITLES
  -------------------------------------------------- */
  const visibleMovies = useMemo(() => {
    return searchText
      ? tmdbMovies.filter((m) =>
          m.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : tmdbMovies;
  }, [tmdbMovies, searchText]);

  /* --------------------------------------------------
     5️⃣ PAGE CHANGE HANDLER
  -------------------------------------------------- */
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setSearchParams({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* --------------------------------------------------
     6️⃣ UI
  -------------------------------------------------- */
  return (
    <section className="mx-4 md:mx-8 lg:mx-16 my-6">
      <div className="bg-[#141414] rounded-xl border border-[#262626] p-4 md:p-6">

        {/* MOVIE GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {loading ? (
            <LoadingSkeleton count={MOVIES_PER_PAGE} />
          ) : (
            visibleMovies.map((movie) => (
              <Link
                key={movie.imdbId}
                to={`/movie/${movie.imdbId}`}
                className="relative group rounded-xl overflow-hidden bg-[#1f1f1f]"
              >
                {/* POSTER */}
                <img
                  src={movie.poster}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-[260px] object-cover group-hover:scale-105 transition"
                />

                {/* RATING */}
                <span className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                  ⭐ {movie.rating}
                </span>

                {/* YEAR */}
                <span className="absolute bottom-20 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {movie.year}
                </span>

                {/* TITLE + GENRES */}
                <div className="absolute bottom-0 w-full bg-black/80 p-2 text-white space-y-1">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {movie.title}
                  </h3>

                  {movie.genres.length > 0 && (
                    <p className="text-[11px] text-gray-300 line-clamp-1">
                      {movie.genres.join(" • ")}
                    </p>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default MoviesGrid;
