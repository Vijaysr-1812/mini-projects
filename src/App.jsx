import AOS from "aos";
import "aos/dist/aos.css";

import Banner from "./components/Banner";
import Blogs from "./components/Blog";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/navbar";
import { useEffect } from "react";
import Service from "./components/Service";
import BannerDetails from "./components/BannerDetails";
import Banner1 from "./assets/blog1.jpg";
import Banner2 from "./assets/blog3.jpg";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <div className="bg-green-200 text-white">
        <div className="fixed left-0 right-0 top-0 z-50 bg-gradient-to-l from-violet-900 via-violet-800 to-violet-900 ">
          <Navbar />
        </div>
        <Hero />
        <Service />
        <BannerDetails reverse={true} img={Banner1} />
        <BannerDetails img={Banner2} />
        <Banner />
        <Blogs />
        <Footer />
      </div>
    </>
  );
}

export default App;
