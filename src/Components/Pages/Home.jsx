import React from "react";
import { useState } from "react";
import ContentList from "../ContentList";
import MoviesGrid from "../../Data/MoviesGrid";
import Navbar from "../Navbar";
import Footer from "../Footer";
const Home = () => {
   const [searchText, setSearchText] = useState("");

  return (
    <div>
      <Navbar onSearch={setSearchText} />
      <ContentList />
      <MoviesGrid searchText={searchText}/>
      <Footer/>
    </div>
  );
};

export default Home;
