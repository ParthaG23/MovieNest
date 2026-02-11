import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import movies from "./Movies";
import Pagination from "./Pagination";
import {fetchTMDbByImdb} from "./tmds"
import LoadingSkeleton from "../Components/LoadingSkeleton";

const MOVIES_PER_PAGE = 12;
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MoviesGrid = ({ filter,searchText }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [tmdbMovies, setTmdbMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ cache survives re-renders
  const tmdbCache = useRef({});

  // ✅ filter movies (memoized)
  const filteredMovies = useMemo(() => {
  return movies.filter((movie) => {
    const matchCategory = filter ? movie.category === filter : true;
    const matchSearch = searchText
      ? movie.title.toLowerCase().includes(searchText.toLowerCase())
      : true;

    return matchCategory && matchSearch;
  });
}, [filter, searchText]);


  // pagination math
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;

  // ✅ only movies for this page
  const currentMovies = useMemo(() => {
    return filteredMovies.slice(
      startIndex,
      startIndex + MOVIES_PER_PAGE
    );
  }, [filteredMovies, startIndex]);

  // ✅ fetch TMDb only for current page movies
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function loadTMDb() {
      const merged = await Promise.all(
        currentMovies.map(async (movie) => {
          // use cache if exists
          if (!tmdbCache.current[movie.imdbId]) {
            tmdbCache.current[movie.imdbId] =
              await fetchTMDbByImdb(movie.imdbId);
          }

          const tmdb = tmdbCache.current[movie.imdbId];

          return {
            ...movie,
            poster: tmdb?.poster_path
              ? IMAGE_BASE + tmdb.poster_path
              : "/no-image.png",
            rating: tmdb?.vote_average
              ? tmdb.vote_average.toFixed(1)
              : "N/A"
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
      isMounted = false; // prevents memory leak
    };
  }, [currentMovies]);

  // pagination handler
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setSearchParams({ page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="mx-4 md:mx-8 lg:mx-16 my-6">
      <div className="bg-[#141414] rounded-xl border border-[#262626] p-4 md:p-6 rounded-2xl">

       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">

  {loading
    ?( <LoadingSkeleton count={MOVIES_PER_PAGE}/>)
    : tmdbMovies.map((movie) => (
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
          <span className="absolute top-2 right-2   text-xs font-bold px-2 py-1 rounded">
            ⭐ {movie.rating}
          </span>

          {/* YEAR */}
          <span className="absolute bottom-20 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {movie.year}
          </span>

          {/* TEXT */}
          <div className="absolute bottom-0 w-full bg-black/80 p-2 text-white">
            <h3 className="text-sm font-semibold line-clamp-2">
              {movie.title}
            </h3>
          </div>
        </Link>
      ))}
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
