import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 

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
import Signup from "./components/Signup";
import RefrshHandler from "./components/RefrshHandler";
import CarbonFootprintCalculator from "./components/CarbonFootprintCalculator";
import Login from "./components/Login";

function Home() {
  return (
    <>
      <Hero />
      <BannerDetails reverse={true} img={Banner1} />
      <BannerDetails img={Banner2} />
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

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const PrivateRoute = ({ element }) => {
    return localStorage.getItem("token") ? (
      element
    ) : (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-green-500 text-white">
        <h1 className="text-2xl font-bold">Please log in to access this page.</h1>
      </div>
    );
  };

  return (
    <Router>
      <div className="bg-gradient-to-r from-green-200 to-green-500 text-white min-h-screen">
        <div className="fixed left-0 right-0 top-0 z-50 bg-gradient-to-r from-green-200 to-green-500 ">
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        </div>

        <div className="pt-24">
          <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page (always accessible) */}
            <Route path="/signup" element={<Signup />} /> {/* Signup page */}
            <Route path="/login" element={<Login />} /> {/* Login page */}
            <Route path="/service" element={<Services/>} /> {/* Green Token page */}

            {/* Protected Routes */}
            <Route path="/greentoken" element={<PrivateRoute element={<GreenToken/>} />} /> {/* Services page (requires login) */}
            <Route path="/services" element={<PrivateRoute element={<CarbonFootprintCalculator />} />} /> {/* Example protected page */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;