import { getNews } from "@/utils/api";
import { TBlog } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import { BlogItem } from "./BlogItem";
import { Alert } from "./Alert";
import { LoadingIcon, SortIcon } from "./Icons";

const ITEMS_PER_LOAD = 8;

export const BlogListing = () => {
  const [blogData, setBlogData] = useState<TBlog[]>([]);
  const [visibleBlogs, setVisibleBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [generalError, setGeneralError] = useState<string>();
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await getNews();
      setBlogData(response);
      setVisibleBlogs(response.slice(0, ITEMS_PER_LOAD));
      setGeneralError("");
    } catch (error: any) {
      setGeneralError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading]);

  // Update visible blogs when page or sort order changes
  useEffect(() => {
    const sortedData = [...blogData].sort((a, b) => {
      // If datetime is already a number (timestamp in ms), no need to convert
      return sortOrder === "latest"
        ? (b.datetime as number) - (a.datetime as number)
        : (a.datetime as number) - (b.datetime as number);
    });

    setVisibleBlogs(sortedData.slice(0, page * ITEMS_PER_LOAD));
  }, [sortOrder, blogData, page]);

  // Initial fetch
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Sort button */}
      {visibleBlogs.length > 0 && (
        <div className="flex justify-end gap-5">
          <button
            aria-label="Toggle sort order"
            onClick={() =>
              setSortOrder((prev) => (prev === "latest" ? "oldest" : "latest"))
            }
            className={`group flex justify-center items-center text-sm lg:text-md 
                  cursor-pointer gap-0 hover:gap-2 bg-black/10 md:bg-transparent hover:bg-white/10 outline-1 
                  outline-white/0 hover:outline-white/20 backdrop-blur-lg px-2 py-2 hover:px-3 hover:py-2 z-50 
                  rounded-full bg-black text-white transition-all duration-500 ease-out hover:scale-110 
                  hover:opacity-90`}
          >
            <SortIcon className="h-5 w-5 md:h-6 md:w-6 transform transition-transform duration-1000 ease-in-out scale-x-100 group-hover:scale-x-[-1]" />
            <span className="overflow-hidden whitespace-nowrap max-w-0 opacity-0 transition-all duration-900 ease-in-out group-hover:max-w-[140px] group-hover:opacity-100">
              {sortOrder === "latest" ? "Latest to older" : "Older to latest"}
            </span>
          </button>
        </div>
      )}

      <div className="flex flex-col">
        {/* Error alert */}
        {generalError && (
          <Alert label={generalError} onClose={() => setGeneralError("")} />
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex gap-5 mt-10">
            <p className="text-white/50">Loading blogs</p>
            <LoadingIcon />
          </div>
        )}

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-y-20 gap-y-12 mt-10 md:mt-20">
          {visibleBlogs.map((blog, index) =>
            index === 0 ? (
              <div key={`blog-${blog.id || index}`} className="md:col-span-2">
                <BlogItem data={blog} firstPost />
              </div>
            ) : (
              <BlogItem key={`blog-${blog.id || index}`} data={blog} />
            ),
          )}
        </div>

        {/* Infinite scroll loader */}
        {page * ITEMS_PER_LOAD < blogData.length && (
          <div
            ref={loaderRef}
            className="flex gap-5 h-10 mt-10 flex justify-center items-center"
          >
            <LoadingIcon />
          </div>
        )}
      </div>
    </div>
  );
};
