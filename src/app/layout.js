import "./globals.css";
import { Roboto_Mono } from "next/font/google";

const robo_mono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "WeatherUp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={robo_mono.className}>{children}</body>
    </html>
  );
}
