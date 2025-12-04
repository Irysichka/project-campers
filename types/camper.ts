export interface Camper{
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;

    form: "alcove" | "fullyIntegrated" | "panelTruck";
    length?: string;
    width?: string;
    height?: string;
    tank?: string;
    consumption?: string;
    transmission?: string;
    engine?: string;


    AC?: boolean;
    bathroom?: boolean;
    kitchen?: boolean;
    TV?: boolean;
    radio?: boolean;
    refrigerator?: boolean;
    microwave?: boolean;
    gas?: boolean;
    water?: boolean;

    gallery?: Gallery[];
    reviews?: Review[];
}

export interface Gallery {
    thumb: string;
    original: string;
}

export interface Review{
    reviewer_name: string;
    reviewer_rating: number;
    comment?: string;
}


export type EquipmentFilter =
  | "AC"
  | "automatic"
  | "kitchen"
  | "TV"
    | "bathroom";

export type EquipmentKey = "AC" | "automatic" | "kitchen" | "TV" | "bathroom";
  
export type VehicleType = "alcove" | "fullyIntegrated" | "panelTruck" | "";

export interface CamperFilters {
  location?: string;
  form?: "panelTruck" | "fullyIntegrated" | "alcove";
  equipment?: Exclude<EquipmentKey, "automatic">[];
  transmission?: "automatic";
}
