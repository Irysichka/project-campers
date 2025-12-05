import { create } from "zustand";
import type { Camper, CamperFilters, VehicleType, EquipmentKey } from "@/types/camper";
import { fetchCampers } from "@/lib/api/clientApi";

export type FiltersState = {
  location: string;
  vehicleType: VehicleType | "";
  transmission: "automatic" | "";
  equipment: EquipmentKey[];
};

const initialFilters: FiltersState = {
  location: "",
  vehicleType: "",
  transmission: "",
  equipment: [],
};

function normalizeFilters(f: FiltersState): CamperFilters {
  return {
    location: f.location || undefined,
    vehicleType: f.vehicleType || undefined,
    transmission: f.transmission || undefined,
    equipment: f.equipment.length ? f.equipment : undefined,
  };
}

type CampersStoreState = {
  campers: Camper[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  loadingMore: boolean;

  draftFilters: FiltersState;
  appliedFilters: FiltersState;

  favorites: string[];

  setDraftFilters: (next: FiltersState) => void;
  applyFilters: () => Promise<void>;
  loadMore: () => Promise<void>;
  toggleFavorite: (id: string) => void;
};

function getInitialFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("tt_favorites") || "[]");
  } catch {
    return [];
  }
}

function saveFavorites(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("tt_favorites", JSON.stringify(ids));
}

export const useCampersStore = create<CampersStoreState>((set, get) => ({
  campers: [],
  total: 0,
  page: 1,
  limit: 4,
  loading: false,
  loadingMore: false,

  draftFilters: initialFilters,
  appliedFilters: initialFilters,

  favorites: getInitialFavorites(),

  setDraftFilters: (next) => set({ draftFilters: next }),

  applyFilters: async () => {
    const { draftFilters, limit } = get();
    const apiFilters = normalizeFilters(draftFilters);

    set({
      appliedFilters: draftFilters,
      campers: [],
      page: 1,
      loading: true,
    });

    try {
      const res = await fetchCampers({
        page: 1,
        limit,
        filters: apiFilters,
      });

      set({
        campers: res.items,
        total: res.total,
      });
    } catch (error) {
      console.error("Error applying filters:", error);
      set({ campers: [], total: 0 });
    } finally {
      set({
        loading: false,
        draftFilters: initialFilters, // ← правильно: сброс формы
      });
    }
  },

  loadMore: async () => {
    const { page, limit, appliedFilters, campers } = get();
    const apiFilters = normalizeFilters(appliedFilters);
    const nextPage = page + 1;

    set({ loadingMore: true });

    try {
      const res = await fetchCampers({
        page: nextPage,
        limit,
        filters: apiFilters,
      });

      set({
        campers: [...campers, ...res.items],
        total: res.total,
        page: nextPage,
      });
    } catch (error) {
      console.error("Error loading more campers:", error);
    } finally {
      set({ loadingMore: false });
    }
  },

  toggleFavorite: (id) => {
    const current = get().favorites;
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];

    saveFavorites(next);
    set({ favorites: next });
  },
}));