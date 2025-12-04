"use client";

import {
  useCampersStore,
  FiltersState,
  EquipmentKey,
  VehicleType,
} from "@/lib/store/camperStore";

import css from "./CamperFilter.module.css"

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

type RadioProps = {
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
};

function FilterCheckbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className={css.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={css.checkboxHidden}
      />
      <span>{label}</span>
    </label>
  );
}

function FilterRadio({ name, label, value, checked, onChange }: RadioProps) {
  return (
    <label className={css.checkboxLabel}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={css.checkboxHidden}
      />
      <span>{label}</span>
    </label>
  );
}

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

  const currentEquipment = draftFilters.equipment ?? [];

  const toggleEquipment = (key: EquipmentKey) => {
    const exists = currentEquipment.includes(key);
    const next = exists
      ? currentEquipment.filter((item) => item !== key)
      : [...currentEquipment, key];
    update({ equipment: next });
  };

  const setVehicleType = (type: VehicleType) => {
    update({ vehicleType: type });
  };

  const toggleTransmissionAutomatic = () => {
    const isAutomatic = draftFilters.transmission === "automatic";
    update({
      transmission: isAutomatic ? undefined : "automatic",
    });
  };

  const handleSearch = () => {
    applyFilters();
  };

  const isAutomaticChecked = draftFilters.transmission === "automatic";

  return (
    <div className={css.section}>
      {/* Location */}
      <div className={css.location}>
        <label className={css.label}>Location</label>
        {/* <svg className={css.spanFilter} width="16" height="16" aria-hidden="true">
        <use href="/sprite.svg#icon-location" />
      </svg> */}
        <input
          className={css.input}
          placeholder="Kyiv, Ukraine"
          value={draftFilters.location ?? ""}
          onChange={(e) => update({ location: e.target.value })}
        >
        </input>
      </div>

      <div>
        <p className={css.filt}>Filters</p>
      </div>

      <section className={css.vehivEquip}>
        <h3 className={css.vehText}>Vehicle equipment</h3>

        <ul className={css.vehList}>
          <li className={css.vehItem}>
            <svg className={css.spanCheckbox} width="32" height="32" aria-hidden="true">
        <use href="/sprite.svg#icon-windy" />
      </svg>
            <FilterCheckbox
              label="AC"
              checked={currentEquipment.includes("AC")}
              onChange={() => toggleEquipment("AC")}
            />
            
          </li>

          <li className={css.vehItem}>
            <svg className={css.spanCheckbox} width="32" height="32" aria-hidden="true">
        <use href="/sprite.svg#icon-cubs" />
      </svg>
            <FilterCheckbox
              label="Automatic"
              checked={isAutomaticChecked}
              onChange={toggleTransmissionAutomatic}
            />
            
          </li>

          <li className={css.vehItem}>
            <svg className={css.spanCheckbox} width="32" height="32" aria-hidden="true">
        <use href="/sprite.svg#icon-cup-hot" />
      </svg>
            <FilterCheckbox
              label="Kitchen"
              checked={currentEquipment.includes("kitchen")}
              onChange={() => toggleEquipment("kitchen")}
            />
            
          </li>

          <li className={css.vehItem}>
            <svg className={css.spanCheckbox} width="32" height="32" aria-hidden="true">
        <use href="/sprite.svg#icon-laptop" />
      </svg>
            <FilterCheckbox
              label="TV"
              checked={currentEquipment.includes("TV")}
              onChange={() => toggleEquipment("TV")}
            />
            
          </li>

          <li className={css.vehItem}>
            <svg className={css.spanCheckbox} width="32" height="32" aria-hidden="true">
        <use href="/sprite.svg#icon-bath" />
      </svg>
            <FilterCheckbox
              label="Bathroom"
              checked={currentEquipment.includes("bathroom")}
              onChange={() => toggleEquipment("bathroom")}
            />
            
          </li>
        </ul>
      </section>

      {/* Vehicle type */}
      <section>
        <h3 className={css.textType}>Vehicle type</h3>
        <ul className={css.vehList}>
          <li className={css.vehItem}>
            <svg className={css.spanCheckbox} width="32" height="32" aria-hidden="true">
        <use href="/sprite.svg#icon-quater" />
      </svg>
            <FilterRadio
              name="vehicleType"
              label="Van"
              value="panelTruck"
              checked={draftFilters.vehicleType === "panelTruck"}
              onChange={() => setVehicleType("panelTruck")}
            />
          </li>

          <li className={css.vehItemFul}>
            <svg className={css.spanCheckbox} width="32" height="32" aria-hidden="true">
        <use href="/sprite.svg#icon-four" />
      </svg>
            <FilterRadio
              name="vehicleType"
              label="Fully Integrated"
              value="fullyIntegrated"
              checked={draftFilters.vehicleType === "fullyIntegrated"}
              onChange={() => setVehicleType("fullyIntegrated")}
            />
          </li>

          <li className={css.vehItem}>
            <svg className={css.spanCheckbox} width="32" height="32" aria-hidden="true">
        <use href="/sprite.svg#icon-nine" />
      </svg>
            <FilterRadio
              name="vehicleType"
              label="Alcove"
              value="alcove"
              checked={draftFilters.vehicleType === "alcove"}
              onChange={() => setVehicleType("alcove")}
            />
          </li>
        </ul>
      </section>

      {/* Search button */}
      <div>
        <button className={css.butSearch} type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}