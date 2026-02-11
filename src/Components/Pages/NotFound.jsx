import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center px-6">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left: Big 404 */}
        <div className="relative select-none">
          <h1
            className="
              text-[180px] md:text-[240px] lg:text-[300px]
              font-extrabold
              text-transparent
              bg-clip-text
              bg-gradient-to-r from-cyan-400 to-blue-600
              drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]
            "
          >
            404
          </h1>

          {/* Outline effect */}
          <h1
            className="
              absolute top-0 left-0
              text-[180px] md:text-[240px] lg:text-[300px]
              font-extrabold
              text-transparent
              stroke-text
              opacity-30
            "
          >
            404
          </h1>
        </div>

        {/* Right: Text Content */}
        <div className="mt-10 lg:mt-0 text-center lg:text-left max-w-md">
          <h2 className="text-5xl font-bold tracking-widest text-blue-500">
            ERROR
          </h2>

          <p className="mt-3 text-xl text-cyan-400 tracking-wide">
            Page Not Found
          </p>

          <Link
            to="/"
            className="
              inline-block mt-8
              px-10 py-3
              rounded-full
              border border-cyan-400
              text-cyan-400
              hover:bg-cyan-400 hover:text-black
              transition duration-300
              tracking-widest
            "
          >
            BACK TO HOME
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
