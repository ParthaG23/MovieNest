import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchTMDbByImdb,
  fetchMovieCast,
  fetchMovieTrailer,
} from "../../Data/tmds";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [trailer, setTrailer] = useState(null);

  const movieDownloads = movies.find((m) => m.imdbId === imdbId)?.downloads;

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setLoading(true);

        // 🔹 1. Get movie
        const movieData = await fetchTMDbByImdb(imdbId);
        if (!movieData) throw new Error("Movie not found");

        // 🔹 2. Get cast using TMDb ID
        const castData = await fetchMovieCast(movieData.id);
        // 3 .get trailerData
        const trailerData = await fetchMovieTrailer(movieData.id);
        setTrailer(trailerData);
        console.log(trailerData);

        if (mounted) {
          setMovie(movieData);
          setCast(castData.slice(0, 12)); // limit cast
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
  }, [imdbId]);

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
      {/* 🔥 BACKDROP */}
      <div className="relative min-h-[85vh]">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="relative z-10 flex items-end min-h-[85vh] px-6 pb-12 max-w-7xl mx-auto gap-6">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-56 rounded-xl shadow-lg hidden md:block"
          />

          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>

            <p className="text-gray-300 mt-2">
              {movie.release_date?.slice(0, 4)} • ⭐{" "}
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

            <div className="flex gap-4 mt-6">
              <a
                href={`https://www.imdb.com/title/${imdbId}`}
                target="_blank"
                rel="noreferrer"
                className="bg-red text-black px-4 py-2 rounded font-semibold"
              >
                IMDb
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 🎭 CAST SECTION */}
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
      {/* 🎬 TRAILER + DOWNLOAD SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 🎥 LEFT — TRAILER */}
        <div className="md:col-span-2 bg-[#141414] rounded-xl p-4 border border-white/10">
          <h2 className="text-lg font-semibold mb-3">Trailer</h2>

          {trailer ? (
            <div className="aspect-video rounded-lg overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Movie Trailer"
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

        {/* ⬇️ RIGHT — DOWNLOAD */}
        {/* ⬇️ DOWNLOAD SECTION */}
<div className="bg-[#141414] rounded-xl p-6 border border-white/10 flex flex-col items-center text-center">
  <h2 className="text-lg font-semibold mb-4">Available Sources</h2>

  {movieDownloads ? (
    <div className="w-full flex flex-col gap-3 items-center">

      {/* 480p */}
      {movieDownloads["480p"] && (
        <a
          href={movieDownloads["480p"]}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-xs bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
        >
          <div className="flex items-center justify-center gap-2">
            <MdCloudDownload className="text-lg" />
            <span>Open Source (480p)</span>
          </div>
        </a>
      )}

      {/* 720p */}
      {movieDownloads["720p"] && (
        <a
          href={movieDownloads["720p"]}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-xs bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
        >
          <div className="flex items-center justify-center gap-2">
            <MdCloudDownload className="text-lg" />
            <span>Open Source (720p)</span>
          </div>
        </a>
      )}

      {/* 1080p */}
      {movieDownloads["1080p"] && (
        <a
          href={movieDownloads["1080p"]}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-xs bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold transition"
        >
          <div className="flex items-center justify-center gap-2">
            <MdCloudDownload className="text-lg" />
            <span>Open Source (1080p)</span>
          </div>
        </a>
      )}

      {/* ZIP */}
      {movieDownloads["zip"] && (
        <a
          href={movieDownloads["zip"]}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-xs bg-gray-700 hover:bg-gray-600 text-white py-2 rounded font-semibold transition"
        >
          <div className="flex items-center justify-center gap-2">
            <MdCloudDownload className="text-lg" />
            <span>Open Source(ZIP)</span>
          </div>
        </a>
      )}

    </div>
  ) : (
    <p className="text-gray-400 text-sm">No download links available</p>
  )}
</div>

      </div>
    </div>
  );
};

export default Content;
