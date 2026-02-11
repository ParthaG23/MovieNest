import React from "react";
import ContentList from "../ContentList";
import MoviesGrid from "../../Data/MoviesGrid";
const Bollywood = () => {
  return (
    <div>
      <ContentList />
      <MoviesGrid filter="bollywood" />
    </div>
  );
};

export default Bollywood;
