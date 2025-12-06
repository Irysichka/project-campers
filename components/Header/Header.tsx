import css from "./Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <header className={css.section}>
      <div className="container">
        <div className={css.header}>
          <Link href="/" className={css.logo} aria-label="TravelTrucks logo">
            <svg width="136" height="15" aria-hidden="true">
              <use href="/sprite.svg#icon-Logo" />
            </svg>
          </Link>
          <ul className={css.navigation}>
            <li className={css.home}>
              <Link href="/" className={css.navigationLink}>
                Home
              </Link>
            </li>

            <li className={css.catalog}>
              <Link href="/catalog" className={css.navigationLink}>
                Catalog
              </Link>
            </li>
          </ul>
          <Link
            href="/favorites"
            aria-label="Favorites"
            className={css.favorites}
          >
            <svg width="30" height="28">
              <use href="/sprite.svg#icon-heart-red" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
