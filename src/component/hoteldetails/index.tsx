// "use client";
// import React, { useEffect, useState } from "react";
// import CloseIcon from "@mui/icons-material/Close";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import StarIcon from "@mui/icons-material/Star";
// import StarHalfIcon from "@mui/icons-material/StarHalf";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import WifiIcon from "@mui/icons-material/Wifi";
// import PoolIcon from "@mui/icons-material/Pool";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
// import SpaIcon from "@mui/icons-material/Spa";
// import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// import LocalParkingIcon from "@mui/icons-material/LocalParking";
// import RoomServiceIcon from "@mui/icons-material/RoomService";
// import AcUnitIcon from "@mui/icons-material/AcUnit";
// import TvIcon from "@mui/icons-material/Tv";
// import HotTubIcon from "@mui/icons-material/HotTub";
// import ImageIcon from "@mui/icons-material/Image";
// import SubwayIcon from "@mui/icons-material/Subway";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import FlightIcon from "@mui/icons-material/Flight";
// import { useFindHotel } from "@src/hooks/apiHooks";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { PhoneIcon } from "lucide-react";
// import { Email } from "@mui/icons-material";

// const HotelDetailsComponent = ({ params }) => {
//   console.log("slug is commmmmmminnnnnnnngggggggg");
//   const [hotelList, setHotelList] = useState<any>({});
//   const defaultImage =
//     "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

//   console.log(params);
//   const router = useRouter();

//   const {
//     isError: isHotelError,
//     isLoading: isHotelLoading,
//     data: hotelData,
//     error: hotelError,
//     mutate: hotelMutation,
//   } = useFindHotel();

//   useEffect(() => {
//     if (isHotelError && !isHotelLoading) {
//       toast.error(
//         hotelError instanceof Error ? hotelError.message : "An error occurred"
//       );
//       router.push("/login");
//     }
//     if (hotelData?.data) {
//       console.log("hotel data is commmingngggg 99");
//       console.log(hotelData.data);
//       setHotelList(hotelData.data);
//     }
//   }, [isHotelError, isHotelLoading, hotelError, hotelData, router]);

//   useEffect(() => {
//     hotelMutation({
//       params: params,
//     }); // Triggers the mutation on mount
//   }, [hotelMutation]);

//   const galleryImages = [
//     {
//       src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//       thumbnail:
//         "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
//       caption: "Deluxe Room - King Bed",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1566669437684-beb1dad0fad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//       thumbnail:
//         "https://images.unsplash.com/photo-1566669437684-beb1dad0fad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
//       caption: "Deluxe Room - Bathroom",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1592229505726-cf121663979f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//       thumbnail:
//         "https://images.unsplash.com/photo-1592229505726-cf121663979f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
//       caption: "Deluxe Room - Sitting Area",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//       thumbnail:
//         "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
//       caption: "Deluxe Room - View",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//       thumbnail:
//         "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
//       caption: "Deluxe Room - Amenities",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//       thumbnail:
//         "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
//       caption: "Deluxe Room - Workspace",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//       thumbnail:
//         "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
//       caption: "Deluxe Room - Night View",
//     },
//     {
//       src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
//       thumbnail:
//         "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
//       caption: "Deluxe Room - Bathroom Details",
//     },
//   ];

//   console.log("hotel data is comminggggg----");
//   console.log(hotelData?.data);
//   console.log(hotelList);
//   console.log(hotelList?.hotel_images?.[0]?.image_url || defaultImage);

//   const [isGalleryOpen, setIsGalleryOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isFading, setIsFading] = useState(false);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isGalleryOpen) return;
//       if (e.key === "Escape") {
//         setIsGalleryOpen(false);
//       } else if (e.key === "ArrowLeft") {
//         prevImage();
//       } else if (e.key === "ArrowRight") {
//         nextImage();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isGalleryOpen]);

//   useEffect(() => {
//     if (isGalleryOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isGalleryOpen]);

//   const prevImage = () => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentImageIndex(
//         (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
//       );
//       setIsFading(false);
//     }, 300);
//   };

//   const nextImage = () => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
//       setIsFading(false);
//     }, 300);
//   };

//   const changeImage = (index) => {
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentImageIndex(index);
//       setIsFading(false);
//     }, 300);
//   };

//   const handleOpenGallery = () => {
//     setIsGalleryOpen(true);
//   };

//   // const defaultImage =
//   //   "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

//   return (
//     <div>
//       <main className="mx-auto max-w-[90%] sm:max-w-[600px] lg:max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 ">
//         {/* Hotel Image Gallery */}
//         <div className="relative mt-6">
//           <div className="w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden">
//             <img
//               src={hotelList?.hotel_images?.[0]?.image_url || defaultImage}
//               // src={hotelList?.hotel_images[0]?.image_url}
//               alt={galleryImages[0].caption}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <button
//             onClick={handleOpenGallery}
//             className="absolute bottom-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center hover:bg-white transition-colors"
//           >
//             <ImageIcon className="mr-1 text-base" /> View Gallery
//           </button>
//         </div>

//         {/* Hotel Info */}
//         <div className="p-4 sm:p-6">
//           {/* Header Section */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             {/* Hotel Info */}
//             <div className="flex-1">
//               <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold ">
//                 {hotelList.name}
//               </h1>

//               {/* Location */}
//               <div className="flex items-center mt-2 ">
//                 <LocationOnIcon className="text-blue-500 mr-2 text-base" />
//                 <p className="text-sm sm:text-base">
//                   {hotelList.address}
//                   {", "}
//                   {hotelList.city}
//                 </p>
//               </div>

//               {/* Phone */}
//               <div className="flex items-center mt-1 ">
//                 <PhoneIcon className="text-blue-500 mr-2 text-base" />
//                 <p className="text-sm sm:text-base">{hotelList.phone}</p>
//               </div>

//               {/* Email */}
//               <div className="flex items-center mt-1 ">
//                 <Email className="text-blue-500 mr-2 text-base" />
//                 <p className="text-sm sm:text-base">{hotelList.email}</p>
//               </div>
//             </div>

//             {/* Rating */}
//             <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full self-start sm:self-auto">
//               <StarIcon className="text-yellow-400 mr-1" />
//               <span className="font-medium text-sm sm:text-base ">4.5</span>
//               <span className=" ml-1 text-xs sm:text-sm">(1,238)</span>
//             </div>
//           </div>

//           {/* Description */}
//           <p className="text-sm sm:text-base t mt-3 sm:mt-4">
//             {hotelList.description}
//           </p>
//         </div>

