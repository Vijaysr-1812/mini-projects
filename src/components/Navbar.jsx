import React, { useEffect, useState } from "react";
import { BiSolidSun, BiPhoneCall, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { FaCaretDown } from "react-icons/fa";
import ResponsiveMenu from "./ResponsiveMenu";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light",
  );
  const [showMenu, setShowMenu] = useState(false);

  const element = document.documentElement;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("dark theme");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("light theme");
    }
  }, [theme]);

  return (
    <>
      <header
        data-aos="fade"
        data-aos-duration="300"
        className="relative z-[99] border-g-[1px]  border-primary/50 bg-gradient-to-l from-green-200 via-green-300 to-green-500 text-white shadow-lg"
      >
        <nav className="container  flex h-[70px] items-center justify-between py-2 ">
          <div className="text-2xl text-white md:text-3xl ">
            <a href="/#home" className="">
              NAT
              <span className="inline-block font-bold text-primary">URE</span>
            </a>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-10">
              <li className="group relative cursor-pointer">
                <a
                  href="/#home"
                  className="flex h-[72px] items-center gap-[2px]"
                >
                  Home{" "}
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </a>
                <div className="absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-green-200 p-2 text-black group-hover:block  ">
                  <ul className="space-y-3">
                    <li className="p-2 hover:bg-violet-200">Services</li>
                    <li className="p-2 hover:bg-violet-200">About us</li>
                    <li className="p-2 hover:bg-violet-200">Privacy policy</li>
                  </ul>
                </div>
              </li>
              <li className="cursor pointer group">
              <a href="/#home" className="flex h-[72px] items-center gap-[2px]">
                Services
                <span>
                  <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                </span>
              </a>
              <div className="absolute left-0 z-[9999] hidden w-full rounded-b-3xl bg-green-200 p-4 text-black group-hover:block">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <h1 className="pb-3 text-xl font-semibold">Best Selling</h1>
                    <p className="text-sm text-slate-600">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur exercitationem delectus iusto animi aperiam deleniti reprehenderit doloribus, numquam corporis quae.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <ul className="flex flex-col gap-2">
                      <h1 className="pb-1 text-xl font-semibold">check your score</h1>
                      <li className="cursor-pointer text-black/80 hover:text-white">Carbon score</li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
              <li className="cursor pointer">
                <a href="#swipe">About us</a>
              </li>
              {/* Phone number section */}
              <div className="flex items-center gap-4">
                <li>
                  <BiPhoneCall className="h-[40px] w-[40px] rounded-md bg-primary p-2 text-2xl text-white hover:bg-primary/90" />
                </li>
                <li>
                  <div>
                    <p className="text-sm">Call us on</p>
                    <p className="text-lg">
                      {" "}
                      <a href="tel:+91123456789">+91 123456789</a>
                    </p>
                  </div>
                </li>
              </div>
              {/* Light and dark mode switcher */}
              {theme === "dark" ? (
                <BiSolidSun
                  onClick={() => setTheme("light")}
                  className="text-2xl"
                />
              ) : (
                <BiSolidMoon
                  onClick={() => setTheme("dark")}
                  className="text-2xl"
                />
              )}
            </ul>
          </div>

          {/* Mobile view  */}
          <div className="flex items-center gap-4 md:hidden ">
            {theme === "dark" ? (
              <BiSolidSun
                onClick={() => setTheme("light")}
                className="text-2xl"
              />
            ) : (
              <BiSolidMoon
                onClick={() => setTheme("dark")}
                className="text-2xl"
              />
            )}
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className=" cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </nav>
      </header>
      <ResponsiveMenu showMenu={showMenu} />
    </>
  );
};

export default Navbar;
