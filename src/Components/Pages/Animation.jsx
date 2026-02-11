import React from "react";
import ContentList from "../ContentList";
import MoviesGrid from "../../Data/MoviesGrid";
const Animation = () => {
  return (
    <div>
      <ContentList />
      <MoviesGrid filter="anime" />
    </div>
  );
};

export default Animation;
