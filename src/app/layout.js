import "./globals.css";
import { Roboto_Mono } from "next/font/google";
import Header from "@/components/Header/Header"

const robo_mono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "WeatherUp - Real-time weather updates",
  manifest: "/manifest.json"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robo_mono.className} bg-zinc-900`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
