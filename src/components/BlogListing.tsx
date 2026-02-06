import { getNews } from "@/utils/api";
import { TBlog } from "@/utils/types";
import { useEffect, useState } from "react";
import { BlogItem } from "./BlogItem";
import { Alert } from "./Alert";

export const BlogListing = () => {
  const [blogData, setBlogData] = useState<TBlog[]>([]);
  const [generalError, setGeneralError] = useState<String>();

  const fetchNews = async () => {
    try {
      const response = await getNews();
      setBlogData(response);
      setGeneralError("");
    } catch (error: any) {
      setGeneralError(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="flex flex-col">
      {generalError && (
        <Alert label={generalError} onClose={() => setGeneralError("")} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-y-20 gap-y-12 mt-10 md:mt-20">
        {blogData.map((blog, index) =>
          index === 0 ? (
            <div key={`blog-${blog.id || index}`} className="md:col-span-2">
              <BlogItem data={blog} firstPost />
            </div>
          ) : (
            <BlogItem key={`blog-${blog.id || index}`} data={blog} />
          ),
        )}
      </div>
    </div>
  );
};
