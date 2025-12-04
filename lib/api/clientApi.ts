import { Camper } from "@/types/camper";
import { api } from "./api";

export type EquipmentKey = "AC" | "kitchen" | "TV" | "bathroom";

export type GetCampersOptions = {
  page?: number;
  pageSize?: number;
  q?: string; // location
  type?: string; // form
  transmission?: string;
  equipment?: EquipmentKey[];
};

export type GetCampersResult = {
  items: Camper[];
  total: number;
};

// тип параметров запроса к /campers
type CamperQueryParams = {
  page?: number;
  limit?: number;
  location?: string;
  form?: string;
  transmission?: string;
} & Partial<Record<EquipmentKey, boolean>>;

export const getCampers = async (
  opts: GetCampersOptions = {}
): Promise<GetCampersResult> => {
  const { page = 1, pageSize = 4, q, type, transmission, equipment } = opts;

  const params: CamperQueryParams = { page, limit: pageSize };

  if (q) params.location = q;
  if (type) params.form = type;
  if (transmission) params.transmission = transmission;

  if (equipment?.length) {
    equipment.forEach((e) => {
      // e: "AC" | "kitchen" | "TV" | "bathroom"
      params[e] = true;
    });
  }

  const response = await api.get<Camper[]>("/campers", { params });

  const totalHeader = response.headers["x-total-count"];
  const total = totalHeader ? Number(totalHeader) : response.data.length;

  return { items: response.data, total };
};

export async function GetCampersbyId(id: string): Promise<Camper> {
  const response = await api.get<Camper>(`/campers/${id}`);
  return response.data;
}