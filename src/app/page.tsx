"use client";

import { useEffect, useState } from "react";
import { BlogListing } from "@/components/BlogListing";
import { Header } from "@/components/Header";
import { BitcoinIcon, CircleArrowUpIcon } from "@/components/Icons";

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />

      <main className="mx-8 lg:mx-20 xl:mx-60 mt-2 md:mt-12">
        {/* Desktop title */}
        <div className="hidden md:block" data-testid="desktop-title">
          <h1 className="font-helvetica md:text-6xl xl:text-7xl uppercase">
            Latest news
          </h1>
          <div className="flex items-center gap-6 mt-2">
            <h1 className="font-albra md:text-6xl xl:text-7xl uppercase">
              From
            </h1>
            <hr className="w-20 lg:w-25 2xl:w-40" />
            <div className="flex gap-2">
              <h1 className="font-helvetica md:text-6xl xl:text-7xl uppercase">
                The world
              </h1>
              <BitcoinIcon className="h-10 w-auto" />
            </div>
          </div>
        </div>

        {/* Mobile title */}
        <div className="block md:hidden" data-testid="mobile-title">
          <h1 className="font-noto-serif text-3xl uppercase w-10/12">
            Latest news from the world of{" "}
            <span className="font-roboto">Finance</span>
          </h1>
        </div>

        <BlogListing />
      </main>

      {/* Go to top button */}
      <button
        onClick={scrollToTop}
        aria-label="Go to top"
        className={`group flex justify-center items-center text-sm lg:text-md 
          cursor-pointer gap-0 hover:gap-2 bg-black/10 md:bg-transparent hover:bg-white/10 outline-1 
          outline-white/0 hover:outline-white/20 backdrop-blur-lg px-2 py-2 hover:px-3 hover:py-2 fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 
          rounded-full bg-black text-white transition-all duration-500 ease-out hover:scale-110 
          hover:opacity-90
          ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}`}
      >
        <CircleArrowUpIcon className="h-5 w-5 md:h-6 md:w-6 transform transition-transform duration-1000 ease-in-out rotate-0 group-hover:rotate-[360deg]" />

        {/* Hover text */}
        <span className="overflow-hidden whitespace-nowrap max-w-0 opacity-0 transition-all duration-900 ease-in-out group-hover:max-w-[140px] group-hover:opacity-100">
          Scroll to top
        </span>
      </button>
    </>
  );
}
