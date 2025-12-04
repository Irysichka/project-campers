"use client";

import CamperCatalog from "@/components/CamperCatalog/CamperCatalog";
import CamperFilter from "@/components/CamperFilter/CamperFilter";
import css from "./Catalog.module.css"
export default function CatalogPage() {
  return (
    <div className="container">
      <div className={css.section}>
        <CamperFilter />
        <CamperCatalog />
      </div>
    </div>
  );
}
