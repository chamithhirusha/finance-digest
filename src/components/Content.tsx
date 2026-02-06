import { BlogListing } from "./BlogListing";
import { BitcoinIcon } from "./Icons";

const BLOG_ARTICLES = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1761839262867-af53d08b0eb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    title:
      "Here's what we'd like to see from our 8 stocks reporting earnings this week",
    href: "/blog/earnings-week",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1761839262867-af53d08b0eb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    title: "Bitcoin's price action is showing signs of a potential breakout",
    href: "/blog/bitcoin-breakout",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1761839262867-af53d08b0eb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    title: "Tech stocks rally as investors reassess growth prospects",
    href: "/blog/tech-rally",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1761839262867-af53d08b0eb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    title: "Federal Reserve hints at potential rate cuts in coming quarter",
    href: "/blog/fed-rates",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1761839262867-af53d08b0eb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    title: "Gold prices hit 6-month high amid economic uncertainty",
    href: "/blog/gold-prices",
  },
];

export const Content = () => {
  return (
    <main className="mx-8 lg:mx-20 xl:mx-60 mt-2 md:mt-12">
      {/* Desktop title */}
      <div className="hidden md:block">
        <h1 className="font-helvetica md:text-6xl xl:text-7xl uppercase">
          Latest news
        </h1>
        <div className="flex items-center gap-6">
          <h1 className="font-albra md:text-6xl xl:text-7xl uppercase">From</h1>
          <hr className="w-20 lg:w-25 2xl:w-40" />
          <div className="flex items-center gap-2">
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
      <BlogListing blogData={BLOG_ARTICLES} />
    </main>
  );
};
