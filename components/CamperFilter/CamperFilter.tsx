"use client";

import { useCampersStore, FiltersState, EquipmentKey, VehicleType,} from "@/lib/store/camperStore";

export default function Filters() {
  const draftFilters = useCampersStore((state) => state.draftFilters);
  const setDraftFilters = useCampersStore((state) => state.setDraftFilters);
  const applyFilters = useCampersStore((state) => state.applyFilters);

  const update = (partial: Partial<FiltersState>) => {
    setDraftFilters({
      ...draftFilters,
      ...partial,
    });
  };

  const toggleEquipment = (key: EquipmentKey) => {
    const current = draftFilters.equipment ?? [];
    const exists = current.includes(key);
    const next = exists ? current.filter((x) => x !== key) : [...current, key];
    update({ equipment: next });
  };

  const setVehicleType = (type: VehicleType) => {
    update({ vehicleType: type });
  };

  const toggleTransmissionAutomatic = () => {
    update({
      transmission:
        draftFilters.transmission === "automatic" ? undefined : "automatic",
    });
  };

  const handleSearch = () => {
    applyFilters();
  };

  return (
    <aside>
      <div>
        <label>Location</label>
        <input
          placeholder="Kyiv, Ukraine"
          value={draftFilters.location ?? ""}
          onChange={(e) => update({ location: e.target.value })}
        />
      </div>

      <div>
        <p>Filters</p>
      </div>

      <section>
        <h3>Vehicle equipment</h3>

        <div>
          <button type="button" onClick={() => toggleEquipment("AC")}>
            AC
          </button>

          <button type="button" onClick={toggleTransmissionAutomatic}>
            Automatic
          </button>

          <button type="button" onClick={() => toggleEquipment("kitchen")}>
            Kitchen
          </button>

          <button type="button" onClick={() => toggleEquipment("TV")}>
            TV
          </button>

          <button type="button" onClick={() => toggleEquipment("bathroom")}>
            Bathroom
          </button>
        </div>
      </section>

      <section>
        <h3>Vehicle type</h3>

        <div>
          <button type="button" onClick={() => setVehicleType("panelTruck")}>
            Van
          </button>

          <button
            type="button"
            onClick={() => setVehicleType("fullyIntegrated")}
          >
            Fully Integrated
          </button>

          <button type="button" onClick={() => setVehicleType("alcove")}>
            Alcove
          </button>
        </div>
      </section>

      <div>
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </aside>
  );
}