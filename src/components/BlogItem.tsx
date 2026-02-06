import { TopRightArrowIcon } from "./Icons";

interface BlogItemProps {
  imageUrl?: string;
  title: string;
  href: string;
  firstPost?: boolean;
}

const imageHeight = (firstPost?: boolean) => {
  if (firstPost) return "h-64 md:h-96";
  return "h-64";
};

const titleWidth = (firstPost?: boolean) => {
  if (firstPost) return "md:tw-2/3";
  return "";
};

export const BlogItem = ({
  imageUrl,
  title,
  href,
  firstPost,
}: BlogItemProps) => (
  <article>
    {imageUrl ? (
      <img
        src={imageUrl}
        alt={title}
        className={`${imageHeight(firstPost)} w-full object-cover rounded-md`}
      />
    ) : (
      <div
        className={`${imageHeight(firstPost)} flex items-center justify-center w-full bg-gray-700 rounded-md`}
      />
    )}
    <h2 className={`text-xl mt-4 leading-tight ${titleWidth(firstPost)}`}>
      {title}
    </h2>
    <a
      href={href}
      className="flex items-center mt-4 group"
      aria-label={`Read article: ${title}`}
    >
      <span className="text-sm underline underline-offset-10 leading-relaxed transition-colors group-hover:text-blue-400">
        Read Article
      </span>
      <TopRightArrowIcon className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1 group-hover:rotate-10 group-hover:-translate-y-1 duration-300" />
    </a>
  </article>
);
