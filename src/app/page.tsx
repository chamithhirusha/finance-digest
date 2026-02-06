"use client";

import { BlogListing } from "@/components/BlogListing";
import { Header } from "@/components/Header";
import { BitcoinIcon } from "@/components/Icons";

export default function Home() {
  return (
    <>
      {/* Header */}
      <Header />

      <main className="mx-8 lg:mx-20 xl:mx-60 mt-2 md:mt-12">
        {/* Desktop title */}
        <div className="hidden md:block">
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
        <div className="block md:hidden">
          <h1 className="font-noto-serif text-3xl uppercase w-10/12">
            Latest news from the world of{" "}
            <span className="font-roboto">Finance</span>
          </h1>
        </div>

        {/* Blog listing */}
        <BlogListing />
      </main>
    </>
  );
}
