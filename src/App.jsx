import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Added

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import Blogs from "./components/Blog";
import Footer from "./components/Footer";
import BannerDetails from "./components/BannerDetails";
import Service from "./components/Service";
import Banner1 from "./assets/image3.jpg";
import Banner2 from "./assets/image4.jpg";
import Services from "./components/Services";
import GreenToken from "./components/GreenToken";

import CarbonFootprintCalculator from "./AI_Integration/pages";

function Home() {
  return (
    <>
      <Hero />
      <BannerDetails reverse={true} img={Banner1} />
      <BannerDetails img={Banner2} />
      <Banner />
      <Blogs />
      <Footer />
    </>
  );
}

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
    <Router>
      <div className="bg-gradient-to-r from-green-200 to-green-500 text-white min-h-screen">
        <div className="fixed left-0 right-0 top-0 z-50 bg-gradient-to-r from-green-200 to-green-500 ">
          <Navbar />
        </div>

        <div className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page */}
            <Route path="/services" element={<CarbonFootprintCalculator />} />
            <Route path="/service" element={<Services />} /> {/* Service page */}
            <Route path="/greentoken" element={<GreenToken />}/> {/* Green Token page */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