//         {/* Amenities */}
//         <div className="p-4 sm:p-6 border-t border-gray-100">
//           <h2 className="text-lg sm:text-xl font-semibold mb-4">Amenities</h2>
//           <div className="overflow-x-auto pb-2">
//             <div className="flex space-x-4 w-max">
//               {[
//                 { icon: WifiIcon, text: "Free WiFi" },
//                 { icon: PoolIcon, text: "Swimming Pool" },
//                 { icon: RestaurantIcon, text: "Restaurant" },
//                 { icon: SpaIcon, text: "Spa" },
//                 { icon: FitnessCenterIcon, text: "Gym" },
//                 { icon: LocalParkingIcon, text: "Parking" },
//                 { icon: RoomServiceIcon, text: "Room Service" },
//               ].map((amenity, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col items-center min-w-[80px] sm:min-w-[100px]"
//                 >
//                   <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 rounded-full flex items-center justify-center mb-1">
//                     <amenity.icon className="text-blue-600 text-lg sm:text-xl" />
//                   </div>
//                   <span className="text-xs sm:text-sm text-center">
//                     {amenity.text}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Rooms */}
//         <div className="p-4 sm:p-6 border-t border-gray-100">
//           <h2 className="text-lg sm:text-xl font-semibold mb-4">Rooms</h2>
//           <div className="space-y-6">
//             {/* {[
//               {
//                 title: "Deluxe Room",
//                 details: "30 sqm · King bed · City view",
//                 price: "$250",
//                 taxes: "+ $20 taxes & fees",
//                 image: galleryImages[0],
//                 features: [
//                   { icon: WifiIcon, text: "Free WiFi" },
//                   { icon: AcUnitIcon, text: "AC" },
//                   { icon: TvIcon, text: "TV" },
//                 ],
//               },
//               {
//                 title: "Executive Suite",
//                 details: "50 sqm · King bed · Jacuzzi · City view",
//                 price: "$400",
//                 taxes: "+ $30 taxes & fees",
//                 image: galleryImages[1],
//                 features: [
//                   { icon: WifiIcon, text: "Free WiFi" },
//                   { icon: HotTubIcon, text: "Jacuzzi" },
//                   { icon: RestaurantIcon, text: "Breakfast" },
//                 ],
//               },
//             ] */}
//             {hotelList?.room_types?.map((room, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden"
//               >
//                 <div className="flex flex-col sm:flex-row">
//                   <div className="w-full sm:w-1/3">
//                     <img
//                       src={false || defaultImage}
//                       alt={"room hotel"}
//                       className="w-full h-48 sm:h-full object-cover"
//                     />
//                   </div>
//                   <div className="p-4 sm:w-2/3">
//                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                       <div>
//                         <h3 className="font-semibold text-lg sm:text-xl">
//                           {room.type_name}
//                         </h3>
//                         <p className="text-sm text-gray-500 mt-1">
//                           {room.description}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-lg sm:text-xl font-bold text-blue-600">
//                           ${room.base_price}
//                           <span className="text-sm font-normal text-gray-500">
//                             /night
//                           </span>
//                         </p>
//                         <p className="text-xs text-gray-500">{room.taxes}</p>
//                       </div>
//                     </div>
//                     <div className="mt-3 flex flex-wrap gap-2">
//                       {[
//                         { icon: WifiIcon, text: "Free WiFi" },
//                         { icon: HotTubIcon, text: "Jacuzzi" },
//                         { icon: RestaurantIcon, text: "Breakfast" },
//                       ].map((feature, fIndex) => (
//                         <span
//                           key={fIndex}
//                           className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center"
//                         >
//                           <feature.icon className="text-blue-500 mr-1 text-xs" />{" "}
//                           {feature.text}
//                         </span>
//                       ))}
//                     </div>
//                     <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//                       <a
//                         href="#gallery"
//                         className="text-blue-600 text-sm font-medium flex items-center hover:underline"
//                         onClick={handleOpenGallery}
//                       >
//                         <ImageIcon className="mr-1 text-base" /> View Photos
//                       </a>
//                       <button
//                         onClick={() => router.push(`${"/order/"}${room.id}`)}
//                         className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
//                       >
//                         Select Room
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Guest Reviews */}
//         <div className="p-4 sm:p-6 border-t border-gray-100">
//           <h2 className="text-lg sm:text-xl font-semibold mb-4">
//             Guest Reviews
//           </h2>
//           <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4 sm:gap-6">
//             <div className="text-center">
//               <p className="text-3xl sm:text-4xl font-bold">4.5</p>
//               <div className="flex items-center justify-center text-yellow-400 my-1">
//                 <StarIcon />
//                 <StarIcon />
//                 <StarIcon />
//                 <StarIcon />
//                 <StarHalfIcon />
//               </div>
//               <div className="text-sm text-gray-500">1,238 reviews</div>
//             </div>
//             <div className="flex-1 w-full">
//               <div className="space-y-2 text-sm text-gray-600">
//                 {[
//                   { stars: "5★", width: "60%" },
//                   { stars: "4★", width: "25%" },
//                   { stars: "3★", width: "10%" },
//                   { stars: "2★", width: "3%" },
//                   { stars: "1★", width: "2%" },
//                 ].map((rating, index) => (
//                   <div key={index} className="flex items-center">
//                     <span className="w-10 sm:w-12">{rating.stars}</span>
//                     <div className="flex-1 bg-gray-200 rounded-full h-2.5">
//                       <div
//                         className="bg-blue-500 h-2.5 rounded-full"
//                         style={{ width: rating.width }}
//                       ></div>
//                     </div>
//                     <span className="ml-2 text-gray-500 w-10 sm:w-12 text-right">
//                       {rating.width}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//           <div className="space-y-6">
//             {[
//               {
//                 name: "Samantha Carter",
//                 date: "2 days ago",
//                 rating: 5,
//                 review:
//                   "What a stunning hotel! The staff were incredibly welcoming and helpful. Room service was prompt and delicious. Highly recommend for anyone traveling to the city.",
//               },
//               {
//                 name: "Jean Barret",
//                 date: "1 week ago",
//                 rating: 4,
//                 review:
//                   "The Grand Budapest is always top-notch. Historic architecture, cozy beds, and top-class food. Only minor issue: slow Wi-Fi.",
//               },
//             ].map((review, index) => (
//               <div key={index} className="border-b border-gray-100 pb-6">
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <p className="font-semibold text-base sm:text-lg">
//                       {review.name}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Verified Stay • {review.date}
//                     </p>
//                   </div>
//                   <div className="flex items-center text-yellow-400 text-sm">
//                     {[...Array(review.rating)].map((_, i) => (
//                       <StarIcon key={i} />
//                     ))}
//                     {review.rating < 5 &&
//                       [...Array(5 - review.rating)].map((_, i) => (
//                         <StarIcon
//                           key={i + review.rating}
//                           className="text-gray-300"
//                         />
//                       ))}
//                   </div>
//                 </div>
//                 <p className="text-sm sm:text-base text-gray-800">
//                   {review.review}
//                 </p>
//               </div>
//             ))}
//             <button className="w-full border border-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
//               Show All Reviews
//             </button>
//           </div>
//         </div>

//         {/* Location */}
//         <div className="p-4 sm:p-6 border-t border-gray-100">
//           <h2 className="text-lg sm:text-xl font-semibold mb-4">Location</h2>
//           <div className="w-full rounded-lg overflow-hidden shadow-sm">
//             <iframe
//               title="Google Map"
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.204532604641!2d-122.4194150846812!3d37.77492977975816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c2ed0b3a5%3A0x8a2e36e7cc0f6e2e!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1617744839381!5m2!1sen!2sus"
//               width="100%"
//               height="100%"
//               allowFullScreen=""
//               loading="lazy"
//               className="w-full h-64 sm:h-80 lg:h-96 border-0"
//               referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//           </div>
//           <p className="text-sm sm:text-base text-gray-600 mt-3">
//             <LocationOnIcon className="text-blue-500 mr-1" /> Located in the
//             heart of the city, just 5 minutes walk from the main shopping
//             district and 10 minutes from the central station.
//           </p>
//           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
//             {[
//               { icon: SubwayIcon, text: "500m to metro station" },
//               { icon: RestaurantIcon, text: "Multiple restaurants nearby" },
//               { icon: AccountBalanceIcon, text: "1km to city center" },
//               { icon: FlightIcon, text: "15km to airport" },
//             ].map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center text-sm sm:text-base"
//               >
//                 <item.icon className="text-gray-400 mr-2" />
//                 <span>{item.text}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom Buttons - Mobile */}
//         <div className="flex justify-between p-4 gap-2 max-w-[600px] mx-auto lg:hidden">
//           <a
//             href="#"
//             className="w-1/2 bg-gray-200 text-center text-sm font-medium py-3 rounded-lg hover:bg-gray-300 transition-colors"
//           >
//             Check Availability
//           </a>
//           <a
//             href="#"
//             className="w-1/2 bg-blue-600 text-white text-center text-sm font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Book Now
//           </a>
//         </div>

//         {/* Bottom Buttons - Desktop */}
//         {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-4 shadow-lg hidden lg:block">
//           <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
//             <div>
//               <p className="font-semibold text-lg">The Grand Budapest Hotel</p>
//               <p className="text-sm text-gray-600">
//                 From $250/night (excl. taxes)
//               </p>
//             </div>
//             <div className="flex space-x-4">
//               <button className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
//                 <FavoriteBorderIcon className="mr-2" /> Save
//               </button>
//               <a
//                 href="#"
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//               >
//                 Book Now
//               </a>
//             </div>
//           </div>
//         </div> */}
//       </main>

//       {/* Gallery Modal */}
//       {isGalleryOpen && (
//         <div
//           className={`fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 ${
//             isGalleryOpen ? "opacity-100 visible" : "opacity-0 invisible"
//           }`}
//           onClick={() => setIsGalleryOpen(false)}
//         >
//           <div
//             className="relative w-full max-w-4xl sm:max-w-5xl lg:max-w-6xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setIsGalleryOpen(false)}
//               className="absolute -top-8 sm:-top-10 right-0 text-white hover:text-gray-300 z-10"
//             >
//               <CloseIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
//             </button>
//             <div
//               className="relative overflow-hidden rounded-lg bg-gray-800"
//               style={{ paddingBottom: "56.25%" }}
//             >
//               <img
//                 src={galleryImages[currentImageIndex].src}
//                 className={`absolute inset-0 w-full h-full object-contain sm:object-cover transition-opacity duration-300 ${
//                   isFading ? "opacity-0" : "opacity-100"
//                 }`}
//                 alt={galleryImages[currentImageIndex].caption}
//               />
//             </div>
//             <div className="mt-3 flex flex-col sm:flex-row justify-between items-center gap-2">
//               <p className="text-white font-medium text-sm sm:text-base">
//                 {galleryImages[currentImageIndex].caption}
//               </p>
//               <p className="text-sm text-gray-300">{`${
//                 currentImageIndex + 1
//               } of ${galleryImages.length}`}</p>
//             </div>
//             <button
//               onClick={prevImage}
//               className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70 transition-colors"
//             >
//               <ChevronLeftIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
//             </button>
//             <button
//               onClick={nextImage}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70 transition-colors"
//             >
//               <ChevronRightIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
//             </button>
//             <div className="mt-4 flex space-x-2 overflow-x-auto py-2 px-1">
//               {galleryImages.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image.thumbnail}
//                   onClick={() => changeImage(index)}
//                   className={`w-16 h-10 sm:w-20 sm:h-12 object-cover rounded cursor-pointer border-2 transition-all ${
//                     currentImageIndex === index
//                       ? "border-white"
//                       : "border-transparent"
//                   } hover:border-white`}
//                   alt={image.caption}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HotelDetailsComponent;

////new code

// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// // --- HOOKS ---
// import { useFindHotel } from "@src/hooks/apiHooks"; // Assuming this is your data fetching hook

// // --- ICONS ---
// import CloseIcon from "@mui/icons-material/Close";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import StarIcon from "@mui/icons-material/Star";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import WifiIcon from "@mui/icons-material/Wifi";
// import PoolIcon from "@mui/icons-material/Pool";
// import RestaurantIcon from "@mui/icons-material/Restaurant";
// import SpaIcon from "@mui/icons-material/Spa";
// import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// import LocalParkingIcon from "@mui/icons-material/LocalParking";
// import RoomServiceIcon from "@mui/icons-material/RoomService";
// import AcUnitIcon from "@mui/icons-material/AcUnit";
// import TvIcon from "@mui/icons-material/Tv";
// import HotTubIcon from "@mui/icons-material/HotTub";
// import { ImageIcon } from "lucide-react";
// import SubwayIcon from "@mui/icons-material/Subway";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import FlightIcon from "@mui/icons-material/Flight";
// import EmailIcon from "@mui/icons-material/Email";
// import PhoneIcon from "@mui/icons-material/Phone";

