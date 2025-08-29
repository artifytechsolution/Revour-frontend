import { ICommonResponse } from "./ICommonResponse";

export interface IExperience extends ICommonResponse {
  data: {
    id: string;
    experience_id: number;
    title: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    price: string;
    description: string | null;
    star_rating: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
}
