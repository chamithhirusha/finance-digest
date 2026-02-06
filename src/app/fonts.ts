import localFont from "next/font/local";

export const Roboto = localFont({
  src: [
    {
      path: "../../public/fonts/Roboto.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});

export const Albra = localFont({
  src: [
    {
      path: "../../public/fonts/Albra.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-albra",
  display: "swap",
});

export const NotoSerif = localFont({
  src: [
    {
      path: "../../public/fonts/NotoSerif.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-noto-serif",
  display: "swap",
});

export const Helvetica = localFont({
  src: [
    {
      path: "../../public/fonts/HelveticaNowDisplay.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
});
