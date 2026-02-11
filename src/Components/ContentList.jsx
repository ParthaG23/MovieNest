// src/components/ContentList.jsx
import { Link } from "react-router-dom";

const mainButtons = [
  {
    title: "Bollywood Movies",
    path: "/bollywood",
    bg: "bg-green-500",
  },
  {
    title: "SouthDub",
    path: "/dual-audio",
    bg: "bg-red-500",
  },
  {
    title: "Hollywood Movies",
    path: "/hollywood",
    bg: "bg-yellow-500",
  },
  {
    title: "Animation",
    path: "/animation",
    bg: "bg-sky-500",
  },
];

const categories = [
  "Dual Audio (Hindi) 720P",
  "Hollywood Movies 1080P",
  "Telugu",
  "Action",
  "Adventure",
  "Animation",
  "Cartoon",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Mystery",
  "Romance",
  "Thriller",
  "War",
  "Web Series",
  "Tamil",
  
  "Punjabi Movies 720P",
];

const ContentList = () => {
  return (
    <section className=" p-4 md:p-6">
      
      {/* ===== TOP CONTENT BUTTONS ===== */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {mainButtons.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`${item.bg} text-white px-6 py-3 rounded-xl font-semibold text-sm md:text-base
              hover:opacity-90 transition`}
          >
            {item.title}
          </Link>
        ))}
      </div>

      {/* ===== CATEGORY LIST ===== */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((item, index) => (
          <Link
            key={index}
            to={`/category/${item.toLowerCase().replace(/\s+/g, "-")}`}
            className="bg-[#141414] rounded-xl border-[#262626]text-white px-4 py-2 rounded-md text-xs md:text-sm
              hover:bg-gray-600 transition"
          >
            {item}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ContentList;
