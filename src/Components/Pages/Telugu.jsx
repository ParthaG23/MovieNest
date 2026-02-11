import React from "react";
import ContentList from "../ContentList";
import MoviesGrid from "../../Data/MoviesGrid";
const Telugu = () => {
  return (
    <div>
      <ContentList />
      <MoviesGrid filter="telugu" />
    </div>
  );
};

export default Telugu;
