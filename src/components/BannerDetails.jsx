import React from "react";

const BannerDetails = ({ reverse, img }) => {
  return (
    <section id="about">
      <main className="bg-gradient-to-r from-green-700 to-green-300  text-white">
        <section className="container flex flex-col items-center justify-center py-10 md:h-[500px] ">
          <div className="grid grid-cols-1 items-center gap-4  md:grid-cols-2">
            <div
              data-aos="fade-right"
              data-aos-duration="400"
              data-aos-once="true"
              className={`flex flex-col items-start gap-4 text-left md:items-start md:p-8 md:text-left ${
                reverse ? "md:order-last" : ""
              } `}
            >
              <h1 className="text-3xl md:text-4xl ">
                 SAVE THE NATURE
              </h1>
              <p className="text-sm text-white font-large">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                ducimus eius quis ad enim aliquid iusto eum nihil exercitationem
                necessitatibus?
              </p>
              <div>
                <ul className="flex list-inside list-disc flex-col gap-2  md:gap-4">
                  <li className=" font-large font-semibold">
                    Lorem ipsum adipisicing elit. Cum, vel.
                  </li>
                  <li className="font-large font-semibold">
                    dlss ipsum adipisicing elit. Cum, vel.
                  </li>
                  <li className="font-large font-semibold">adipisicing elit. Cum, vel.</li>
                </ul>
              </div>
              <div className="space-x-4">
                <button className="rounded-md border-2 border-primary bg-primary px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-primary/80">
                  <a href="#about">Get Started</a>
                </button>
              </div>
            </div>
            <div
              data-aos="fade-left"
              data-aos-duration="400"
              data-aos-once="true"
              className={reverse ? "order-1  p-30 md:p-16" : "p-30 md:p-8" }
            ><div className="p-30 md:p-10">
             <img
            src={img}
             alt="No image"
             className="w-[100%] h-[50%] hover:drop-shadow-md"
            />
           </div>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
};

export default BannerDetails;
