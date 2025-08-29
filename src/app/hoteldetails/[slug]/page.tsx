import HotelDetailsPage from "@src/view/hoteldetailspage";

export default async function Page({ params }: { params: { slug: string } }) {
  console.log("params is herereetete");
  const slug = params.slug;
  console.log(slug);
  return <HotelDetailsPage params={slug} />;
}
