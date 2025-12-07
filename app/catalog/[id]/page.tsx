"use client";

import { useState } from "react";

import CamperDetails from "@/components/CamperDetails/CamperDetails";
import Reviews from "@/components/Reviews/Reviews";
import BookingForm from "@/components/BookingForm/BookingForm";
import css from "./Details.module.css";
import Features from "@/components/Features/Features";

type ActiveTab = "features" | "reviews";

export default function PageCamper() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("features");

  return (
    <div className="container">
      <CamperDetails />
      <div className={css.tabs}>
        <button
          className={`${css.tab} ${activeTab === "features" ? css.active : ""}`}
          type="button"
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>

        <button
          className={`${css.tab} ${activeTab === "reviews" ? css.active : ""}`}
          type="button"
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <div className={css.leftBlock}>
        <div>{activeTab === "features" ? <Features /> : <Reviews />}</div>

        <div>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
