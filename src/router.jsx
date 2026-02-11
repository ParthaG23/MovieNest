import { createBrowserRouter } from "react-router-dom";

/* Pages */
import Home from "./Components/Pages/Home.jsx";
import Bengali from "./Components/Pages/Bengali.jsx";
import Bollywood from "./Components/Pages/Bollywood.jsx";
import Hollywood from "./Components/Pages/Hollywood.jsx";
import Animation from "./Components/Pages/Animation.jsx";
import Telugu from "./Components/Pages/Telugu.jsx";
import DualAudio from "./Components/Pages/SouthDubbed.jsx";

import  Content from "./Components/Pages/Content.jsx";
import NotFound from "./Components/Pages/NotFound.jsx";
/* Layout */
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";


/* Layout Wrapper */
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);


export const router = createBrowserRouter([
  
    {
    path: "/",
    element: (
        <Home />
    ),
  },
  {
    path: "/bengali",
    element: (
      <Layout>
        <Bengali />
      </Layout>
    ),
  },
  {
    path: "/bollywood",
    element: (
      <Layout>
        <Bollywood />
      </Layout>
    ),
  },
  {
    path: "/hollywood",
    element: (
      <Layout>
        <Hollywood />
      </Layout>
    ),
  },
  {
    path: "/animation",
    element: (
      <Layout>
        <Animation/>
      </Layout>
    ),
  },
  {
    path: "/telugu",
    element: (
      <Layout>
        <Telugu />
      </Layout>
    ),
  },
  {
    path: "/dual-audio",
    element: (
      <Layout>
        <DualAudio />
      </Layout>
    ),
  },
  
  {
    path:"/movie/:imdbId",
     element: (
      <Layout>
        <Content/>
      </Layout>
    ),

  },

  {
    path: "*",
    element: <NotFound />,
  },

]);
