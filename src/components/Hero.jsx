import React from "react";
import Banner from "../assets/undraw_real_time_sync_re_nky7.svg";
import plant from "../assets/plant1.jpg"
const Hero = () => {
  return (
    <main className="bg-gradient-to-r from-green-200 to-green-500 pt-20 dark:bg-green-400">
      <section className="container flex h-[650px] flex-col items-center justify-center md:h-[500px] ">
        <div className="grid grid-cols-1 items-center gap-8 dark:text-white md:grid-cols-2">
          <div
            data-aos="fade-right"
            data-aos-duration="400"
            data-aos-once="true"
            className="flex flex-col items-center gap-4 text-center text-white md:items-start md:text-left "
          >
            <h1 className=" text-4xl ">
              We ARE TRYING TO SAVE THE NATURE
            </h1>
            <p className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              ducimus eius quis ad enim aliquid iusto eum nihil exercitationem
              necessitatibus?
            </p>
            <div className="space-x-4">
              <button className="rounded-md border-2 border-white bg-transparent  px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-white   hover:text-black">
                Get Started
              </button>
             
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="400"
            data-aos-once="true"
            className="mx-auto max-w-xs p-4"
          >
            <img src={plant} alt="No image" className="" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;
