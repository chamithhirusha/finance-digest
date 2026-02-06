import { getNews } from "@/utils/api";
import { TBlog } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import { BlogItem } from "./BlogItem";
import { Alert } from "./Alert";

const ITEMS_PER_LOAD = 8;

export const BlogListing = () => {
  const [blogData, setBlogData] = useState<TBlog[]>([]);
  const [visibleBlogs, setVisibleBlogs] = useState<TBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [generalError, setGeneralError] = useState<string>();

  const loaderRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (page > 1) {
      const nextItems = blogData.slice(0, page * ITEMS_PER_LOAD);
      setVisibleBlogs(nextItems);
    }
  }, [page, blogData]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex flex-col">
      {generalError && (
        <Alert label={generalError} onClose={() => setGeneralError("")} />
      )}

      {loading && <p className="mt-10 text-white/30">Loading blogs...</p>}

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

      {page * ITEMS_PER_LOAD < blogData.length && (
        <div
          ref={loaderRef}
          className="h-10 mt-10 flex justify-center items-center"
        >
          <p className="text-white/30">Loading more...</p>
        </div>
      )}
    </div>
  );
};