// // --- SUB-COMPONENTS ---

// // Skeleton Loader for a better UX during data fetching
// const LoadingSkeleton = () => (
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-pulse">
//     <div className="bg-gray-200 rounded-lg w-full h-96 mb-6"></div>
//     <div className="flex flex-col sm:flex-row justify-between gap-4">
//       <div className="flex-1 space-y-4">
//         <div className="bg-gray-200 rounded h-8 w-3/4"></div>
//         <div className="bg-gray-200 rounded h-5 w-1/2"></div>
//         <div className="bg-gray-200 rounded h-5 w-1/3"></div>
//       </div>
//       <div className="bg-gray-200 rounded-full h-10 w-24"></div>
//     </div>
//     <div className="mt-6 space-y-2">
//       <div className="bg-gray-200 rounded h-4 w-full"></div>
//       <div className="bg-gray-200 rounded h-4 w-full"></div>
//       <div className="bg-gray-200 rounded h-4 w-5/6"></div>
//     </div>
//     <div className="mt-8 border-t pt-6">
//       <div className="bg-gray-200 rounded h-6 w-1/4 mb-4"></div>
//       <div className="flex space-x-4">
//         {[...Array(5)].map((_, i) => (
//           <div key={i} className="flex flex-col items-center space-y-2">
//             <div className="bg-gray-200 rounded-full w-14 h-14"></div>
//             <div className="bg-gray-200 rounded h-4 w-20"></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );

// // Gallery Modal Component
// const GalleryModal = ({ images, startIndex, onClose }) => {
//   const [currentIndex, setCurrentIndex] = useState(startIndex);
//   const [isFading, setIsFading] = useState(false);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "Escape") onClose();
//       if (e.key === "ArrowLeft") showPrev();
//       if (e.key === "ArrowRight") showNext();
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//       document.body.style.overflow = "";
//     };
//   }, []);

//   const changeImage = (index) => {
//     if (index === currentIndex) return;
//     setIsFading(true);
//     setTimeout(() => {
//       setCurrentIndex(index);
//       setIsFading(false);
//     }, 300);
//   };

//   const showPrev = () =>
//     changeImage((currentIndex - 1 + images.length) % images.length);
//   const showNext = () => changeImage((currentIndex + 1) % images.length);

//   if (!images || images.length === 0) return null;
//   const currentImage = images[currentIndex];

//   return (
//     <div
//       className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 transition-opacity duration-300"
//       onClick={onClose}
//     >
//       <div
//         className="relative w-full max-w-6xl"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
//           aria-label="Close gallery"
//         >
//           <CloseIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
//         </button>

//         {/* Main Image */}
//         <div className="relative overflow-hidden rounded-lg bg-black/50 aspect-video">
//           <img
//             src={currentImage.src}
//             className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
//               isFading ? "opacity-0" : "opacity-100"
//             }`}
//             alt={currentImage.caption}
//           />
//         </div>

//         {/* Info & Navigation */}
//         <div className="mt-3 text-white flex flex-col sm:flex-row justify-between items-center gap-2">
//           <p className="font-medium text-sm sm:text-base">
//             {currentImage.caption}
//           </p>
//           <p className="text-sm text-gray-300">{`${currentIndex + 1} of ${
//             images.length
//           }`}</p>
//         </div>

//         <button
//           onClick={showPrev}
//           className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
//           aria-label="Previous image"
//         >
//           <ChevronLeftIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
//         </button>
//         <button
//           onClick={showNext}
//           className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
//           aria-label="Next image"
//         >
//           <ChevronRightIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
//         </button>

//         {/* Thumbnails */}
//         <div className="mt-4 flex space-x-2 overflow-x-auto py-2 px-1">
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={image.thumbnail}
//               onClick={() => changeImage(index)}
//               className={`w-20 h-12 object-cover rounded cursor-pointer border-2 transition-all flex-shrink-0 ${
//                 currentIndex === index ? "border-white" : "border-transparent"
//               } hover:border-white/70`}
//               alt={image.caption}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- MAIN COMPONENT ---
// const HotelDetailsComponent = ({ params }) => {
//   const [hotel, setHotel] = useState(null);
//   const [isGalleryOpen, setIsGalleryOpen] = useState(false);

//   const router = useRouter();
//   const {
//     isError: isHotelError,
//     isLoading: isHotelLoading,
//     data: hotelData,
//     error: hotelError,
//     mutate: fetchHotel,
//   } = useFindHotel();

//   // Initial data fetch
//   useEffect(() => {
//     if (params) {
//       fetchHotel({ params });
//     }
//   }, [params, fetchHotel]);

//   // Handle API response
//   useEffect(() => {
//     if (isHotelError && !isHotelLoading) {
//       toast.error(
//         hotelError instanceof Error ? hotelError.message : "An error occurred"
//       );
//       router.push("/login"); // Or a more appropriate error page
//     }
//     if (hotelData?.data) {
//       setHotel(hotelData.data);
//     }
//   }, [isHotelError, isHotelLoading, hotelError, hotelData, router]);

//   // Transform hotel images for the gallery component
//   const galleryImages =
//     hotel?.hotel_images?.map((img) => ({
//       src: img.image_url,
//       thumbnail: img.image_url, // Assuming thumbnail is same as src, adjust if different
//       caption: img.caption || hotel.name, // Fallback caption
//     })) || [];

//   const defaultImage =
//     "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

//   if (isHotelLoading) {
//     return <LoadingSkeleton />;
//   }

//   if (isHotelError || !hotel) {
//     return (
//       <div className="flex items-center justify-center h-screen text-center">
//         <div>
//           <h2 className="text-2xl font-semibold text-red-600">
//             Failed to load hotel details.
//           </h2>
//           <p className="text-gray-600 mt-2">
//             Please try again later or contact support.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
//         {/* Hero Image */}
//         <div className="relative mb-6">
//           <div className="w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
//             <img
//               src={hotel.hotel_images?.[0]?.image_url || defaultImage}
//               alt={`${hotel.name} main view`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <button
//             onClick={() => setIsGalleryOpen(true)}
//             className="absolute bottom-4 right-4 bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-white transition-all shadow-md"
//           >
//             <ImageIcon className="mr-2 text-base" /> Show All Photos
//           </button>
//         </div>

//         {/* Hotel Header */}
//         <section className="py-6 border-b">
//           <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
//             <div className="flex-1">
//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
//                 {hotel.name}
//               </h1>
//               <div className="mt-2 space-y-1 text-gray-600">
//                 <p className="flex items-center">
//                   <LocationOnIcon className="text-green-500 mr-2" />
//                   {hotel.city} , India
//                 </p>
//                 <p className="flex items-center">
//                   <PhoneIcon className="text-green-500 mr-2 h-4 w-4" />
//                   {hotel.phone}
//                 </p>
//                 <p className="flex items-center">
//                   <EmailIcon className="text-green-500 mr-2" />
//                   {"Info@revourhotels.com"}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center bg-green-100 px-3 py-1 rounded-full self-start sm:self-auto shrink-0">
//               <StarIcon className="text-yellow-400 mr-1" />
//               <span className="font-bold text-base text-green-800">4.5</span>
//               <span className="ml-1 text-sm text-green-700">
//                 (1,238 reviews)
//               </span>
//             </div>
//           </div>
//           <p className="text-base text-gray-700 mt-4">{hotel.description}</p>
//         </section>

//         {/* Amenities Section */}
//         <section className="py-6 border-b">
//           <h2 className="text-xl font-semibold mb-4">Amenities</h2>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//             {[
//               { icon: WifiIcon, text: "Free WiFi" },
//               { icon: PoolIcon, text: "Swimming Pool" },
//               { icon: RestaurantIcon, text: "Restaurant" },
//               { icon: SpaIcon, text: "Spa" },
//               { icon: FitnessCenterIcon, text: "Gym" },
//               { icon: LocalParkingIcon, text: "Parking" },
//               { icon: RoomServiceIcon, text: "Room Service" },
//               { icon: AcUnitIcon, text: "Air Conditioning" },
//             ].map((amenity, index) => (
//               <div key={index} className="flex items-center space-x-3">
//                 <div className="bg-green-50 p-2 rounded-full">
//                   <amenity.icon className="text-green-600" />
//                 </div>
//                 <span className="text-sm font-medium text-gray-700">
//                   {amenity.text}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Rooms Section */}
//         <section className="py-6 border-b">
//           <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
//           <div className="space-y-6">
//             {hotel.room_types && hotel.room_types.length > 0 ? (
//               hotel.room_types.map((room) => (
//                 <div
//                   key={room.id}
//                   className="border border-gray-200 rounded-lg hover:shadow-lg transition-shadow overflow-hidden flex flex-col sm:flex-row"
//                 >
//                   <div className="w-full sm:w-1/3 flex-shrink-0">
//                     <img
//                       src={room.room_img || defaultImage}
//                       alt={room.type_name}
//                       className="w-full h-48 sm:h-full object-cover"
//                     />
//                   </div>
//                   <div className="p-4 flex flex-col flex-grow">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h3 className="font-semibold text-lg">
//                           {room.type_name}
//                         </h3>
//                         <p className="text-sm text-gray-500 mt-1">
//                           {room.description}
//                         </p>
//                       </div>
//                       <div className="text-right shrink-0 ml-4">
//                         <p className="text-xl font-bold text-green-600">
//                           ${room.base_price}
//                           <span className="text-sm font-normal text-gray-500">
//                             /night
//                           </span>
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {room.taxes || "include taxes & fees"}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="mt-3 flex flex-wrap gap-2">
//                       {[
//                         { icon: WifiIcon, text: "Free WiFi" },
//                         { icon: AcUnitIcon, text: "AC" },
//                         { icon: TvIcon, text: "TV" },
//                       ].map((feature, fIndex) => (
//                         <span
//                           key={fIndex}
//                           className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center"
//                         >
//                           <feature.icon className="text-green-500 mr-1 text-sm" />{" "}
//                           {feature.text}
//                         </span>
//                       ))}
//                     </div>
//                     <div className="mt-auto pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
//                       <button
//                         onClick={() => setIsGalleryOpen(true)}
//                         className="text-green-600 text-sm font-medium flex items-center hover:underline"
//                       >
//                         <ImageIcon className="mr-1 text-base" /> View Photos
//                       </button>
//                       <button
//                         onClick={() => router.push(`/order/${room.id}`)}
//                         className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                       >
//                         Select Room
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-6">
//                 No rooms Avilable
//               </p>
//             )}
//           </div>
//         </section>

