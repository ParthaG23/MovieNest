import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchTMDbDetails,
  fetchCast,
  fetchTrailer,
} from "../../Data/tmds"; // ✅ FIXED PATH
import LoadingSkeleton from "../LoadingSkeleton";
import movies from "../../Data/Movies";
import { MdCloudDownload } from "react-icons/md";

const IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";
const IMG_W500 = "https://image.tmdb.org/t/p/w500";
const IMG_W185 = "https://image.tmdb.org/t/p/w185";

const Content = () => {
  const { imdbId } = useParams();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 🔑 FIND MOVIE META USING IMDB ID
  const movieMeta = movies.find((m) => m.imdbId === imdbId);

  // ⬇️ DOWNLOAD LINKS
  const movieDownloads = movieMeta?.downloads;

  useEffect(() => {
    if (!movieMeta) {
      setError(true);
      setLoading(false);
      return;
    }

    const { tmdbId, type } = movieMeta;

    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);

        // 1️⃣ Movie details
        const movieData = await fetchTMDbDetails(tmdbId, type);
        if (!movieData) throw new Error("Movie not found");

        // 2️⃣ Cast
        const castData = await fetchCast(tmdbId, type);

        // 3️⃣ Trailer
        const trailerData = await fetchTrailer(tmdbId, type);

        if (mounted) {
          setMovie(movieData);
          setCast(castData.slice(0, 12));
          setTrailer(trailerData);
          setLoading(false);
        }
      } catch (err) {
        console.error("Content load error:", err);
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [imdbId, movieMeta]);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Failed to load movie.
      </div>
    );
  }

  if (loading || !movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <LoadingSkeleton />
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `${IMG_ORIGINAL}${movie.backdrop_path}`
    : "/fallback-backdrop.jpg";

  const posterUrl = movie.poster_path
    ? `${IMG_W500}${movie.poster_path}`
    : "/no-image.png";

  return (
    <div className="min-h-screen bg-black text-white">
      {/* BACKDROP */}
      <div className="relative min-h-[85vh]">
        <img
          src={backdropUrl}
          alt={movie.title || movie.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="relative z-10 flex items-end min-h-[85vh] px-6 pb-12 max-w-7xl mx-auto gap-6">
          <img
            src={posterUrl}
            alt={movie.title || movie.name}
            className="w-56 rounded-xl shadow-lg hidden md:block"
          />

          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold">
              {movie.title || movie.name}
            </h1>

            <p className="text-gray-300 mt-2">
              {(movie.release_date || movie.first_air_date)?.slice(0, 4)} • ⭐{" "}
              {movie.vote_average?.toFixed(1)}
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 text-xs bg-white/10 rounded-full"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="mt-4 text-sm text-gray-300 line-clamp-4">
              {movie.overview}
            </p>

            <a
              href={`https://www.imdb.com/title/${imdbId}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 bg-yellow-400 text-black px-4 py-2 rounded font-semibold"
            >
              IMDb
            </a>
          </div>
        </div>
      </div>

      {/* CAST */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold mb-4">Cast</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {cast.map((actor) => (
            <div key={actor.id} className="text-center">
              <img
                src={
                  actor.profile_path
                    ? `${IMG_W185}${actor.profile_path}`
                    : "/no-image.png"
                }
                alt={actor.name}
                className="w-full h-44 object-cover rounded-lg mb-2"
              />
              <p className="text-sm font-medium">{actor.name}</p>
              <p className="text-xs text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TRAILER + DOWNLOAD */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Trailer */}
        <div className="md:col-span-2 bg-[#141414] rounded-xl p-4 border border-white/10">
          <h2 className="text-lg font-semibold mb-3">Trailer</h2>
          {trailer ? (
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              Trailer not available
            </div>
          )}
        </div>

        {/* Download */}
        <div className="bg-[#141414] rounded-xl p-6 border border-white/10 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Available Sources</h2>

          {movieDownloads ? (
            Object.entries(movieDownloads).map(([key, link]) => (
              <a
                key={key}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold mb-3"
              >
                <div className="flex items-center justify-center gap-2">
                  <MdCloudDownload />
                  <span>{key.toUpperCase()}</span>
                </div>
              </a>
            ))
          ) : (
            <p className="text-gray-400 text-sm">
              No download links available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
