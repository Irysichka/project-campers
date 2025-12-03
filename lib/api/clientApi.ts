
import { Camper } from "@/types/camper";
import { nextServer } from "./api";


export async function FetchCampers(): Promise<Camper[]> {
    const response = await nextServer.get("/campers");
    return response.data;
}