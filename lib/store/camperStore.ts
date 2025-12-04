import { create } from "zustand";
import { Camper } from "@/types/camper";
import { fetchCampers } from "@/lib/api/clientApi";

export type EquipmentKey = "AC" | "kitchen" | "TV" | "bathroom";
export type VehicleType = "alcove" | "fullyIntegrated" | "panelTruck" | "";

export type FiltersState = {
  location?: string;
  vehicleType?: VehicleType | null;
  transmission?: string;
  equipment?: EquipmentKey[];
};

type CampersStoreState = {
  campers: Camper[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  loadingMore: boolean;

  draftFilters: FiltersState;   // то, что сейчас введено в форме
  appliedFilters: FiltersState; // фильтры, по которым загружены campers

  favorites: string[];

  setDraftFilters: (next: FiltersState) => void;
  applyFilters: () => Promise<void>;
  loadMore: () => Promise<void>;
  toggleFavorite: (id: string) => void;
};

function getInitialFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("tt_favorites");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

function saveFavorites(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("tt_favorites", JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export const useCampersStore = create<CampersStoreState>((set, get) => ({
  campers: [],
  total: 0,
  page: 1,
  limit: 4,
  loading: false,
  loadingMore: false,

  // лучше дефолт — пустой, чтобы не сразу фильтровать по локации
  draftFilters: {
    location: "",
    vehicleType: "",
    transmission: "",
    equipment: [],
  },
  appliedFilters: {
    location: "",
    vehicleType: "",
    transmission: "",
    equipment: [],
  },

  favorites: getInitialFavorites(),

  setDraftFilters: (next) => {
    set({ draftFilters: next });
  },

  applyFilters: async () => {
    const { draftFilters, limit } = get();

    // 1) сбрасываем предыдущее состояние и страницу
    set({
      appliedFilters: draftFilters,
      campers: [],
      page: 1,
      loading: true,
    });

    try {
      // 2) отправляем page, limit и filters
      const res = await fetchCampers({
        page: 1,
        limit,
        filters: draftFilters,
      });

      // 3) кладём новые данные
      set({
        campers: res.items,
        total: res.total,
      });
    } catch (error) {
      console.error("Error applying filters:", error);
      set({
        campers: [],
        total: 0,
      });
    } finally {
      set({ loading: false });
    }
  },

  loadMore: async () => {
    const { page, limit, appliedFilters, campers } = get();
    const nextPage = page + 1;

    set({ loadingMore: true });

    try {
      const res = await fetchCampers({
        page: nextPage,
        limit,
        filters: appliedFilters,
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

  toggleFavorite: (id: string) => {
    const current = get().favorites;
    const exists = current.includes(id);
    const next = exists ? current.filter((x) => x !== id) : [...current, id];

    saveFavorites(next);
    set({ favorites: next });
  },
}));