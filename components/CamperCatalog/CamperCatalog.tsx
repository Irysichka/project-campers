"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCampersStore } from "@/lib/store/camperStore";
import Image from "next/image";

export default function CamperCatalog() {
  const campers = useCampersStore((state) => state.campers);
  const total = useCampersStore((state) => state.total);
  const loading = useCampersStore((state) => state.loading);
  const loadingMore = useCampersStore((state) => state.loadingMore);
  const applyFilters = useCampersStore((state) => state.applyFilters);
  const loadMore = useCampersStore((state) => state.loadMore);
  const favorites = useCampersStore((state) => state.favorites);
  const toggleFavorite = useCampersStore((state) => state.toggleFavorite);

  // один раз при монтировании — загрузить список по дефолтным фильтрам
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <section>
      <header>
        <h2>Catalog</h2>
      </header>

      {loading && <p>Loading...</p>}

      <div>
        {campers.map((camper) => {
          const isFavorite = favorites.includes(camper.id);

          return (
            <article key={camper.id}>
              <div>
                <Image
                  src={
                    camper.gallery?.[0]?.thumb ||
                    camper.gallery?.[0]?.original ||
                    "/placeholder.jpg"
                  }
                  alt={camper.name}
                />
              </div>

              <div>
                <header>
                  <div>
                    <h3>{camper.name}</h3>
                    <div>
                      <span>
                        ⭐ {camper.rating?.toFixed(1)} (
                        {camper.reviews?.length ?? 0} Reviews)
                      </span>
                      <span> • {camper.location}</span>
                    </div>
                  </div>

                  <div>
                    <span>€{camper.price.toFixed(2)}</span>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(camper.id)}
                    >
                      {isFavorite ? "♥" : "♡"}
                    </button>
                  </div>
                </header>

                <p>{camper.description}</p>

                <div>
                  {camper.transmission && <span>{camper.transmission}</span>}
                  {camper.engine && <span>{camper.engine}</span>}
                  {camper.AC && <span>AC</span>}
                  {camper.kitchen && <span>Kitchen</span>}
                </div>

                <div>
                  <Link href={`/catalog/${camper.id}`}>
                    <button type="button">Show more</button>
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
          <button type="button" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? "Loading..." : "Load more"}
          </button>
        )}
      </footer>
    </section>
  );
}