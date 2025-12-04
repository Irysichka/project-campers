import { create } from "zustand";
import { Camper } from "@/types/camper";
import { getCampers, GetCampersOptions } from "@/lib/api/clientApi";

export type EquipmentKey = "AC" | "kitchen" | "TV" | "bathroom";
export type VehicleType = "alcove" | "fullyIntegrated" | "panelTruck" | "";

export type FiltersState = {
  location?: string;
  vehicleType?: VehicleType;
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

  draftFilters: FiltersState;   // то, что в форме сейчас
  appliedFilters: FiltersState; // по этим фильтрам сделан текущий запрос

  favorites: string[]; // id кемперов в избранном

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

// helper: превращаем FiltersState в параметры для getCampers
function buildOptionsFromFilters(
  filters: FiltersState,
  page: number,
  limit: number
): GetCampersOptions {
  const opts: GetCampersOptions = {
    page,
    pageSize: limit,
  };

  if (filters.location) opts.q = filters.location;
  if (filters.vehicleType) opts.type = filters.vehicleType;
  if (filters.transmission) opts.transmission = filters.transmission;
  if (filters.equipment && filters.equipment.length) {
    opts.equipment = filters.equipment;
  }

  return opts;
}

export const useCampersStore = create<CampersStoreState>((set, get) => ({
  campers: [],
  total: 0,
  page: 1,
  limit: 4,
  loading: false,
  loadingMore: false,

  draftFilters: {
    location: "Kyiv, Ukraine",
  },
  appliedFilters: {
    location: "Kyiv, Ukraine",
  },

  favorites: getInitialFavorites(),

  setDraftFilters: (next) => {
    set({ draftFilters: next });
  },

  applyFilters: async () => {
    const { draftFilters, limit } = get();

    // сбрасываем старый список и страницу
    set({
      appliedFilters: draftFilters,
      campers: [],
      page: 1,
      loading: true,
    });

    try {
      const opts = buildOptionsFromFilters(draftFilters, 1, limit);
      const res = await getCampers(opts);

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
      const opts = buildOptionsFromFilters(appliedFilters, nextPage, limit);
      const res = await getCampers(opts);

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
