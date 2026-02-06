import Image from "next/image";
import { TopRightArrowIcon } from "./Icons";
import { getDateByTimestamp } from "@/utils/date";
import { TBlog } from "@/utils/types";

interface Props {
  data: TBlog;
  firstPost?: boolean;
}

export const BlogItem = ({ data, firstPost }: Props) => {
  const imgHeight = firstPost ? "h-64 md:h-96" : "h-64";
  const titleClass = firstPost ? "md:w-2/3" : "";

  return (
    <article>
      <div
        className={`relative w-full ${imgHeight} overflow-hidden rounded-md ${
          !data.image ? "flex items-center justify-center bg-gray-700" : ""
        }`}
      >
        {data.image && (
          <Image
            src={data.image}
            alt={data.headline}
            fill
            priority={firstPost}
            sizes={
              firstPost
                ? "(min-width: 768px) 66vw, 100vw"
                : "(min-width: 768px) 33vw, 100vw"
            }
            className="object-cover"
          />
        )}
      </div>

      <div className="flex mt-4 font-helvetica text-sm opacity-30 gap-2">
        <span>{data.source}</span>
        <span>•</span>
        <span>{getDateByTimestamp(data.datetime)}</span>
      </div>

      <h2 className={`text-xl mt-4 leading-tight ${titleClass}`}>
        {data.headline}
      </h2>

      <a
        href={data.url}
        className="flex items-center mt-4 group"
        aria-label={`Read article: ${data.headline}`}
      >
        <span className="text-sm underline underline-offset-10 leading-relaxed transition-colors group-hover:text-blue-400">
          Read Article
        </span>
        <TopRightArrowIcon className="h-5 w-5 ml-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-10" />
      </a>
    </article>
  );
};
