"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchCamperById } from "@/lib/api/clientApi";
import type { Camper } from "@/types/camper";
import css from "./Features.module.css";

type BoolKey =
  | "AC"
  | "bathroom"
  | "kitchen"
  | "TV"
  | "radio"
  | "refrigerator"
  | "microwave"
  | "gas"
  | "water";

type BoolFeatureConfig = {
  key: BoolKey;
  label: string;
  iconHref: string;
};

type FeatureChip = {
  label: string;
  iconHref: string;
};

export default function Features() {
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
        console.error("Failed to load camper in Features:", error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [camperId]);

  if (loading) return <div>Loading...</div>;
  if (!camper) return <div>Camper not found</div>;

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const prettyEngine = (e?: string) => (e ? capitalize(e) : "");

  const prettyForm = (form: Camper["form"]) => {
    switch (form) {
      case "panelTruck":
        return "Panel truck";
      case "fullyIntegrated":
        return "Fully integrated";
      case "alcove":
        return "Alcove";
      default:
        return form;
    }
  };

  const chips: FeatureChip[] = [];

  if (camper.transmission?.toLowerCase() === "automatic") {
    chips.push({
      label: "Automatic",
      iconHref: "/sprite.svg#icon-cubs",
    });
  }

  if (camper.engine) {
    chips.push({
      label: prettyEngine(camper.engine),
      iconHref: "/sprite.svg#icon-engine",
    });
  }

  const boolConfigs: BoolFeatureConfig[] = [
    { key: "AC", label: "AC", iconHref: "/sprite.svg#icon-windy" },
    { key: "bathroom", label: "Bathroom", iconHref: "/sprite.svg#icon-bath" },
    { key: "kitchen", label: "Kitchen", iconHref: "/sprite.svg#icon-cup-hot" },
    { key: "TV", label: "TV", iconHref: "/sprite.svg#icon-laptop" },
    { key: "radio", label: "Radio", iconHref: "/sprite.svg#icon-radio" },
    {
      key: "refrigerator",
      label: "Refrigerator",
      iconHref: "/sprite.svg#icon-freeze",
    },
    {
      key: "microwave",
      label: "Microwave",
      iconHref: "/sprite.svg#icon-Group",
    },
    { key: "gas", label: "Gas", iconHref: "/sprite.svg#icon-stove" },
    {
      key: "water",
      label: "Water",
      iconHref: "/sprite.svg#icon-water-outline",
    },
  ];

  boolConfigs.forEach((cfg) => {
    const value = camper[cfg.key]; 
    if (value) {
      chips.push({
        label: cfg.label,
        iconHref: cfg.iconHref,
      });
    }
  });

  const details = [
    { label: "Form", value: prettyForm(camper.form) },
    { label: "Length", value: camper.length },
    { label: "Width", value: camper.width },
    { label: "Height", value: camper.height },
    { label: "Tank", value: camper.tank },
    { label: "Consumption", value: camper.consumption },
  ].filter((item) => item.value);

  return (
    <div className={css.section}>
      <div className={css.chipsRow}>
        {chips.map((chip) => (
          <div key={chip.label} className={css.chip}>
            <svg className={css.chipIcon} width={20} height={20}>
              <use href={chip.iconHref} />
            </svg>
            <span className={css.chipLabel}>{chip.label}</span>
          </div>
        ))}
      </div>

      {/* Vehicle details */}
      <div className={css.details}>
        <h3 className={css.detailsTitle}>Vehicle details</h3>

        <div className={css.detailsList}>
          {details.map((row) => (
            <div key={row.label} className={css.detailsRow}>
              <span className={css.detailsName}>{row.label}</span>
              <span className={css.detailsValue}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}