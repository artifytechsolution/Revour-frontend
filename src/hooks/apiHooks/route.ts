import { BASE_URL } from "@src/config/config";

export const apiRoutes = {
  login: {
    POST: {
      query: "Login",
      method: "POST",
      url: `${BASE_URL}/user/login`,
    },
  },
  signup: {
    POST: {
      query: "signup",
      method: "POST",
      url: `${BASE_URL}/user/register`,
    },
  },
  findRoom: {
    GET: {
      query: "Hotel_list",
      method: "GET",
      url: `${BASE_URL}/rooms`,
    },
  },
  hotel: {
    GET: {
      query: "Hotel_list",
      method: "GET",
      url: `${BASE_URL}/hotels`,
    },
  },
  findHotel: {
    GET: {
      query: "Hotel_list",
      method: "GET",
      url: `${BASE_URL}/hotels`,
    },
  },
  experience: {
    GET: {
      query: "experience_list",
      method: "GET",
      url: `${BASE_URL}/experience`,
    },
  },
  hourly: {
    GET: {
      query: "Hotel_list",
      method: "GET",
      url: `${BASE_URL}/hotels/find/hours`,
    },
  },
  verify: {
    PATCH: {
      query: "VERIFYEMAIL",
      method: "PATCH",
      url: `${BASE_URL}/user/verify`,
    },
  },
  orderfindUserwise: {
    GET: {
      query: "orderfindbyuser",
      method: "GET",
      url: `${BASE_URL}/order/orderfindByuser`,
    },
  },
  uploadavtarImage: {
    POST: {
      query: "avtarImage",
      method: "POST",
      url: `${BASE_URL}/hotels/upload`,
    },
  },
  cancelOrder: {
    GET: {
      query: "canecl_order",
      method: "GET",
      url: `${BASE_URL}/order/cancelRequest`,
    },
  },
};
