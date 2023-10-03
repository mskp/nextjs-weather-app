import styles from "./Header.module.css";

import { Black_Ops_One } from "next/font/google";

const blackOpsOne = Black_Ops_One({subsets: ["latin"], weight: "400"})

export default function Header() {

    return (
        <header className={`${styles.header} mb-4`} >
            <div style={{ display: "flex" }}>
                <h1 className={`${styles.heading} font-extrabold ${blackOpsOne.className}`}>
                    WeatherUp
                </h1>
            </div>
        </header>
    )
}