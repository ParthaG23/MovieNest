import React from "react";
import ContentList from "../ContentList";
import MoviesGrid from "../../Data/MoviesGrid";
const DualAudio = () => {
  return (
    <div>
      <ContentList />
      <MoviesGrid filter="southdub" />
    </div>
  );
};

export default DualAudio;
