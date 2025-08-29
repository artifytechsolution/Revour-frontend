import HotelDetailsComponent from "@src/component/hoteldetails";
import React from "react";

const HotelDetailsPage = ({ params }: any) => {
  console.log("slug is comming in view");
  console.log(params);
  return <HotelDetailsComponent params={params} />;
};

export default HotelDetailsPage;
