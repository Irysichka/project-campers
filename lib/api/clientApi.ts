import { Camper } from "@/types/camper";
import { api } from "./api"; // axios с baseURL = NEXT_PUBLIC_BACKEND_API_URL

// те же ключи, что и в фильтрах
export type EquipmentKey = "AC" | "kitchen" | "TV" | "bathroom";

export type CamperFilters = {
  location?: string; // будет уходить как ?location=...
  vehicleType?: "alcove" | "fullyIntegrated" | "panelTruck";
  transmission?: string; // "automatic" / "manual" и т.п.
  equipment?: EquipmentKey[]; // AC, kitchen, TV, bathroom
};

export type FetchCampersParams = {
  page?: number;
  limit?: number;
  filters?: CamperFilters;
};

// то, что возвращает backend для /campers
export interface CampersApiResponse {
  items: Camper[];
  total: number;
}

// query-параметры, которые мы реально шлём на backend
type CamperQueryParams = {
  page?: number;
  limit?: number;
  location?: string;
  form?: "alcove" | "fullyIntegrated" | "panelTruck";
  transmission?: string;
} & Partial<Record<EquipmentKey, boolean>>;

export async function fetchCampers(
  { page = 1, limit = 4, filters }: FetchCampersParams = {}
): Promise<CampersApiResponse> {
  const params: CamperQueryParams = { page, limit };

  if (filters?.location) {
    params.location = filters.location;
  }

  if (filters?.vehicleType) {
    params.form = filters.vehicleType;
  }

  if (filters?.transmission) {
    params.transmission = filters.transmission;
  }

  if (filters?.equipment?.length) {
    filters.equipment.forEach((key) => {
      // key: "AC" | "kitchen" | "TV" | "bathroom"
      params[key] = true;
    });
  }

  const res = await api.get<CampersApiResponse>("/campers", { params });

  return res.data; 
}

export async function fetchCamperById(id: string): Promise<Camper> {
  const res = await api.get<Camper>(`/campers/${id}`);
  return res.data;
}