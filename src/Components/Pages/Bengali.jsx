import React from "react";
import ContentList from "../ContentList";
import MoviesGrid from "../../Data/MoviesGrid";

const Bengali = () => {
  return (
    <div>
      <ContentList />
      <MoviesGrid filter="bengali" />
    </div>
  );
};

export default Bengali;
