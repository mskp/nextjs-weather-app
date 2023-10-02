import styles from "./Header.module.css";

import { Yeon_Sung } from "next/font/google";

const yeonSung = Yeon_Sung({subsets: ["latin"], weight: "400"})

export default function Header() {

    return (
        <header className={`${styles.header} mb-4`} >
            <div style={{ display: "flex" }}>
                <h1 className={`${styles.heading} font-extrabold ${yeonSung.className}`}>
                    WeatherUp
                </h1>
            </div>
        </header>
    )
}