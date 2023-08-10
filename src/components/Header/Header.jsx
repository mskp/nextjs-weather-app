import styles from "./Header.module.css";

export default function Header() {

    return (
        <header className={`${styles.header} mb-4`} >
            <div style={{ display: "flex" }}>
                <img className={styles.icon} src="/favicon.ico" alt="" draggable={false} />
                <h1 className={styles.heading}>
                    <span className="text-yellow-700">Weather</span>
                    <span className="text-green-500">Up</span>
                </h1>
            </div>
        </header>
    )
}