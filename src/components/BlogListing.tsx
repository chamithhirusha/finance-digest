import { BlogItem } from "./BlogItem";

interface BlogData {
  imageUrl?: string;
  title: string;
  href: string;
}

interface BlogListingProps {
  blogData: BlogData[];
}

export const BlogListing = ({ blogData }: BlogListingProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 md:gap-y-20 gap-y-12 mt-10 md:mt-20">
    {blogData.map((blog, index) =>
      index === 0 ? (
        <div key={`blog-${index}`} className="md:col-span-2">
          <BlogItem
            imageUrl={blog.imageUrl}
            title={blog.title}
            href={blog.href}
            firstPost
          />
        </div>
      ) : (
        <BlogItem
          key={`blog-${index}`}
          imageUrl={blog.imageUrl}
          title={blog.title}
          href={blog.href}
        />
      ),
    )}
  </div>
);
