import { TNewsArticle } from "@/utils/types";
import { BlogItem } from "./BlogItem";

interface BlogListingProps {
  blogData: TNewsArticle[];
}

export const BlogListing = ({ blogData }: BlogListingProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-y-20 gap-y-12 mt-10 md:mt-20">
    {blogData.map((blog, index) =>
      index === 0 ? (
        <div key={`blog-${index}`} className="md:col-span-2">
          <BlogItem
            imageUrl={blog.image}
            title={blog.headline}
            href={blog.url}
            firstPost
          />
        </div>
      ) : (
        <BlogItem
          key={`blog-${index}`}
          imageUrl={blog.image}
          title={blog.headline}
          href={blog.url}
        />
      ),
    )}
  </div>
);
