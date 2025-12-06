"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchCamperById } from "@/lib/api/clientApi";
import type { Camper } from "@/types/camper";
import Image from "next/image";
import css from "./CamperDetails.module.css";
import Loading from "@/app/loading";

export default function CamperDetails() {
  const params = useParams<{ id: string }>();
  const camperId = params?.id;

  const [camper, setCamper] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!camperId) return;

    async function load() {
      try {
        const data = await fetchCamperById(camperId);
        setCamper(data);
      } catch (error) {
        console.error("Failed to load camper:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [camperId]);

  if (loading) return <Loading />;
  if (!camper) return <div>Camper not found</div>;

  const reviewsCount = camper.reviews?.length ?? 0;

  return (
    <div className={css.section}>
      {/* Название */}
      <h1 className={css.name}>{camper.name}</h1>

      {/* Рейтинг */}
      <div className={css.block}>
      <div className={css.ratingBlock}>
        <span className={css.rating}>
          <svg width="16" height="16" aria-hidden="true">
            <use href="/sprite.svg#icon-icon-star-yellow" />
          </svg>
          {camper.rating}
        </span>
        {reviewsCount > 0 && (
          <span className={css.reviews}> ({reviewsCount} reviews)</span>
        )}
      </div>

      {/* Локация */}
      <div className={css.locationBlock}>
        <svg width="16" height="16" aria-hidden="true">
          <use href="/sprite.svg#icon-location" />
        </svg>
        <p className={css.location}>{camper.location}</p>
      </div>
</div>
      {/* Цена */}
      <p className={css.price}>€{camper.price.toFixed(2)}</p>

      {/* Галерея */}
      {camper.gallery && camper.gallery.length > 0 && (
        <div className={css.image}>
          {camper.gallery.slice(0, 4).map((img, index) => (
            <Image
              className={css.oneImage}
              key={index}
              src={img.original}
              alt={`Image ${index}`}
              width={292}
              height={312}
              loading="eager"
  priority
            />
          ))}
        </div>
      )}

      {/* Описание */}
      <p className={css.desc}>{camper.description}</p>
    </div>
  );
}
