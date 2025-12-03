import Link from "next/link";
import css from "./page.module.css";

export default function Home() {
  return (
    <div className={css.home}>
      <div className="container">
        <div className={css.hero}>
        <h1 className={css.title}>Campers of your dreams</h1>
        <p className={css.text}>
          You can find everything you want in our catalog
        </p>
        <Link href="/catalog" className={css.button}>
          View Now
        </Link>
      </div>
      </div>
    </div>
  );
}
