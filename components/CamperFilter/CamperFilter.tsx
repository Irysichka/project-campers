"use client";

import {
  useCampersStore,
  FiltersState,
} from "@/lib/store/camperStore";

import css from "./CamperFilter.module.css";
import { EquipmentKey, VehicleType } from "@/types/camper";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
};

type RadioProps = {
  name: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  full?: boolean;        
};

function FilterCheckbox({ label, checked, onChange, children }: CheckboxProps) {
  return (
    <label
      className={`${css.vehItem} ${checked ? css.vehItemSelected : ""} ${
        css.checkboxLabel
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={css.checkboxHidden}
      />
      {children}
      <span>{label}</span>
    </label>
  );
}

function FilterRadio({
  name,
  label,
  value,
  checked,
  onChange,
  children,
}: RadioProps) {
  return (
    <label
      className={`${css.vehItem} ${checked ? css.vehItemSelected : ""} ${
        css.checkboxLabel
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={css.checkboxHidden}
      />
      {children}
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

        <div className={css.inputWrapper}>
          <svg
            className={css.inputIcon}
            width="20"
            height="20"
            aria-hidden="true"
          >
            <use href="/sprite.svg#icon-location" />
          </svg>

          <input
            className={css.input}
            placeholder="City"
            value={draftFilters.location ?? ""}
            onChange={(e) => update({ location: e.target.value })}
          />
        </div>
      </div>

      <div>
        <p className={css.filt}>Filters</p>
      </div>

      <section className={css.vehivEquip}>
        <h3 className={css.vehText}>Vehicle equipment</h3>

        <ul className={css.vehList}>
          <li>
            <FilterCheckbox
              label="AC"
              checked={currentEquipment.includes("AC")}
              onChange={() => toggleEquipment("AC")}
            >
              <svg
                className={css.spanCheckbox}
                width="32"
                height="32"
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-windy" />
              </svg>
            </FilterCheckbox>
          </li>

          <li>
            <FilterCheckbox
              label="Automatic"
              checked={isAutomaticChecked}
              onChange={toggleTransmissionAutomatic}
            >
              <svg
                className={css.spanCheckbox}
                width="32"
                height="32"
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-cubs" />
              </svg>
            </FilterCheckbox>
          </li>

          <li>
            <FilterCheckbox
              label="Kitchen"
              checked={currentEquipment.includes("kitchen")}
              onChange={() => toggleEquipment("kitchen")}
            >
              <svg
                className={css.spanCheckbox}
                width="32"
                height="32"
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-cup-hot" />
              </svg>
            </FilterCheckbox>
          </li>

          <li>
            <FilterCheckbox
              label="TV"
              checked={currentEquipment.includes("TV")}
              onChange={() => toggleEquipment("TV")}
            >
              <svg
                className={css.spanCheckbox}
                width="32"
                height="32"
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-laptop" />
              </svg>
            </FilterCheckbox>
          </li>

          <li>
            <FilterCheckbox
              label="Bathroom"
              checked={currentEquipment.includes("bathroom")}
              onChange={() => toggleEquipment("bathroom")}
            >
              <svg
                className={css.spanCheckbox}
                width="32"
                height="32"
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-bath" />
              </svg>
            </FilterCheckbox>
          </li>
        </ul>
      </section>

      {/* Vehicle type */}
      <section>
        <h3 className={css.textType}>Vehicle type</h3>
        <ul className={css.vehList}>
          <li>
            <FilterRadio
              name="vehicleType"
              label="Van"
              value="panelTruck"
              checked={draftFilters.vehicleType === "panelTruck"}
              onChange={() => setVehicleType("panelTruck")}
            >
              <svg
                className={css.spanCheckbox}
                width="32"
                height="32"
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-quater" />
              </svg>
            </FilterRadio>
          </li>

          <li>
            <FilterRadio
              name="vehicleType"
              label="Fully Integrated"
              value="fullyIntegrated"
              checked={draftFilters.vehicleType === "fullyIntegrated"}
              onChange={() => setVehicleType("fullyIntegrated")}
            >
              <svg
                className={css.spanCheckbox}
                width="32"
                height="32"
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-four" />
              </svg>
            </FilterRadio>
          </li>

          <li>
            <FilterRadio
              name="vehicleType"
              label="Alcove"
              value="alcove"
              checked={draftFilters.vehicleType === "alcove"}
              onChange={() => setVehicleType("alcove")}
            >
              <svg
                className={css.spanCheckbox}
                width="32"
                height="32"
                aria-hidden="true"
              >
                <use href="/sprite.svg#icon-nine" />
              </svg>
            </FilterRadio>
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
