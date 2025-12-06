"use client";

import Image from "next/image";
import Link from "next/link";
import { useCampersStore } from "@/lib/store/camperStore";
import css from "./FavoritesList.module.css";

export default function FavoritesList() {
  const campers = useCampersStore((state) => state.campers);
  const favorites = useCampersStore((state) => state.favorites);

  const favoriteCampers = campers.filter((c) => favorites.includes(c.id));

  if (favoriteCampers.length === 0)
    return <p className={css.empty}>No favorites yet 💔</p>;

  return (
    <section className={css.list}>
      {favoriteCampers.map((camper) => (
        <article key={camper.id} className={css.card}>
          <Image
            src={
              camper.gallery?.[0]?.thumb ||
              camper.gallery?.[0]?.original ||
              "/placeholder.jpg"
            }
            alt={camper.name}
            width={260}
            height={200}
            className={css.image}
          />

          <div className={css.info}>
            <h3>{camper.name}</h3>
            <p>€{camper.price.toFixed(2)}</p>
            <Link href={`/catalog/${camper.id}`} className={css.button}>
              View details
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}