import React from "react";
import main from "../assets/main.jpg"
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signup"); // Navigate to the signup page
  }

  return (
    <main className="bg-gradient-to-r from-green-700 to-green-300 ">
      <section  className="container flex h-[650px] flex-col items-center justify-center md:h-[500px] ">
        <div className="grid grid-cols-1 items-center gap-8 dark:text-white md:grid-cols-2  h-full">
        
          <div
            data-aos="fade-right"
            data-aos-duration="400"
            data-aos-once="true"
            className="flex flex-col text-left p-6 gap-4  text-white md:items-start md:text-left "
          >
            <h1 className=" text-4xl ">
              We ARE TRYING TO SAVE THE NATURE
            </h1>
            <p className="space-x-4">
            "Nature’s beauty is a gift we must cherish,
            Protect it now or watch it perish."
            </p>
            <div className="space-x-4">
              <button className="rounded-md border-2 border-green-800 bg-green-500  px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-green-600   hover:text-black"
              onClick = {handleClick}>
                Get Started
              </button>
             
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-once="true"
            className="mx-auto max-w-50 p-4"
          >
            <div className="p-6 md:p-10">
             <img src={main} alt="No image" className="w-[100%] h-auto md:w-[90%]" />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
