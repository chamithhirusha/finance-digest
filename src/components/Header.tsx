import { BLOTTIcon } from "./Icons";

export const Header = () => {
  return (
    <header className="flex justify-center py-12">
      <a
        href="https://blott.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Go to Blott homepage"
        className="text-white hover:text-lime-500 transition-colors duration-500"
      >
        <BLOTTIcon className="h-12 w-auto" />
      </a>
    </header>
  );
};