//         {/* Guest Reviews Section */}
//         {/* NOTE: Review data is currently mocked. Replace with API data when available. */}
//         <section className="py-6 border-b">
//           <h2 className="text-xl font-semibold mb-4">Guest Reviews</h2>
//           <div className="space-y-6">
//             {[
//               {
//                 name: "Samantha Carter",
//                 date: "2 days ago",
//                 rating: 5,
//                 review:
//                   "What a stunning hotel! The staff were incredibly welcoming and helpful. Room service was prompt and delicious. Highly recommend for anyone traveling to the city.",
//               },
//               {
//                 name: "Jean Barret",
//                 date: "1 week ago",
//                 rating: 4,
//                 review:
//                   "The Grand Budapest is always top-notch. Historic architecture, cozy beds, and top-class food. Only minor issue: slow Wi-Fi.",
//               },
//             ].map((review, index) => (
//               <div
//                 key={index}
//                 className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
//               >
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <p className="font-semibold text-gray-800">{review.name}</p>
//                     <p className="text-xs text-gray-500">
//                       Verified Stay • {review.date}
//                     </p>
//                   </div>
//                   <div className="flex items-center text-yellow-400">
//                     {[...Array(5)].map((_, i) => (
//                       <StarIcon
//                         key={i}
//                         className={
//                           i < review.rating
//                             ? "text-yellow-400"
//                             : "text-gray-300"
//                         }
//                       />
//                     ))}
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-700">{review.review}</p>
//               </div>
//             ))}
//             <button className="w-full border border-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
//               Show All Reviews
//             </button>
//           </div>
//         </section>

//         {/* Location Section */}
//         <section className="py-6">
//           <h2 className="text-xl font-semibold mb-4">Location</h2>
//           <div className="w-full rounded-lg overflow-hidden shadow-sm aspect-video">
//             <iframe
//               title="Google Map Location"
//               src={`https://maps.google.com/maps?q=${hotel.latitude},${hotel.longitude}&hl=es;z=14&output=embed`}
//               width="100%"
//               height="100%"
//               allowFullScreen=""
//               loading="lazy"
//               className="border-0"
//               referrerPolicy="no-referrer-when-downgrade"
//             ></iframe>
//           </div>
//           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
//             {[
//               { icon: SubwayIcon, text: "500m to metro station" },
//               { icon: RestaurantIcon, text: "Multiple restaurants nearby" },
//               { icon: AccountBalanceIcon, text: "1km to city center" },
//               { icon: FlightIcon, text: "15km to airport" },
//             ].map((item, index) => (
//               <div key={index} className="flex items-center text-sm">
//                 <item.icon className="text-gray-400 mr-2" />
//                 {item.text}
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Bottom Buttons - Mobile */}
//         <div className="lg:hidden sticky bottom-0 bg-white/80 backdrop-blur-sm -mx-4 -mb-6 px-4 py-3 border-t mt-6 flex justify-between items-center gap-3">
//           <div className="text-left">
//             <p className="font-bold">
//               ${hotel.room_types?.[0]?.base_price || "N/A"}
//             </p>
//             <p className="text-xs text-gray-600">/night</p>
//           </div>
//           <button
//             onClick={() => router.push(`/order/${hotel.room_types?.[0]?.id}`)}
//             className="bg-green-600 text-white text-center text-sm font-medium py-3 rounded-lg hover:bg-green-700 transition-colors flex-grow"
//           >
//             Book Now
//           </button>
//         </div>
//       </main>

//       {/* Gallery Modal */}
//       {isGalleryOpen && (
//         <GalleryModal
//           images={galleryImages}
//           startIndex={0}
//           onClose={() => setIsGalleryOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default HotelDetailsComponent;

"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

// --- HOOKS ---
import { useFindHotel } from "@src/hooks/apiHooks";
import { useAppSelector } from "@src/redux/store";
import { selectSearchDetails, selectUser } from "@src/redux/reducers/authSlice";

// --- ICONS ---
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WifiIcon from "@mui/icons-material/Wifi";
import PoolIcon from "@mui/icons-material/Pool";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SpaIcon from "@mui/icons-material/Spa";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import TvIcon from "@mui/icons-material/Tv";
import HotTubIcon from "@mui/icons-material/HotTub";
import { ImageIcon } from "lucide-react";
import SubwayIcon from "@mui/icons-material/Subway";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FlightIcon from "@mui/icons-material/Flight";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

// Terms & Conditions Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PolicyIcon from "@mui/icons-material/Policy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// All Material UI Icons for Amenities
import {
  Pool,
  FitnessCenter,
  LocalParking,
  Wifi,
  Restaurant,
  Spa,
  AcUnit,
  Pets,
  LocalLaundryService,
  Tv,
  Elevator,
  LocalBar,
  KingBed,
  Power,
  LocalDrink,
  Coffee,
  Desk,
  Work,
  Luggage,
  Bathroom,
  Opacity,
  LocalHotel,
  CheckCircle,
  RoomService,
  Security,
  Lock,
  LocalTaxi,
  DirectionsCar,
  BusinessCenter,
  Print,
  LocalGroceryStore,
  LocalHospital,
  LocalAtm,
  Iron,
} from "@mui/icons-material";

export const amenitiesConfig = [
  { key: "pool", name: "Swimming Pool", icon: Pool },
  { key: "gym", name: "Gym / Fitness Center", icon: FitnessCenter },
  { key: "parking", name: "Parking", icon: LocalParking },
  { key: "wifi", name: "Free Wi-Fi", icon: Wifi },
  { key: "restaurant", name: "Restaurant", icon: Restaurant },
  { key: "bar", name: "Bar / Lounge", icon: LocalBar },
  { key: "spa", name: "Spa", icon: Spa },
  { key: "ac", name: "Air Conditioning", icon: AcUnit },
  { key: "pets", name: "Pet Friendly", icon: Pets },
  { key: "laundry", name: "Laundry Service", icon: LocalLaundryService },
  { key: "tv", name: "Flat Screen TV", icon: Tv },
  { key: "elevator", name: "Elevator", icon: Elevator },
  { key: "bed", name: "Comfortable Bed", icon: KingBed },
  { key: "outlets", name: "Power Outlets Near Bed", icon: Power },
  { key: "drinkingWater", name: "Drinking Water Bottles", icon: LocalDrink },
  { key: "teaCoffee", name: "Tea / Coffee Maker", icon: Coffee },
  { key: "desk", name: "Desk & Chair", icon: Desk },
  { key: "luggageRack", name: "Luggage Rack", icon: Luggage },
  { key: "bathroom", name: "Attached Bathroom", icon: Bathroom },
  { key: "hotWater", name: "Hot & Cold Water", icon: Opacity },
  { key: "towels", name: "Fresh Towels", icon: LocalHotel },
  { key: "toiletries", name: "Basic Toiletries", icon: LocalGroceryStore },
  { key: "fastCheckin", name: "Quick Check-In & Out", icon: CheckCircle },
  { key: "housekeeping", name: "On-Demand Housekeeping", icon: RoomService },
  { key: "reception", name: "24x7 Reception", icon: Security },
  { key: "storage", name: "Luggage Storage", icon: Luggage },
  { key: "cabBooking", name: "Cab / Taxi Booking", icon: LocalTaxi },
  { key: "roomService", name: "In-Room Dining", icon: RoomService },
  { key: "miniFridge", name: "Mini Fridge", icon: LocalBar },
  {
    key: "complimentaryDrinks",
    name: "Complimentary Water / Tea / Coffee",
    icon: LocalDrink,
  },
  { key: "soundproof", name: "Soundproof Rooms", icon: Security },
  { key: "keycard", name: "Key Card Access", icon: Lock },
  { key: "cctv", name: "CCTV Security", icon: Security },
  { key: "secureBilling", name: "Secure Billing", icon: CheckCircle },
  { key: "privateParking", name: "Private Parking", icon: DirectionsCar },
  { key: "lounge", name: "Lounge / Waiting Area", icon: LocalBar },
  { key: "business", name: "Business Center", icon: BusinessCenter },
  { key: "printer", name: "Printer & Office Essentials", icon: Print },
  { key: "hygiene", name: "Hygiene Add-ons", icon: LocalHospital },
  { key: "blackoutCurtains", name: "Blackout Curtains", icon: LocalHotel },
  { key: "shower", name: "Good Shower", icon: Opacity },
  { key: "hairDryer", name: "Hair Dryer", icon: Spa },
  { key: "breakfast", name: "Complimentary Breakfast", icon: Restaurant },
  { key: "airportPickup", name: "Airport / Railway Pickup", icon: LocalTaxi },
  { key: "tourDesk", name: "Tour & Local Guide Desk", icon: Work },
  { key: "safe", name: "Digital Safe", icon: Lock },
  { key: "iron", name: "Iron & Ironing Board", icon: Iron },
  { key: "firstAid", name: "First Aid / Doctor On Call", icon: LocalHospital },
  { key: "atm", name: "ATM / Currency Exchange", icon: LocalAtm },
];

