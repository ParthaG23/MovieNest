import React from "react";
import ContentList from "../ContentList";
import MoviesGrid from "../../Data/MoviesGrid";
const Hollywood = () => {
  return (
    <div>
      <ContentList />
      <MoviesGrid filter="hollywood" />
    </div>
  );
};

export default Hollywood;
