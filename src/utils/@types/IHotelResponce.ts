import { ICommonResponse } from "./ICommonResponse";

export interface IHotelResponce extends ICommonResponse {
  data: {
    id: string;
    hotel_id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    description: string | null;
    star_rating: number;
    createdAt: string; // ISO Date string
    updatedAt: string;
    deletedAt: string | null;
  };
}
