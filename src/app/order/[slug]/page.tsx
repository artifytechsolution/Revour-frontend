import HotelBookingPage from "@src/view/hotelbookingPage";
import React from "react";

function page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  return <HotelBookingPage params={slug} />;
}

export default page;
