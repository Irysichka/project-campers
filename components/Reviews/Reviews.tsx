"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { fetchCamperById } from "@/lib/api/clientApi";
import type { Camper, Review } from "@/types/camper";

import css from "./Reviews.module.css";

export default function Reviews() {
  const params = useParams<{ id: string }>();
  const camperId = params?.id;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!camperId) return;

    async function load() {
      try {
        const data: Camper = await fetchCamperById(camperId);
        setReviews(data.reviews ?? []);
      } catch (err) {
        console.error("Failed to load reviews:", err);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [camperId]);

  if (loading) {
    return <p className={css.loading}>Loading reviews...</p>;
  }

  if (error) {
    return <p className={css.error}>{error}</p>;
  }

  if (!reviews.length) {
    return <p className={css.noReviews}>There are no reviews yet.</p>;
  }

  return (
    <div className={css.box}>
      <ul className={css.reviewsList}>
        {reviews.map((rev, idx) => (
          <li key={idx} className={css.reviewItem}>
            <div className={css.reviewHeader}>
              <div className={css.avatar}>
                {(rev.reviewer_name || "?")[0]?.toUpperCase()}
              </div>

              <div>
                <p className={css.reviewerName}>{rev.reviewer_name}</p>

                <div className={css.starRow}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`${css.starIcon} ${
                        i < rev.reviewer_rating ? css.starActive : ""
                      }`}
                      width={16}
                      height={16}
                      aria-hidden="true"
                    >
                      <use href="/sprite.svg#icon-star" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            {/* Review text */}
            {rev.comment && (
              <p className={css.reviewText}>{rev.comment}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}