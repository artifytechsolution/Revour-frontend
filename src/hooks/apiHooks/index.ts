import { useMutation } from "react-query";
import useAxios from "../useAxios";
import { apiRoutes } from "./route";
import {
  ILoginRequest,
  ILoginResponce,
} from "@src/utils/@types/ILoginResponce";

import { IExperience } from "@src/utils/@types/IExperience";

const {
  login,
  hotel,
  experience,
  hourly,
  findHotel,
  verify,
  findRoom,
  signup,
  orderfindUserwise,
  uploadavtarImage,
  cancelOrder,
} = apiRoutes;

export const useUserLogin = () => {
  const { url, method } = login.POST;
  const callApi = useAxios();
  return useMutation<ILoginResponce, string, ILoginRequest>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response as ILoginResponce;
  });
};
//for fetch all hotels

export const useHotels = () => {
  const { url, method } = hotel.GET;
  const callApi = useAxios();

  return useMutation<any, Error, any>(async (params = {}) => {
    console.log("Hotel parameters received:", params);

    // Build query string dynamically based on provided params
    const query = new URLSearchParams();

    if (params.search) query.append("search", params.search);
    if (params.limit !== undefined) query.append("limit", String(params.limit));
    if (params.page !== undefined) query.append("page", String(params.page));
    if (params.checkin !== undefined)
      query.append("checkin", String(params.checkin));
    if (params.checkout !== undefined)
      query.append("checkout", String(params.checkout));

    const response = await callApi({
      method,
      url: `${url}?${query.toString()}`,
    });

    return response as any;
  });
};

export const useExperience = () => {
  const { url, method } = experience.GET;

  const callApi = useAxios();

  return useMutation<IExperience, Error, any>(async (data) => {
    const response = await callApi({
      method,
      url: `${url}${"?search="}${"&limit="}${data.limit}${"&page="}${
        data.page
      }`,
      data,
    });

    console.log("Response is coming...");
    console.log(response);

    return response as IExperience;
  });
};
export const useHourlyHotel = () => {
  const { url, method } = hourly.GET;
  const callApi = useAxios();

  return useMutation<any, Error, any>(async (params = {}) => {
    // Create fresh query params for each call
    const query = new URLSearchParams();

    if (params.search) query.append("search", params.search);
    if (params.limit !== undefined) query.append("limit", String(params.limit));
    if (params.page !== undefined) query.append("page", String(params.page));
    if (params.checkin !== undefined)
      query.append("checkin", String(params.checkin));
    if (params.checkout !== undefined)
      query.append("checkout", String(params.checkout));

    const response = await callApi({
      method,
      url: `${url}?${query.toString()}`,
      // GET requests usually don't send data, so omit `data`
    });

    return response as any;
  });
};

export const useFindHotel = () => {
  const { url, method } = findHotel.GET;

  const callApi = useAxios();
  return useMutation<any, Error, any>(async (data: any) => {
    console.log("find data is commingggg");
    console.log(`${url}${"/"}${data.params}`);
    const response = await callApi({
      method,
      url: `${url}${"/"}${data.params}`,
      data,
    });
    return response as any;
  });
};
export const useFindRoom = () => {
  const { url, method } = findRoom.GET;

  const callApi = useAxios();
  return useMutation<any, Error, any>(async (data: any) => {
    const response = await callApi({
      method,
      url: `${url}${"/"}${data.params}`,
      data,
    });
    return response as any;
  });
};
export const useUserSignup = () => {
  const { url, method } = signup.POST;

  const callApi = useAxios();
  return useMutation<any, Error, any>(async (data: any) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response as any;
  });
};

export const useVerifyEmail = () => {
  const { url, method } = verify.PATCH;
  const callApi = useAxios();

  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url: `${url}${"?token="}${data?.token}`,
      data: data?.data,
    });
    return response as any;
  });
};

export const useOrdersByusers = () => {
  const { url, method } = orderfindUserwise.GET;
  const callApi = useAxios();

  return useMutation<any, Error, any>(async (params = {}) => {
    console.log("Hotel parameters received:", params);
    console.log(`${url}${"/"}${params.user_id}`);
    const response = await callApi({
      method,
      url: `${url}${"/"}${params.user_id}`,
    });

    return response as any;
  });
};
export const useUploadImage = () => {
  const { url, method } = uploadavtarImage.POST;
  const callApi = useAxios();

  return useMutation<any, Error, { user_id: string; file: File }>(
    async ({ user_id, file }) => {
      console.log("Upload parameters received:", { user_id, file });

      const formData = new FormData();
      formData.append("file", file);

      const response = await callApi({
        method,
        url: `${url}/${user_id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response as any;
    }
  );
};

export const useCancelOrder = () => {
  const { url, method } = cancelOrder.GET;
  const callApi = useAxios();

  return useMutation<any, Error, any>(async (params = {}) => {
    const response = await callApi({
      method,
      url: `${url}${"/"}${params.id}`,
    });

    return response as any;
  });
};
