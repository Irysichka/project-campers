"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCampersStore } from "@/lib/store/camperStore";
import Image from "next/image";
import css from "./CamperCatalog.module.css";
import Loading from "@/app/loading";

export default function CamperCatalog() {
  const campers = useCampersStore((state) => state.campers);
  const total = useCampersStore((state) => state.total);
  const loading = useCampersStore((state) => state.loading);
  const loadingMore = useCampersStore((state) => state.loadingMore);
  const applyFilters = useCampersStore((state) => state.applyFilters);
  const loadMore = useCampersStore((state) => state.loadMore);
  const favorites = useCampersStore((state) => state.favorites);
  const toggleFavorite = useCampersStore((state) => state.toggleFavorite);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <section className={css.catalog}>
      {loading && <Loading />}
      <div>
        {campers.map((camper) => {
          const isFavorite = favorites.includes(camper.id);

          return (
            <article key={camper.id} className={css.section}>
              <div className={css.catalogImg}>
                <Image
                  className={css.image}
                  src={
                    camper.gallery?.[0]?.thumb ||
                    camper.gallery?.[0]?.original ||
                    "/placeholder.jpg"
                  }
                  alt={camper.name}
                  width={292}
                  height={320}
                  loading="eager"
                  priority
                />
              </div>

              <div className={css.catalogCart}>
                <div>
                  <div className={css.cartBlock}>
                    <h3 className={css.name}>{camper.name}</h3>
                    <div>
                      <span className={css.price}>
                        €{camper.price.toFixed(2)}
                      </span>
                      <button
                        className={css.buttonHeart}
                        type="button"
                        onClick={() => toggleFavorite(camper.id)}
                        aria-label={
                          isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                      >
                        <svg width="26" height="24" aria-hidden="true">
                          <use
                            href={`/sprite.svg#${
                              isFavorite ? "icon-heart-red" : "icon-heart"
                            }`}
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className={css.review}>
                      <svg width="16" height="16" aria-hidden="true">
                        <use href="/sprite.svg#icon-icon-star-yellow" />
                      </svg>
                      {camper.rating?.toFixed(1)} ({camper.reviews?.length ?? 0}{" "}
                      Reviews)
                    </span>
                    <span className={css.svgLoc}>
                      <svg width="16" height="16" aria-hidden="true">
                        <use href="/sprite.svg#icon-location" />
                      </svg>{" "}
                      {camper.location}
                    </span>
                  </div>
                </div>

                <p className={css.description}>{camper.description}</p>

                <div className={css.spanBlock}>
                  {camper.transmission && (
                    <span className={css.spanName}>
                      <svg
                        className={css.spanSvg}
                        width="20"
                        height="20"
                        aria-hidden="true"
                      >
                        <use href="/sprite.svg#icon-cubs" />
                      </svg>
                      {capitalize(camper.transmission)}
                    </span>
                  )}

                  {camper.engine && (
                    <span className={css.spanName}>
                      <svg
                        className={css.spanSvg}
                        width="20"
                        height="20"
                        aria-hidden="true"
                      >
                        <use href="/sprite.svg#icon-engine" />
                      </svg>
                      {capitalize(camper.engine)}
                    </span>
                  )}

                  {camper.AC && (
                    <span className={css.spanName}>
                      <svg
                        className={css.spanSvg}
                        width="20"
                        height="20"
                        aria-hidden="true"
                      >
                        <use href="/sprite.svg#icon-windy" />
                      </svg>
                      AC
                    </span>
                  )}

                  {camper.bathroom && (
                    <span className={css.spanName}>
                      <svg
                        className={css.spanSvg}
                        width="20"
                        height="20"
                        aria-hidden="true"
                      >
                        <use href="/sprite.svg#icon-bath" />
                      </svg>
                      Bathroom
                    </span>
                  )}

                  {camper.kitchen && (
                    <span className={css.spanName}>
                      <svg
                        className={css.spanSvg}
                        width="20"
                        height="20"
                        aria-hidden="true"
                      >
                        <use href="/sprite.svg#icon-cup-hot" />
                      </svg>
                      Kitchen
                    </span>
                  )}

                  {camper.TV && (
                    <span className={css.spanName}>
                      <svg
                        className={css.spanSvg}
                        width="20"
                        height="20"
                        aria-hidden="true"
                      >
                        <use href="/sprite.svg#icon-laptop" />
                      </svg>
                      TV
                    </span>
                  )}
                </div>
                <div>
                  <Link href={`/catalog/${camper.id}`}>
                    <button className={css.search} type="button">
                      Show more
                    </button>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <footer>
        {!loading && campers.length === 0 && <p>No campers found.</p>}

        {campers.length < total && (
          <button
            className={css.buttonLoad}
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load more"}
          </button>
        )}
      </footer>
    </section>
  );
}