// Skeleton Loader for better UX during data fetching
const LoadingSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 animate-pulse">
    <div className="bg-gray-200 rounded-lg w-full h-96 mb-6"></div>
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="flex-1 space-y-4">
        <div className="bg-gray-200 rounded h-8 w-3/4"></div>
        <div className="bg-gray-200 rounded h-5 w-1/2"></div>
        <div className="bg-gray-200 rounded h-5 w-1/3"></div>
      </div>
      <div className="bg-gray-200 rounded-full h-10 w-24"></div>
    </div>
    <div className="mt-6 space-y-2">
      <div className="bg-gray-200 rounded h-4 w-full"></div>
      <div className="bg-gray-200 rounded h-4 w-full"></div>
      <div className="bg-gray-200 rounded h-4 w-5/6"></div>
    </div>
    <div className="mt-8 border-t pt-6">
      <div className="bg-gray-200 rounded h-6 w-1/4 mb-4"></div>
      <div className="flex space-x-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-2">
            <div className="bg-gray-200 rounded-full w-14 h-14"></div>
            <div className="bg-gray-200 rounded h-4 w-20"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Gallery Modal Component
const GalleryModal = ({ images, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  const changeImage = (index) => {
    if (index === currentIndex) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(false);
    }, 300);
  };

  const showPrev = () =>
    changeImage((currentIndex - 1 + images.length) % images.length);
  const showNext = () => changeImage((currentIndex + 1) % images.length);

  if (!images || images.length === 0) return null;
  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close gallery"
        >
          <CloseIcon sx={{ fontSize: { xs: 32, sm: 40 } }} />
        </button>

        <div className="relative overflow-hidden rounded-lg bg-black/50 aspect-video">
          <img
            src={currentImage.src}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
            alt={currentImage.caption}
          />
        </div>

        <div className="mt-3 text-white flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-medium text-sm sm:text-base">
            {currentImage.caption}
          </p>
          <p className="text-sm text-gray-300">{`${currentIndex + 1} of ${
            images.length
          }`}</p>
        </div>

        <button
          onClick={showPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeftIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
        </button>
        <button
          onClick={showNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Next image"
        >
          <ChevronRightIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
        </button>

        <div className="mt-4 flex space-x-2 overflow-x-auto py-2 px-1">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.thumbnail}
              onClick={() => changeImage(index)}
              className={`w-20 h-12 object-cover rounded cursor-pointer border-2 transition-all flex-shrink-0 ${
                currentIndex === index ? "border-white" : "border-transparent"
              } hover:border-white/70`}
              alt={image.caption}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Terms & Conditions Component
const TermsAndConditionsSection = ({ hotelName, privacyData }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const formatDescription = (desc) => {
    if (!desc) return "<ul></ul>";
    if (desc.includes("<ul")) return desc;
    const points = desc
      .split(/[\n.;]+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
    return `<ul>${points.map((p) => `<li>${p}</li>`).join("")}</ul>`;
  };

  return (
    <section className="py-6 border-b">
      <div className="flex items-center mb-4">
        <PolicyIcon className="text-green-600 mr-2" />
        <h2 className="text-xl font-semibold">Terms & Conditions</h2>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-green-800">
          <strong>Important:</strong> By booking at {hotelName}, you agree to
          comply with all hotel policies. Please review these terms carefully
          before making your reservation.
        </p>
      </div>

      <div className="space-y-4">
        {privacyData?.map((section) => (
          <div
            key={section.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left"
            >
              <div className="flex items-center">
                <PolicyIcon className="text-gray-600 mr-3" />
                <span className="font-medium text-gray-800">
                  {section.title}
                </span>
              </div>
              {expandedSections[section.id] ? (
                <ExpandLessIcon className="text-gray-600" />
              ) : (
                <ExpandMoreIcon className="text-gray-600" />
              )}
            </button>

            {expandedSections[section.id] && (
              <div
                className="px-4 py-3 bg-white border-t border-gray-200 text-sm text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: formatDescription(section.description),
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Policies may vary during special events or peak seasons</li>
          <li>• Contact front desk for clarifications or special requests</li>
          <li>• Terms subject to change without prior notice</li>
          <li>• Local laws and regulations take precedence</li>
        </ul>
      </div>
    </section>
  );
};

// HOURLY BOOKING POPUP COMPONENT
// const HourlyBookingPopup = ({ isOpen, onClose, hotelData, defaultImage }) => {
//   const [selectedHotel, setSelectedHotel] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [showPaymentDetails, setShowPaymentDetails] = useState(false);
//   const [showPaymentOptions, setShowPaymentOptions] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("online");
//   const [isBooking, setIsBooking] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);

//   const router = useRouter();
//   const searchDetails = useAppSelector(selectSearchDetails);
//   const userData = useAppSelector(selectUser);

//   // Load Razorpay script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//     return () => {
//       if (document.body.contains(script)) {
//         document.body.removeChild(script);
//       }
//     };
//   }, []);

//   // Reset states when popup closes
//   useEffect(() => {
//     if (!isOpen) {
//       setSelectedHotel(null);
//       setSelectedSlot(null);
//       setShowPaymentDetails(false);
//       setShowPaymentOptions(false);
//       setCurrentStep(1);
//     }
//   }, [isOpen]);

//   const selectedSlotDetails = selectedHotel?.room_hourly_rates?.find(
//     (slot) => slot.id === selectedSlot
//   );

//   const handleHotelSlotSelect = (hotel, slotId) => {
//     setSelectedHotel(hotel);
//     setSelectedSlot(slotId);
//     setShowPaymentDetails(true);
//     setCurrentStep(2);
//   };

//   const handleConfirmBooking = () => {
//     if (!selectedHotel || !selectedSlotDetails) {
//       toast.error("Please select a hotel and time slot");
//       return;
//     }

//     if (!userData) {
//       toast.error("Please log in to continue");
//       router.push("/login");
//       return;
//     }

//     setShowPaymentOptions(true);
//     setCurrentStep(3);
//   };

//   const handlePaymentMethodSelect = async (method) => {
//     setPaymentMethod(method);
//     setShowPaymentOptions(false);

//     if (method === "cash") {
//       await handleCashBooking();
//     } else {
//       await handleOnlinePayment();
//     }
//   };

//   const handleCashBooking = async () => {
//     setIsBooking(true);

//     const bookingPayload = {
//       hotel_id: selectedHotel?.id,
//       check_in_datetime: searchDetails.checkIn,
//       check_out_datetime: searchDetails.checkOut,
//       days: 1,
//       item_id: selectedSlot,
//       total_amount: selectedSlotDetails.rate_per_hour,
//       user_id: userData.id,
//       booking_type: "HOTEL",
//       amount: selectedSlotDetails.rate_per_hour,
//       order_type: "HOURS",
//       payment_method: "COD",
//       currency: "INR",
//       tax_amount: 0,
//       guest_count: 2,
//     };

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/order`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(bookingPayload),
//         }
//       );

//       const order = await response.json();
//       if (order.error) throw new Error(order.error);

//       toast.success(order.message || "Booking successful!");
//       onClose();
//       router.push("/thankyou");
//     } catch (err) {
//       toast.error(err.message || "Failed to create booking.");
//     } finally {
//       setIsBooking(false);
//     }
//   };

//   const handleOnlinePayment = async () => {
//     setIsBooking(true);

//     const bookingPayload = {
//       hotel_id: selectedHotel?.id,
//       check_in_datetime: searchDetails.checkIn,
//       check_out_datetime: searchDetails.checkOut,
//       days: 1,
//       item_id: selectedSlot,
//       total_amount: selectedSlotDetails.rate_per_hour,
//       user_id: userData.id,
//       booking_type: "HOTEL",
//       amount: selectedSlotDetails.rate_per_hour,
//       order_type: "HOURS",
//       currency: "INR",
//       tax_amount: 0,
//       guest_count: 2,
//     };

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/order`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(bookingPayload),
//         }
//       );
//       const order = await response.json();
//       if (order.error) throw new Error(order.error);

//       const options = {
//         key: order.data.key,
//         amount: order.data.amount,
//         currency: order.data.currency,
//         order_id: order.data.order_id,
//         name: selectedHotel?.name,
//         description: `Booking for HOURLY`,
//         handler: async function (response) {
//           const verify = await fetch(
//             `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/order/verify`,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 ...response,
//                 bill_id: order.data.bill_id,
//               }),
//             }
//           );
//           const result = await verify.json();
//           toast.success(result.message || "Payment Successful!");
//           onClose();
//           router.push("/thankyou");
//         },
//         prefill: {
//           name: `${userData.firstName} ${userData.lastName}`,
//           email: `${userData?.email}`,
//           contact: "892389389",
//         },
//         theme: { color: "#16A34A" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.on("payment.failed", (response) =>
//         toast.error("Payment failed: " + response.error.description)
//       );
//       rzp.open();
//     } catch (err) {
//       toast.error(err.message || "Failed to initiate payment.");
//     } finally {
//       setIsBooking(false);
//     }
//   };

//   const handleBackStep = () => {
//     if (currentStep === 3) {
//       setShowPaymentOptions(false);
//       setCurrentStep(2);
//     } else if (currentStep === 2) {
//       setShowPaymentDetails(false);
//       setCurrentStep(1);
//     }
//   };

//   const clearSelection = () => {
//     setSelectedHotel(null);
//     setSelectedSlot(null);
//     setShowPaymentDetails(false);
//     setShowPaymentOptions(false);
//     setCurrentStep(1);
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop Overlay */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300"
//         onClick={onClose}
//       />

//       {/* Centered Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-hidden flex flex-col mx-auto">
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
//             <div className="flex-1">
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//                 {currentStep === 1 && "Select Duration"}
//                 {currentStep === 2 && "Booking Details"}
//                 {currentStep === 3 && "Payment"}
//               </h2>

//               {/* Progress Indicators */}
//               <div className="flex items-center mt-2 space-x-1">
//                 {[1, 2, 3].map((step, index) => (
//                   <React.Fragment key={step}>
//                     <div
//                       className={`w-2 h-2 rounded-full transition-colors duration-300 ${
//                         step <= currentStep ? "bg-green-500" : "bg-gray-300"
//                       }`}
//                     />
//                     {index < 2 && (
//                       <div
//                         className={`w-4 h-0.5 transition-colors duration-300 ${
//                           step < currentStep ? "bg-green-500" : "bg-gray-300"
//                         }`}
//                       />
//                     )}
//                   </React.Fragment>
//                 ))}
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               {currentStep > 1 && (
//                 <button
//                   onClick={handleBackStep}
//                   className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-50 transition-colors"
//                 >
//                   Back
//                 </button>
//               )}
//               <button
//                 onClick={onClose}
//                 className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
//               >
//                 <FontAwesomeIcon
//                   icon={faTimes}
//                   className="text-gray-400 text-sm"
//                 />
//               </button>
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="flex-1 overflow-y-auto">
//             {/* Step 1: Hotel Selection */}
//             {currentStep === 1 && (
//               <div className="p-4 sm:p-6">
//                 {hotelData?.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="text-5xl mb-4">🏨</div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">
//                       No Hotels Available
//                     </h3>
//                     <p className="text-gray-600">
//                       Please adjust your search criteria.
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="space-y-4">
//                     {hotelData?.map((hotel) => (
//                       <div
//                         key={hotel.id}
//                         className="border border-gray-100 rounded-lg hover:border-green-200 transition-all duration-200 hover:shadow-sm"
//                       >
//                         <div className="p-4">
//                           {/* Hotel Layout */}
//                           <div className="flex flex-col sm:flex-row gap-4">
//                             {/* Hotel Image */}
//                             <div className="w-full sm:w-24 h-32 sm:h-20 flex-shrink-0">
//                               <img
//                                 src={
//                                   hotel?.hotel_images?.[0]?.image_url ||
//                                   defaultImage
//                                 }
//                                 alt={hotel.name}
//                                 className="w-full h-full object-cover rounded-md"
//                               />
//                             </div>

//                             <div className="flex-1">
//                               {/* Hotel Info */}
//                               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
//                                 <div className="flex-1">
//                                   <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
//                                     {hotel.name}
//                                   </h3>
//                                   <p className="text-sm text-gray-600 flex items-center mt-1">
//                                     <FontAwesomeIcon
//                                       icon={faMapMarkerAlt}
//                                       className="text-green-500 mr-1.5 w-3"
//                                     />
//                                     {hotel.city}
//                                   </p>
//                                 </div>
//                               </div>

//                               {/* Duration Options */}
//                               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
//                                 {hotel?.room_hourly_rates?.map((slot) => (
//                                   <button
//                                     key={slot.id}
//                                     onClick={() =>
//                                       handleHotelSlotSelect(hotel, slot.id)
//                                     }
//                                     className="p-3 border border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200 text-center group"
//                                   >
//                                     <div className="font-semibold text-gray-900 group-hover:text-green-600">
//                                       {slot.duration_hours}h
//                                     </div>
//                                     <div className="text-green-600 font-bold text-sm">
//                                       ₹{slot.rate_per_hour}
//                                     </div>
//                                   </button>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Step 2: Booking Summary */}
//             {currentStep === 2 && selectedHotel && selectedSlotDetails && (
//               <div className="p-6 sm:p-8 flex items-center justify-center min-h-[400px]">
//                 <div className="w-full max-w-sm">
//                   {/* Summary Card */}
//                   <div className="bg-gray-50 rounded-xl p-5 mb-6">
//                     <h3 className="font-semibold text-gray-900 mb-4 text-center">
//                       Booking Summary
//                     </h3>

//                     <div className="space-y-3">
//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Hotel</span>
//                         <span className="font-medium text-gray-900 text-right max-w-[60%] truncate">
//                           {selectedHotel.name}
//                         </span>
//                       </div>

//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Location</span>
//                         <span className="font-medium text-gray-900">
//                           {selectedHotel.city}
//                         </span>
//                       </div>

//                       <div className="flex justify-between items-center">
//                         <span className="text-gray-600">Duration</span>
//                         <span className="font-medium text-gray-900">
//                           {selectedSlotDetails.duration_hours} hours
//                         </span>
//                       </div>

//                       <div className="border-t border-gray-200 pt-3 mt-4">
//                         <div className="flex justify-between items-center">
//                           <span className="text-lg font-semibold text-gray-900">
//                             Total Amount
//                           </span>
//                           <span className="text-xl font-bold text-green-600">
//                             ₹{selectedSlotDetails.rate_per_hour}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="space-y-3">
//                     <button
//                       onClick={handleConfirmBooking}
//                       disabled={isBooking}
//                       className="w-full py-3.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 shadow-md hover:shadow-lg"
//                     >
//                       {isBooking ? (
//                         <div className="flex items-center justify-center">
//                           <FontAwesomeIcon
//                             icon={faSpinner}
//                             className="animate-spin mr-2"
//                           />
//                           Processing...
//                         </div>
//                       ) : (
//                         "Proceed to Payment"
//                       )}
//                     </button>

//                     <button
//                       onClick={clearSelection}
//                       className="w-full py-2.5 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                     >
//                       Change Selection
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Payment Options */}
//             {currentStep === 3 && showPaymentOptions && (
//               <div className="p-6 sm:p-8 flex items-center justify-center min-h-[400px]">
//                 <div className="w-full max-w-sm">
//                   <h3 className="font-semibold text-gray-900 mb-6 text-center text-lg">
//                     Choose Payment Method
//                   </h3>

//                   <div className="space-y-4">
//                     {/* Online Payment */}
//                     <button
//                       onClick={() => handlePaymentMethodSelect("online")}
//                       disabled={isBooking}
//                       className="w-full p-4 border border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 text-left disabled:opacity-50 shadow-sm hover:shadow-md"
//                     >
//                       <div className="flex items-center">
//                         <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
//                           <span className="text-xl">💳</span>
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">
//                             Pay Online
//                           </h4>
//                           <p className="text-sm text-gray-600">
//                             UPI, Card, Net Banking
//                           </p>
//                         </div>
//                       </div>
//                     </button>

//                     {/* Cash Payment */}
//                     <button
//                       onClick={() => handlePaymentMethodSelect("cash")}
//                       disabled={isBooking}
//                       className="w-full p-4 border border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 text-left disabled:opacity-50 shadow-sm hover:shadow-md"
//                     >
//                       <div className="flex items-center">
//                         <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
//                           <span className="text-xl">💵</span>
//                         </div>
//                         <div>
//                           <h4 className="font-semibold text-gray-900">
//                             Cash on Counter
//                           </h4>
//                           <p className="text-sm text-gray-600">
//                             Pay at hotel reception
//                           </p>
//                         </div>
//                       </div>
//                     </button>
//                   </div>

//                   {/* Loading State */}
//                   {isBooking && (
//                     <div className="text-center mt-6">
//                       <div className="flex items-center justify-center text-green-600">
//                         <FontAwesomeIcon
//                           icon={faSpinner}
//                           className="animate-spin mr-2 text-lg"
//                         />
//                         <span className="font-semibold">Processing...</span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// add dates

// HOURLY BOOKING POPUP COMPONENT - UPDATED
const HourlyBookingPopup = ({ isOpen, onClose, hotelData, defaultImage }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isBooking, setIsBooking] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // NEW: Add date/time states
  const [checkInDate, setCheckInDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");

  const router = useRouter();
  const searchDetails = useAppSelector(selectSearchDetails);
  const userData = useAppSelector(selectUser);

  // NEW: Get today's date for min validation
  const todayDate = useMemo(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }, []);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Reset states when popup closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedHotel(null);
      setSelectedSlot(null);
      setShowPaymentDetails(false);
      setShowPaymentOptions(false);
      setCurrentStep(1);
      // NEW: Reset date/time
      setCheckInDate("");
      setCheckInTime("");
    }
  }, [isOpen]);

  const selectedSlotDetails = selectedHotel?.room_hourly_rates?.find(
    (slot) => slot.id === selectedSlot
  );

  // NEW: Helper function to combine date and time
  const createCheckInDateTime = useCallback(() => {
    if (!checkInDate || !checkInTime) return null;
    try {
      const [hours, minutes] = checkInTime.split(":").map(Number);
      const date = new Date(checkInDate);
      date.setHours(hours, minutes, 0, 0);
      return date;
    } catch (e) {
      return null;
    }
  }, [checkInDate, checkInTime]);

  const handleHotelSlotSelect = (hotel, slotId) => {
    setSelectedHotel(hotel);
    setSelectedSlot(slotId);
    setShowPaymentDetails(true);
    setCurrentStep(2);
  };

  // UPDATED: Add date/time validation
  const handleConfirmBooking = () => {
    if (!selectedHotel || !selectedSlotDetails) {
      toast.error("Please select a hotel and time slot");
      return;
    }

    // NEW: Validate date and time
    if (!checkInDate) {
      toast.error("Please select a check-in date");
      return;
    }

    if (!checkInTime) {
      toast.error("Please select a check-in time");
      return;
    }

    if (checkInDate < todayDate) {
      toast.error("Check-in date cannot be in the past");
      return;
    }

    const checkInDateTime = createCheckInDateTime();
    if (!checkInDateTime) {
      toast.error("Invalid check-in date or time");
      return;
    }

    if (!userData) {
      toast.error("Please log in to continue");
      router.push("/login");
      return;
    }

    setShowPaymentOptions(true);
    setCurrentStep(3);
  };

  const handlePaymentMethodSelect = async (method) => {
    setPaymentMethod(method);
    setShowPaymentOptions(false);

    if (method === "cash") {
      await handleCashBooking();
    } else {
      await handleOnlinePayment();
    }
  };

  // UPDATED: Use selected date/time in booking payload
  const handleCashBooking = async () => {
    setIsBooking(true);

    const checkInDateTime = createCheckInDateTime();

    const bookingPayload = {
      hotel_id: selectedHotel?.id,
      check_in_datetime: checkInDateTime, // NEW: Use selected date/time
      check_out_datetime: new Date(searchDetails?.checkOut || checkInDateTime),
      chck_in_hours: checkInTime, // NEW: Send time as string
      days: 1,
      item_id: selectedSlot,
      total_amount: selectedSlotDetails.rate_per_hour,
      user_id: userData.id,
      booking_type: "HOTEL",
      amount: selectedSlotDetails.rate_per_hour,
      order_type: "HOURS",
      payment_method: "COD",
      currency: "INR",
      tax_amount: 0,
      guest_count: 2,
      duration_hours: selectedSlotDetails.duration_hours,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingPayload),
        }
      );

      const order = await response.json();
      if (order.error) throw new Error(order.error);

      toast.success(order.message || "Booking successful!");
      onClose();
      router.push("/thankyou");
    } catch (err) {
      toast.error(err.message || "Failed to create booking.");
    } finally {
      setIsBooking(false);
    }
  };

  // UPDATED: Use selected date/time in booking payload
  const handleOnlinePayment = async () => {
    setIsBooking(true);

    const checkInDateTime = createCheckInDateTime();

    const bookingPayload = {
      hotel_id: selectedHotel?.id,
      check_in_datetime: checkInDateTime, // NEW: Use selected date/time
      check_out_datetime: new Date(searchDetails?.checkOut || checkInDateTime),
      chck_in_hours: checkInTime, // NEW: Send time as string
      days: 1,
      item_id: selectedSlot,
      total_amount: selectedSlotDetails.rate_per_hour,
      user_id: userData.id,
      booking_type: "HOTEL",
      amount: selectedSlotDetails.rate_per_hour,
      order_type: "HOURS",
      currency: "INR",
      tax_amount: 0,
      guest_count: 2,
      duration_hours: selectedSlotDetails.duration_hours,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingPayload),
        }
      );
      const order = await response.json();
      if (order.error) throw new Error(order.error);

      const options = {
        key: order.data.key,
        amount: order.data.amount,
        currency: order.data.currency,
        order_id: order.data.order_id,
        name: selectedHotel?.name,
        description: `Booking for HOURLY`,
        handler: async function (response) {
          const verify = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/order/verify`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                bill_id: order.data.bill_id,
              }),
            }
          );
          const result = await verify.json();
          toast.success(result.message || "Payment Successful!");
          onClose();
          router.push("/thankyou");
        },
        prefill: {
          name: `${userData.firstName} ${userData.lastName}`,
          email: `${userData?.email}`,
          contact: "892389389",
        },
        theme: { color: "#16A34A" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) =>
        toast.error("Payment failed: " + response.error.description)
      );
      rzp.open();
    } catch (err) {
      toast.error(err.message || "Failed to initiate payment.");
    } finally {
      setIsBooking(false);
    }
  };

  const handleBackStep = () => {
    if (currentStep === 3) {
      setShowPaymentOptions(false);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setShowPaymentDetails(false);
      setCurrentStep(1);
    }
  };

  const clearSelection = () => {
    setSelectedHotel(null);
    setSelectedSlot(null);
    setShowPaymentDetails(false);
    setShowPaymentOptions(false);
    setCurrentStep(1);
    // NEW: Reset date/time
    setCheckInDate("");
    setCheckInTime("");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Centered Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-hidden flex flex-col mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {currentStep === 1 && "Select Duration"}
                {currentStep === 2 && "Booking Details"}
                {currentStep === 3 && "Payment"}
              </h2>

              {/* Progress Indicators */}
              <div className="flex items-center mt-2 space-x-1">
                {[1, 2, 3].map((step, index) => (
                  <React.Fragment key={step}>
                    <div
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        step <= currentStep ? "bg-green-500" : "bg-gray-300"
                      }`}
                    />
                    {index < 2 && (
                      <div
                        className={`w-4 h-0.5 transition-colors duration-300 ${
                          step < currentStep ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {currentStep > 1 && (
                <button
                  onClick={handleBackStep}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-gray-400 text-sm"
                />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Step 1: Hotel Selection - UNCHANGED */}
            {currentStep === 1 && (
              <div className="p-4 sm:p-6">
                {hotelData?.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-5xl mb-4">🏨</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No Hotels Available
                    </h3>
                    <p className="text-gray-600">
                      Please adjust your search criteria.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {hotelData?.map((hotel) => (
                      <div
                        key={hotel.id}
                        className="border border-gray-100 rounded-lg hover:border-green-200 transition-all duration-200 hover:shadow-sm"
                      >
                        <div className="p-4">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-24 h-32 sm:h-20 flex-shrink-0">
                              <img
                                src={
                                  hotel?.hotel_images?.[0]?.image_url ||
                                  defaultImage
                                }
                                alt={hotel.name}
                                className="w-full h-full object-cover rounded-md"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                                    {hotel.name}
                                  </h3>
                                  <p className="text-sm text-gray-600 flex items-center mt-1">
                                    <FontAwesomeIcon
                                      icon={faMapMarkerAlt}
                                      className="text-green-500 mr-1.5 w-3"
                                    />
                                    {hotel.city}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                                {hotel?.room_hourly_rates?.map((slot) => (
                                  <button
                                    key={slot.id}
                                    onClick={() =>
                                      handleHotelSlotSelect(hotel, slot.id)
                                    }
                                    className="p-3 border border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200 text-center group"
                                  >
                                    <div className="font-semibold text-gray-900 group-hover:text-green-600">
                                      {slot.duration_hours}h
                                    </div>
                                    <div className="text-green-600 font-bold text-sm">
                                      ₹{slot.rate_per_hour}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Booking Summary - UPDATED with date/time fields */}
            {currentStep === 2 && selectedHotel && selectedSlotDetails && (
              <div className="p-6 sm:p-8 flex items-center justify-center min-h-[400px]">
                <div className="w-full max-w-sm">
                  {/* NEW: Check-in Date and Time Selection */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                      Check-in Details
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">
                          Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          min={todayDate}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-1">
                          Time <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="time"
                          value={checkInTime}
                          onChange={(e) => setCheckInTime(e.target.value)}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          required
                        />
                      </div>
                    </div>
                    {(!checkInDate || !checkInTime) && (
                      <p className="text-sm text-blue-600 mt-2">
                        Please select both date and time to continue
                      </p>
                    )}
                  </div>

                  {/* Summary Card - UNCHANGED */}
                  <div className="bg-gray-50 rounded-xl p-5 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4 text-center">
                      Booking Summary
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Hotel</span>
                        <span className="font-medium text-gray-900 text-right max-w-[60%] truncate">
                          {selectedHotel.name}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Location</span>
                        <span className="font-medium text-gray-900">
                          {selectedHotel.city}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium text-gray-900">
                          {selectedSlotDetails.duration_hours} hours
                        </span>
                      </div>

                      <div className="border-t border-gray-200 pt-3 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">
                            Total Amount
                          </span>
                          <span className="text-xl font-bold text-green-600">
                            ₹{selectedSlotDetails.rate_per_hour}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons - UPDATED with validation */}
                  <div className="space-y-3">
                    <button
                      onClick={handleConfirmBooking}
                      disabled={isBooking || !checkInDate || !checkInTime}
                      className={`w-full py-3.5 font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg ${
                        checkInDate && checkInTime && !isBooking
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {isBooking ? (
                        <div className="flex items-center justify-center">
                          <FontAwesomeIcon
                            icon={faSpinner}
                            className="animate-spin mr-2"
                          />
                          Processing...
                        </div>
                      ) : !checkInDate || !checkInTime ? (
                        "Select Date & Time to Continue"
                      ) : (
                        "Proceed to Payment"
                      )}
                    </button>

                    <button
                      onClick={clearSelection}
                      className="w-full py-2.5 text-gray-600 hover:text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Change Selection
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment Options - UNCHANGED */}
            {currentStep === 3 && showPaymentOptions && (
              <div className="p-6 sm:p-8 flex items-center justify-center min-h-[400px]">
                <div className="w-full max-w-sm">
                  <h3 className="font-semibold text-gray-900 mb-6 text-center text-lg">
                    Choose Payment Method
                  </h3>

                  <div className="space-y-4">
                    <button
                      onClick={() => handlePaymentMethodSelect("online")}
                      disabled={isBooking}
                      className="w-full p-4 border border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 text-left disabled:opacity-50 shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-xl">💳</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Pay Online
                          </h4>
                          <p className="text-sm text-gray-600">
                            UPI, Card, Net Banking
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePaymentMethodSelect("cash")}
                      disabled={isBooking}
                      className="w-full p-4 border border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-200 text-left disabled:opacity-50 shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-xl">💵</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            Cash on Counter
                          </h4>
                          <p className="text-sm text-gray-600">
                            Pay at hotel reception
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {isBooking && (
                    <div className="text-center mt-6">
                      <div className="flex items-center justify-center text-green-600">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin mr-2 text-lg"
                        />
                        <span className="font-semibold">Processing...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// --- MAIN COMPONENT ---
const HotelDetailsComponent = ({ params }) => {
  const [hotel, setHotel] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  // ADD HOURLY BOOKING STATE
  const [isHourlyBookingOpen, setIsHourlyBookingOpen] = useState(false);

  const router = useRouter();
  const {
    isError: isHotelError,
    isLoading: isHotelLoading,
    data: hotelData,
    error: hotelError,
    mutate: fetchHotel,
  } = useFindHotel();

  useEffect(() => {
    if (params) {
      fetchHotel({ params });
    }
  }, [params, fetchHotel]);

  useEffect(() => {
    if (isHotelError && !isHotelLoading) {
      toast.error(
        hotelError instanceof Error ? hotelError.message : "An error occurred"
      );
      router.push("/login");
    }
    if (hotelData?.data) {
      setHotel(hotelData.data);
    }
  }, [isHotelError, isHotelLoading, hotelError, hotelData, router]);

  const galleryImages =
    hotel?.hotel_images?.map((img) => ({
      src: img.image_url,
      thumbnail: img.image_url,
      caption: img.caption || hotel.name,
    })) || [];

  const defaultImage =
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  if (isHotelLoading) {
    return <LoadingSkeleton />;
  }
  console.log("gallary image is heree----------");
  console.log(galleryImages);

  if (isHotelError || !hotel) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <div>
          <h2 className="text-2xl font-semibold text-red-600">
            Failed to load hotel details.
          </h2>
          <p className="text-gray-600 mt-2">
            Please try again later or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Hero Image */}
        <div className="relative mb-6">
          <div className="w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg">
            <img
              src={hotel.hotel_images?.[0]?.image_url || defaultImage}
              alt={`${hotel.name} main view`}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-white transition-all shadow-md"
          >
            <ImageIcon className="mr-2 text-base" /> Show All Photos
          </button>
        </div>

        {/* Hotel Header */}
        <section className="py-6 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                {hotel.name}
              </h1>
              <div className="mt-2 space-y-1 text-gray-600">
                <p className="flex items-center">
                  <LocationOnIcon className="text-green-500 mr-2" />
                  {hotel.address}, {hotel.city}, India
                </p>
                <p className="flex items-center">
                  <PhoneIcon className="text-green-500 mr-2 h-4 w-4" />
                  {hotel.phone}
                </p>
                <p className="flex items-center">
                  <EmailIcon className="text-green-500 mr-2" />
                  {hotel.email || "Info@revourhotels.com"}
                </p>
              </div>
            </div>
          </div>
          <p className="text-base text-gray-700 mt-4">{hotel.description}</p>
        </section>

        {/* Amenities Section */}
        <section className="py-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Amenities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {hotel?.Amenity?.map((apiAmenity, index) => {
              const matched = amenitiesConfig.find(
                (cfg) =>
                  cfg.key.toLowerCase() ===
                  apiAmenity.name.toLowerCase().replace(/\s+/g, "")
              );

              if (!matched) return null;

              const Icon = matched.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-green-50 p-2 rounded-full">
                    <Icon className="text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {matched.name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Rooms Section */}
        <section className="py-6 border-b">
          {hotel.room_types && hotel.room_types.length > 0 && (
            <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
          )}

          <div className="space-y-6">
            {hotel.room_types && hotel.room_types.length > 0 ? (
              hotel.room_types.map((room, index) => (
                <div
                  key={room.id}
                  className="border border-gray-200 rounded-lg hover:shadow-lg transition-shadow overflow-hidden flex flex-col sm:flex-row"
                >
                  <div className="w-full sm:w-1/3 flex-shrink-0">
                    <img
                      src={galleryImages[index + 1]?.src || defaultImage}
                      alt={room.type_name}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {room.type_name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {room.description}
                        </p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <p className="text-xl font-bold text-green-600">
                          ₹{room.base_price}
                          <span className="text-sm font-normal text-gray-500">
                            /night
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {room.taxes || "includes taxes & fees"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        { icon: WifiIcon, text: "Free WiFi" },
                        { icon: AcUnitIcon, text: "AC" },
                        { icon: TvIcon, text: "TV" },
                      ].map((feature, fIndex) => (
                        <span
                          key={fIndex}
                          className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center"
                        >
                          <feature.icon className="text-green-500 mr-1 text-sm" />{" "}
                          {feature.text}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <button
                        onClick={() => setIsGalleryOpen(true)}
                        className="text-green-600 text-sm font-medium flex items-center hover:underline"
                      >
                        <ImageIcon className="mr-1 text-base" /> View Photos
                      </button>
                      <button
                        onClick={() => router.push(`/order/${room.id}`)}
                        className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Select Room
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="hidden lg:block text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-6xl mb-4">🏨</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Room Types Available
                </h3>
                <p className="text-gray-600 mb-6">
                  This hotel doesn't have traditional room bookings available.
                </p>

                {/* Show Hourly Booking Option if available */}
                {hotel?.room_hourly_rates &&
                  hotel.room_hourly_rates.length > 0 && (
                    <div className="flex justify-center">
                      <button
                        onClick={() => setIsHourlyBookingOpen(true)}
                        className="bg-blue-600 text-white text-sm font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <AccessTimeIcon className="w-4 h-4" />
                        Book Hourly Instead
                      </button>
                    </div>
                  )}
              </div>
            )}
          </div>
        </section>

        {/* Guest Reviews Section */}
        <section className="py-6 border-b">
          <h2 className="text-xl font-semibold mb-4">Guest Reviews</h2>
          <div className="space-y-6">
            {[
              {
                name: "Samantha Carter",
                date: "2 days ago",
                rating: 5,
                review:
                  "What a stunning hotel! The staff were incredibly welcoming and helpful. Room service was prompt and delicious. Highly recommend for anyone traveling to the city.",
              },
              {
                name: "Jean Barret",
                date: "1 week ago",
                rating: 4,
                review:
                  "The Grand Budapest is always top-notch. Historic architecture, cozy beds, and top-class food. Only minor issue: slow Wi-Fi.",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">{review.name}</p>
                    <p className="text-xs text-gray-500">
                      Verified Stay • {review.date}
                    </p>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{review.review}</p>
              </div>
            ))}
            <button className="w-full border border-gray-300 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Show All Reviews
            </button>
          </div>
        </section>

        {/* Terms & Conditions Section */}
        <TermsAndConditionsSection
          hotelName={hotel.name}
          privacyData={hotel?.PrivacyPolicy}
        />

        {/* Location Section */}
        <section className="py-6">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <div className="w-full rounded-lg overflow-hidden shadow-sm aspect-video">
            <iframe
              title="Google Map Location"
              src={`https://maps.google.com/maps?q=${
                hotel.latitude || 28.6139
              },${hotel.longitude || 77.209}&hl=en&z=14&output=embed`}
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="border-0"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
            {[
              { icon: SubwayIcon, text: "500m to metro station" },
              { icon: RestaurantIcon, text: "Multiple restaurants nearby" },
              { icon: AccountBalanceIcon, text: "1km to city center" },
              { icon: FlightIcon, text: "15km to airport" },
            ].map((item, index) => (
              <div key={index} className="flex items-center text-sm">
                <item.icon className="text-gray-400 mr-2" />
                {item.text}
              </div>
            ))}
          </div>
        </section>

        {/* Minimal Clean Design - Recommended */}
        <div className="lg:hidden sticky bottom-0 bg-white border-t border-gray-200 -mx-4 -mb-6 px-4 py-3 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            {/* Price Info */}
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900"></span>
              <span className="text-xs text-gray-500"></span>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              {/* Conditional Hourly Button */}
              {hotel?.room_hourly_rates &&
                hotel.room_hourly_rates.length > 0 && (
                  <button
                    onClick={() => setIsHourlyBookingOpen(true)}
                    className="bg-blue-600 text-white text-sm font-medium py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                  >
                    <AccessTimeIcon className="w-4 h-4" />
                    Hourly
                  </button>
                )}
            </div>
          </div>
        </div>
      </main>

      {/* Gallery Modal */}
      {isGalleryOpen && (
        <GalleryModal
          images={galleryImages}
          startIndex={0}
          onClose={() => setIsGalleryOpen(false)}
        />
      )}

      {/* ADD HOURLY BOOKING POPUP */}
      <HourlyBookingPopup
        isOpen={isHourlyBookingOpen}
        onClose={() => setIsHourlyBookingOpen(false)}
        hotelData={hotel?.room_hourly_rates ? [hotel] : []}
        defaultImage={defaultImage}
      />
    </>
  );
};

export default HotelDetailsComponent;
