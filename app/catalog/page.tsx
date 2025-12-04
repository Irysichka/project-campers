"use client";

import CamperCatalog from "@/components/CamperCatalog/CamperCatalog";
import CamperFilter from "@/components/CamperFilter/CamperFilter";

export default function CatalogPage() {
  return (
      <div>
      <CamperFilter />    
      <CamperCatalog />
    </div>
  );
}