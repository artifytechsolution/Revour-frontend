// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faStar,
//   faMapMarkerAlt,
//   faPhone,
//   faEnvelope,
// } from "@fortawesome/free-solid-svg-icons";
// import { useRouter } from "next/navigation";
// import Autoplay from "embla-carousel-autoplay";
// import { useHourlyHotel } from "@src/hooks/apiHooks";
// import toast from "react-hot-toast";
// import Link from "next/link";

// const BookingPage = () => {
//   const hotels = [
//     {
//       id: 1,
//       name: "Business Hub Suites",
//       location: "Financial District",
//       address: "123 Wall St, New York, NY 10005",
//       phone: "+1-555-123-4567",
//       email: "contact@businesshubsuites.com",
//       rating: 4.8,
//       price: 65,
//       description:
//         "Premium workspaces with high-speed internet, ergonomic seating, and professional meeting facilities.",
//     },
//     {
//       id: 2,
//       name: "Cityscape Retreat",
//       location: "Downtown",
//       address: "456 Main St, New York, NY 10001",
//       phone: "+1-555-234-5678",
//       email: "info@cityscaperetreat.com",
//       rating: 4.5,
//       price: 55,
//       description:
//         "Modern rooms with panoramic city views and top-tier amenities for short stays.",
//     },
//     {
//       id: 3,
//       name: "Urban Oasis",
//       location: "Midtown",
//       address: "789 Park Ave, New York, NY 10017",
//       phone: "+1-555-345-6789",
//       email: "book@urbanoasis.com",
//       rating: 4.7,
//       price: 70,
//       description: "Tranquil spaces designed for focused work and relaxation.",
//     },
//     {
//       id: 4,
//       name: "Metro Suites",
//       location: "Central Business District",
//       address: "101 Broadway, New York, NY 10006",
//       phone: "+1-555-456-7890",
//       email: "reservations@metrosuites.com",
//       rating: 4.3,
//       price: 50,
//       description:
//         "Affordable hourly rentals with essential business amenities.",
//     },
//     {
//       id: 5,
//       name: "Skyline Pods",
//       location: "Uptown",
//       address: "202 Riverside Dr, New York, NY 10025",
//       phone: "+1-555-567-8901",
//       email: "support@skylinepods.com",
//       rating: 4.6,
//       price: 60,
//       description: "Compact, modern pods for efficient business stops.",
//     },
//     {
//       id: 6,
//       name: "Executive Haven",
//       location: "Tech Park",
//       address: "303 Innovation Blvd, New York, NY 10022",
//       phone: "+1-555-678-9012",
//       email: "exec@executivehaven.com",
//       rating: 4.9,
//       price: 80,
//       description:
//         "Luxury suites with premium facilities for discerning professionals.",
//     },
//     {
//       id: 7,
//       name: "Work & Rest Inn",
//       location: "East Side",
//       address: "404 1st Ave, New York, NY 10010",
//       phone: "+1-555-789-0123",
//       email: "info@workrestinn.com",
//       rating: 4.4,
//       price: 45,
//       description: "Cozy and affordable rooms for short-term work and rest.",
//     },
//     {
//       id: 8,
//       name: "Nexus Rooms",
//       location: "West End",
//       address: "505 Columbus Ave, New York, NY 10024",
//       phone: "+1-555-890-1234",
//       email: "book@nexusrooms.com",
//       rating: 4.2,
//       price: 52,
//       description:
//         "Functional spaces with reliable Wi-Fi and comfortable seating.",
//     },
//     {
//       id: 9,
//       name: "Core Business Suites",
//       location: "North District",
//       address: "606 Lexington Ave, New York, NY 10065",
//       phone: "+1-555-901-2345",
//       email: "contact@corebusinesssuites.com",
//       rating: 4.7,
//       price: 68,
//       description:
//         "Spacious suites optimized for team meetings and productivity.",
//     },
//     {
//       id: 10,
//       name: "Pulse Workspaces",
//       location: "South Quarter",
//       address: "707 Houston St, New York, NY 10014",
//       phone: "+1-555-012-3456",
//       email: "pulse@pulseworkspaces.com",
//       rating: 4.5,
//       price: 58,
//       description: "Vibrant, modern workspaces for dynamic professionals.",
//     },
//   ];

//   const [selectedHotel, setSelectedHotel] = useState(null);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const router = useRouter();
//   const [hourlyHotelList, setHourlyHotelList] = useState([]);
//   const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
//   const defaultImage =
//     "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

//   const { isError, isLoading, data, error, mutate } = useHourlyHotel();

//   useEffect(() => {
//     if (isError && !isLoading) {
//       toast.error(error instanceof Error ? error.message : "An error occurred");
//       router.push("/login");
//     }
//     if (Array.isArray(data?.data.hotels)) {
//       setHourlyHotelList(data.data.hotels);
//     } else {
//       setHourlyHotelList(hotels?.data?.hotels); // Fallback to static data
//     }
//   }, [isError, isLoading, error, data, router]);

//   useEffect(() => {
//     mutate({
//       limit: 2,
//     }); // Triggers the mutation on mount
//   }, [mutate]);

//   const handleSelect = (hotel, slot) => {
//     setSelectedHotel(hotel);
//     setSelectedSlot(slot);
//   };

//   const filteredHotels =
//     filter === "all"
//       ? hourlyHotelList
//       : hourlyHotelList.filter((hotel) => hotel.price <= parseInt(filter));

//   console.log("hourly list data is herererereree---------");
//   console.log(hourlyHotelList);
//   console.log("rooms dataatatat----");
//   console.log(filteredHotels);

//   console.log("selected hotel data is herererer----");
//   console.log(selectedHotel);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Main Content */}
//       <div className=" FUNDED! max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
//         {/* Filter Section */}
//         {/* <div className="mb-8 flex flex-wrap gap-3">
//           {["all", "50", "60", "70"].map((price) => (
//             <button
//               key={price}
//               onClick={() => setFilter(price)}
//               className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition ${
//                 filter === price
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               {price === "all" ? "All" : `Under $${price}`}
//             </button>
//           ))}
//         </div> */}

//         {/* Main Layout */}
//         <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
//           {/* Hotel List */}
//           <div className="lg:col-span-2 space-y-6 px-4 sm:px-0">
//             {filteredHotels?.length === 0 ? (
//               <div className="text-center py-12 bg-gray-50 rounded-xl">
//                 <p className="text-gray-500 text-lg font-medium animate-pulse">
//                   No hotels match your filters. Try adjusting your search.
//                 </p>
//               </div>
//             ) : (
//               filteredHotels?.map((hotel) => (
//                 <div
//                   key={hotel.id}
//                   className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//                 >
//                   {/* Image Section */}
//                   <Link href="/hoteldetails">
//                     <div className="relative group">
//                       <img
//                         src={defaultImage}
//                         alt={hotel.name}
//                         className="w-full h-48 sm:h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
//                       />
//                       <div className="absolute top-4 left-4 flex space-x-3">
//                         <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
//                           Hourly Booking
//                         </span>
//                         <span className="bg-white text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center shadow-sm">
//                           <FontAwesomeIcon
//                             icon={faStar}
//                             className="mr-1.5 text-yellow-400"
//                           />
//                           {hotel.star_rating}
//                         </span>
//                       </div>
//                     </div>
//                   </Link>

//                   {/* Content Section */}
//                   <div className="p-6 sm:p-8">
//                     <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
//                       {/* Hotel Info */}
//                       <div className="space-y-3">
//                         <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
//                           {hotel.name}
//                         </h2>
//                         <div className="space-y-2 text-gray-600">
//                           <p className="flex items-center text-sm sm:text-base">
//                             <FontAwesomeIcon
//                               icon={faMapMarkerAlt}
//                               className="text-blue-500 mr-2.5 w-4"
//                             />
//                             {hotel.address} {","}
//                             {hotel.city} {","}
//                             {hotel.country}
//                           </p>

//                           <p className="flex items-center text-sm sm:text-base">
//                             <FontAwesomeIcon
//                               icon={faPhone}
//                               className="text-blue-500 mr-2.5 w-4"
//                             />
//                             {hotel.phone}
//                           </p>
//                           <p className="flex items-center text-sm sm:text-base">
//                             <FontAwesomeIcon
//                               icon={faEnvelope}
//                               className="text-blue-500 mr-2.5 w-4"
//                             />
//                             {hotel.email}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Description */}
//                     {/* <div className="mt-6">
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         About
//                       </h3>
//                       <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
//                         {hotel.description}
//                       </p>
//                     </div> */}

//                     {/* Time Slots */}
//                     <div className="mt-8">
//                       <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                         Available Time Slots
//                       </h3>
//                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                         {hotel?.room_hourly_rates?.map((slot, index) => (
//                           <button
//                             key={slot.id}
//                             onClick={() =>
//                               handleSelect(
//                                 {
//                                   ...(typeof hotel === "object" &&
//                                   hotel !== null
//                                     ? hotel
//                                     : {}),
//                                   main_id: index,
//                                 },
//                                 slot.id
//                               )
//                             }
//                             className="px-4 py-2.5 rounded-lg bg-blue-50 text-blue-700 font-medium text-sm hover:bg-blue-100 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                           >
//                             {slot.duration_hours} hours
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 sticky top-6 border border-gray-100">
//               <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
//                 Your Booking
//               </h3>
//               {selectedHotel ? (
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between border-b border-gray-200 pb-3">
//                     <span className="text-sm sm:text-base font-medium text-gray-700">
//                       Hotel
//                     </span>
//                     <span className="text-sm sm:text-base text-gray-900 font-semibold">
//                       {selectedHotel.name}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b border-gray-200 pb-3">
//                     <span className="text-sm sm:text-base font-medium text-gray-700">
//                       Location
//                     </span>
//                     <span className="text-sm sm:text-base text-gray-900 font-semibold">
//                       {selectedHotel.city}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b border-gray-200 pb-3">
//                     <span className="text-sm sm:text-base font-medium text-gray-700">
//                       Address
//                     </span>
//                     <span className="text-sm sm:text-base text-gray-900 font-semibold">
//                       {selectedHotel.address}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b border-gray-200 pb-3">
//                     <span className="text-sm sm:text-base font-medium text-gray-700">
//                       Phone
//                     </span>
//                     <span className="text-sm sm:text-base text-gray-900 font-semibold">
//                       {selectedHotel.phone}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b border-gray-200 pb-3">
//                     <span className="text-sm sm:text-base font-medium text-gray-700">
//                       Email
//                     </span>
//                     <span className="text-sm sm:text-base text-gray-900 font-semibold">
//                       {selectedHotel.email}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between border-b border-gray-200 pb-3">
//                     <span className="text-sm sm:text-base font-medium text-gray-700">
//                       Duration
//                     </span>
//                     <span className="text-sm sm:text-base text-gray-900 font-semibold">
//                       {
//                         selectedHotel?.room_hourly_rates[selectedHotel.main_id]
//                           ?.duration_hours
//                       }{" "}
//                       hours
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between pb-3">
//                     <span className="text-sm sm:text-base font-medium text-gray-700">
//                       Price
//                     </span>
//                     <span className="text-sm sm:text-base text-blue-600 font-bold">
//                       $
//                       {
//                         selectedHotel?.room_hourly_rates[selectedHotel.main_id]
//                           ?.rate_per_hour
//                       }
//                       /hour
//                     </span>
//                   </div>
//                   <button className="w-full mt-6 py-3 rounded-lg bg-blue-600 text-white font-semibold text-sm sm:text-base hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
//                     Confirm Booking
//                   </button>
//                 </div>
//               ) : (
//                 <div className="text-center py-8">
//                   <p className="text-gray-600 text-sm sm:text-base font-medium">
//                     Select a hotel and time slot to book
//                   </p>
//                   <p className="text-gray-400 text-xs sm:text-sm mt-2">
//                     Choose from our premium hourly workspaces
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;

//final

"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faSpinner,
  faFilter,
  faSearch,
  faTimes, // Add this import for close icon
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { useHourlyHotel } from "@src/hooks/apiHooks";
import toast from "react-hot-toast";
import Link from "next/link";
// ADD THESE IMPORTS FOR PAYMENT
import { useAppSelector } from "@src/redux/store";
import { selectSearchDetails, selectUser } from "@src/redux/reducers/authSlice";

const BookingPage = () => {
  // Enhanced state management
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // ADD MOBILE BOOKING POPUP STATE
  const [showMobileBookingPopup, setShowMobileBookingPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ADD PAYMENT STATES
  const [isBooking, setIsBooking] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");

  // Pagination and infinite scroll states
  const [allHotels, setAllHotels] = useState([]);
  const [displayedHotels, setDisplayedHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const router = useRouter();
  const [hourlyHotelList, setHourlyHotelList] = useState([]);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const observerRef = useRef();
  const ITEMS_PER_PAGE = 6;
  const searchDetails = useAppSelector(selectSearchDetails);
  const userData = useAppSelector(selectUser);

  // ADD USER SELECTOR
  const user = useAppSelector(selectUser);

  const defaultImage =
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  const { isError, isLoading, data, error, mutate } = useHourlyHotel();

  // ADD MOBILE DETECTION FUNCTION
  const checkIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind
  }, []);

  // ADD RESIZE LISTENER FOR MOBILE DETECTION
  useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [checkIsMobile]);

  // ADD RAZORPAY SCRIPT LOADING
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

  // Memoized filtered hotels with search and price filter
  const filteredHotels = useMemo(() => {
    let filtered = allHotels;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (hotel) =>
          hotel.name?.toLowerCase().includes(query) ||
          hotel.location?.toLowerCase().includes(query) ||
          hotel.city?.toLowerCase().includes(query)
      );
    }

    // Apply price filter
    if (filter !== "all") {
      const maxPrice = parseInt(filter);
      filtered = filtered.filter((hotel) => {
        const rates = hotel.room_hourly_rates || [];
        return rates.some((rate) => rate.rate_per_hour <= maxPrice);
      });
    }

    return filtered;
  }, [allHotels, filter, searchQuery]);

  // API data handling - NO static data fallback
  useEffect(() => {
    if (isError && !isLoading) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      console.error("API Error:", error);
    }

    // Only use API data
    if (data?.data?.hotels && Array.isArray(data.data.hotels)) {
      setAllHotels(data.data.hotels);
      setHourlyHotelList(data.data.hotels);
    } else if (data?.data && Array.isArray(data.data)) {
      setAllHotels(data.data);
      setHourlyHotelList(data.data);
    } else if (!isLoading && !isError) {
      setAllHotels([]);
      setHourlyHotelList([]);
    }
  }, [isError, isLoading, error, data]);

  // Handle pagination and filtering
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const paginatedData = filteredHotels.slice(startIndex, endIndex);

    setDisplayedHotels(paginatedData);
    setHasMore(paginatedData.length < filteredHotels.length);
    setIsLoadingMore(false);
  }, [currentPage, filteredHotels]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
    setSelectedHotel(null);
    setSelectedSlot(null);
    // Close mobile popup when filters change
    setShowMobileBookingPopup(false);
  }, [filter, searchQuery]);

  // API call
  useEffect(() => {
    mutate({
      limit: 50,
    });
  }, [mutate]);

  // Infinite scroll logic
  const loadMoreHotels = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev + 1);
    }, 500);
  }, [isLoadingMore, hasMore]);

  // Intersection Observer for infinite scroll
  const lastHotelElementRef = useCallback(
    (node) => {
      if (isLoading || isLoadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadMoreHotels();
          }
        },
        { threshold: 0.1, rootMargin: "50px" }
      );

      if (node) observerRef.current.observe(node);
    },
    [isLoading, isLoadingMore, hasMore, loadMoreHotels]
  );

  // MODIFIED HANDLER FOR MOBILE POPUP
  const handleSelect = (hotel, slot) => {
    setSelectedHotel(hotel);
    setSelectedSlot(slot);

    // Open popup on mobile, normal flow on desktop
    if (isMobile) {
      setShowMobileBookingPopup(true);
    }
  };

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedHotel(null);
    setSelectedSlot(null);
    setShowMobileBookingPopup(false);
  }, []);

  // Get selected slot details for total calculation
  const selectedSlotDetails = useMemo(() => {
    if (!selectedHotel || !selectedSlot) return null;
    return selectedHotel.room_hourly_rates?.find(
      (slot) => slot.id === selectedSlot
    );
  }, [selectedHotel, selectedSlot]);

  // ADD PAYMENT HANDLERS
  const handleConfirmBooking = () => {
    if (!selectedHotel || !selectedSlotDetails) {
      toast.error("Please select a hotel and time slot");
      return;
    }

    if (!user) {
      toast.error("Please log in to continue");
      router.push("/login");
      return;
    }

    // Close mobile popup before showing payment options
    if (isMobile) {
      setShowMobileBookingPopup(false);
    }
    setShowPaymentOptions(true);
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

  const handleCashBooking = async () => {
    setIsBooking(true);

    const bookingPayload = {
      hotel_id: selectedHotel?.id,
      check_in_datetime: searchDetails.checkIn,
      check_out_datetime: searchDetails.checkOut,
      days: 1,
      item_id: selectedSlot,
      total_amount: 1000,
      user_id: userData.id,
      booking_type: "HOTEL",
      amount: selectedSlotDetails.rate_per_hour,
      order_type: "HOURS",
      payment_method: "COD",
      currency: "INR",
      tax_amount: 0,
      guest_count: 2,
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
      router.push("/thankyou");
    } catch (err) {
      toast.error(err.message || "Failed to create booking.");
    } finally {
      setIsBooking(false);
    }
  };

  const handleOnlinePayment = async () => {
    setIsBooking(true);

    const bookingPayload = {
      hotel_id: selectedHotel?.id,
      check_in_datetime: searchDetails.checkIn,
      check_out_datetime: searchDetails.checkIn,
      days: 1,
      item_id: selectedSlot,
      total_amount: 1000,
      user_id: userData.id,
      booking_type: "HOTEL",
      amount: selectedSlotDetails.rate_per_hour,
      order_type: "HOURS",
      currency: "INR",
      tax_amount: 0,
      guest_count: 2,
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
        handler: async function (response: any) {
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
          router.push("/thankyou");
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: `${user?.email}`,
          contact: "892389389",
        },
        theme: { color: "#16A34A" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (response: any) =>
        toast.error("Payment failed: " + response.error.description)
      );

      rzp.open();
    } catch (err) {
      toast.error(err.message || "Failed to initiate payment.");
    } finally {
      setIsBooking(false);
    }
  };

  console.log("hourly hotel list is hererer-----------!!!!!!!");
  console.log(hourlyHotelList);
  console.log(searchDetails);
  console.log(selectedSlot);
  console.log(user);

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 sm:h-64 md:h-80 bg-gray-300"></div>
      <div className="p-6 sm:p-8 space-y-4">
        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );

  // Enhanced Empty State
  const EmptyState = () => (
    <div className="text-center py-16 bg-white rounded-xl shadow-md">
      <div className="text-8xl mb-6">🏨</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {isError ? "Failed to Load Hotels" : "No Hotels Found"}
      </h3>
      <p className="text-gray-500 text-lg mb-6 max-w-md mx-auto">
        {isError
          ? "There was an error loading hotels. Please try again later."
          : "We couldn't find any hotels matching your criteria. Try adjusting your filters or search terms."}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {!isError && (
          <>
            <button
              onClick={() => {
                setFilter("all");
                setSearchQuery("");
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => setSearchQuery("")}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Clear Search
            </button>
          </>
        )}
        {isError && (
          <button
            onClick={() => mutate({ limit: 50 })}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Retry Loading
          </button>
        )}
      </div>
    </div>
  );

  // ADD MOBILE BOOKING POPUP COMPONENT
  const MobileBookingPopup = () => {
    if (!showMobileBookingPopup || !isMobile) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 p-0">
        <div className="bg-white rounded-t-3xl shadow-2xl w-full max-h-[80vh] overflow-y-auto animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
            <h3 className="text-xl font-bold text-gray-900">Your Booking</h3>
            <button
              onClick={() => setShowMobileBookingPopup(false)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {selectedHotel && selectedSlotDetails ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-base font-medium text-gray-700">
                    Hotel
                  </span>
                  <span className="text-base text-gray-900 font-semibold text-right max-w-[60%]">
                    {selectedHotel.name}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-base font-medium text-gray-700">
                    Location
                  </span>
                  <span className="text-base text-gray-900 font-semibold">
                    {selectedHotel.city}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-base font-medium text-gray-700">
                    Duration
                  </span>
                  <span className="text-base text-gray-900 font-semibold">
                    {selectedSlotDetails.duration_hours} hours
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                  <span className="text-base font-medium text-gray-700">
                    Rate
                  </span>
                  <span className="text-base text-green-600 font-bold">
                    ₹{selectedSlotDetails.rate_per_hour}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-3">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-xl text-green-600 font-bold">
                    ₹{selectedSlotDetails.rate_per_hour}
                  </span>
                </div>

                <button
                  onClick={handleConfirmBooking}
                  disabled={isBooking}
                  className="w-full mt-6 py-4 rounded-lg bg-green-600 text-white font-semibold text-lg hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isBooking ? (
                    <div className="flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin mr-2"
                      />
                      Processing...
                    </div>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>

                <button
                  onClick={clearSelection}
                  className="w-full py-3 text-gray-600 hover:text-gray-800 transition"
                >
                  Change Selection
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🏨</div>
                <p className="text-gray-600 text-base font-medium mb-2">
                  Select a hotel and time slot
                </p>
                <p className="text-gray-400 text-sm">
                  Choose from our premium hourly workspaces to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  console.log("hourly list data is herererereree---------");
  console.log(hourlyHotelList);
  console.log("rooms dataatatat----");
  console.log(filteredHotels);
  console.log("selected hotel data is herererer----");
  console.log(selectedHotel);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Workspace
          </h1>
          <p className="text-gray-600 text-lg">
            Book premium hourly workspaces across the city
          </p>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Hotel List */}
          <div className="lg:col-span-2 space-y-6 px-4 sm:px-0">
            {isLoading && displayedHotels.length === 0 ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <LoadingSkeleton key={index} />
                ))}
              </div>
            ) : displayedHotels?.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {displayedHotels?.map((hotel, index) => {
                  const isLastElement = displayedHotels.length === index + 1;
                  return (
                    <div
                      key={hotel.id}
                      ref={isLastElement ? lastHotelElementRef : null}
                      className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                      {/* Image Section */}
                      <Link href={`/hoteldetails/${hotel.id}`}>
                        <div className="relative group">
                          <img
                            src={
                              hotel?.hotel_images?.[0]?.image_url ||
                              defaultImage
                            }
                            alt={hotel.name}
                            className="w-full h-48 sm:h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                          <div className="absolute top-4 left-4 flex space-x-3">
                            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                              Hourly Booking
                            </span>
                            <span className="bg-white text-green-600 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center shadow-sm">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="mr-1.5 text-yellow-400"
                              />
                              {hotel.star_rating}
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Content Section */}
                      <div className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          {/* Hotel Info */}
                          <div className="space-y-3">
                            <Link href={`/hoteldetails/${hotel.id}`}>
                              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight hover:text-green-600 transition-colors duration-200 cursor-pointer">
                                {hotel.name}
                              </h2>
                            </Link>
                            <div className="space-y-2 text-gray-600">
                              <Link href={`/hoteldetails/${hotel.id}`}>
                                <p className="flex items-center text-sm sm:text-base">
                                  <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    className="text-green-500 mr-2.5 w-4"
                                  />
                                  {hotel.city}, {hotel.country}
                                </p>

                                <p className="flex items-center text-sm sm:text-base">
                                  <FontAwesomeIcon
                                    icon={faPhone}
                                    className="text-green-500 mr-2.5 w-4"
                                  />
                                  {hotel.phone}
                                </p>
                                <p className="flex items-center text-sm sm:text-base">
                                  <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="text-green-500 mr-2.5 w-4"
                                  />
                                  {hotel.email}
                                </p>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Time Slots with Visual Selection Feedback */}
                        <div className="mt-8">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Available Time Slots
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {hotel?.room_hourly_rates?.map((slot) => {
                              const isSelected =
                                selectedSlot === slot.id &&
                                selectedHotel?.id === hotel.id;
                              return (
                                <button
                                  key={slot.id}
                                  onClick={() => handleSelect(hotel, slot.id)}
                                  className={`p-3 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 ${
                                    isSelected
                                      ? "bg-green-600 text-white shadow-lg scale-105"
                                      : "bg-green-50 text-green-700 hover:bg-green-100 hover:scale-105"
                                  }`}
                                >
                                  <div className="text-center">
                                    <div className="font-bold">
                                      {slot.duration_hours}h
                                    </div>
                                    <div className="text-xs opacity-75">
                                      ₹{slot.rate_per_hour}
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Loading More Indicator */}
                {isLoadingMore && (
                  <div className="flex justify-center items-center py-8">
                    <div className="flex items-center space-x-3 text-green-600">
                      <FontAwesomeIcon
                        icon={faSpinner}
                        className="animate-spin text-xl"
                      />
                      <span className="text-lg font-medium">
                        Loading more hotels...
                      </span>
                    </div>
                  </div>
                )}

                {/* End of Results */}
                {!hasMore && displayedHotels.length > 0 && (
                  <div className="text-center py-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="text-4xl mb-3">🎉</div>
                    <p className="text-gray-700 text-lg font-medium">
                      You've seen all available hotels!
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Total: {filteredHotels.length} hotels found
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Enhanced Booking Sidebar - HIDDEN ON MOBILE */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 sticky top-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Your Booking
                </h3>
                {(selectedHotel || selectedSlot) && (
                  <button
                    onClick={clearSelection}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Clear
                  </button>
                )}
              </div>

              {selectedHotel && selectedSlotDetails ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="text-sm sm:text-base font-medium text-gray-700">
                      Hotel
                    </span>
                    <span className="text-sm sm:text-base text-gray-900 font-semibold text-right max-w-[60%]">
                      {selectedHotel.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="text-sm sm:text-base font-medium text-gray-700">
                      Location
                    </span>
                    <span className="text-sm sm:text-base text-gray-900 font-semibold">
                      {selectedHotel.city}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="text-sm sm:text-base font-medium text-gray-700">
                      Duration
                    </span>
                    <span className="text-sm sm:text-base text-gray-900 font-semibold">
                      {selectedSlotDetails.duration_hours} hours
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <span className="text-sm sm:text-base font-medium text-gray-700">
                      Rate
                    </span>
                    <span className="text-sm sm:text-base text-green-600 font-bold">
                      ₹{selectedSlotDetails.rate_per_hour}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3">
                    <span className="text-base font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg text-green-600 font-bold">
                      ₹{selectedSlotDetails.rate_per_hour}
                    </span>
                  </div>

                  <button
                    onClick={handleConfirmBooking}
                    disabled={isBooking}
                    className="w-full mt-6 py-3 rounded-lg bg-green-600 text-white font-semibold text-sm sm:text-base hover:bg-green-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBooking ? (
                      <div className="flex items-center justify-center">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin mr-2"
                        />
                        Processing...
                      </div>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>

                  <button
                    onClick={clearSelection}
                    className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition"
                  >
                    Change Selection
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏨</div>
                  <p className="text-gray-600 text-sm sm:text-base font-medium mb-2">
                    Select a hotel and time slot
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Choose from our premium hourly workspaces to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ADD MOBILE BOOKING POPUP */}
      <MobileBookingPopup />

      {/* PAYMENT OPTIONS MODAL */}
      {showPaymentOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Choose Payment Method
            </h3>

            <div className="space-y-3">
              <button
                onClick={() => handlePaymentMethodSelect("online")}
                className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">💳</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Pay Online</h4>
                    <p className="text-sm text-gray-600">
                      Pay now using UPI, Card, Net Banking
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handlePaymentMethodSelect("cash")}
                className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 font-bold">💵</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Cash on Counter (COC)
                    </h4>
                    <p className="text-sm text-gray-600">
                      Pay at the hotel reception
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowPaymentOptions(false)}
              className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;

//thats a good

// ("use client");
// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faStar,
//   faMapMarkerAlt,
//   faPhone,
//   faEnvelope,
//   faBuilding,
// } from "@fortawesome/free-solid-svg-icons";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import Link from "next/link";

// // MOCK API HOOK FOR DEMONSTRATION - Replace with your actual hook
// const useHourlyHotel = () => {
//   const staticHotels = Array.from({ length: 50 }, (_, i) => ({
//     id: i + 1,
//     name: `Hotel Example #${i + 1}`,
//     address: `${100 + i} Main Street`,
//     city: "New York",
//     country: "USA",
//     phone: `+1-555-123-${4567 + i}`,
//     email: `contact${i + 1}@hotel-example.com`,
//     star_rating: (4.0 + (i % 10) / 10).toFixed(1),
//     room_hourly_rates: [
//       { id: `${i}-3`, duration_hours: 3, rate_per_hour: 45 + (i % 5) },
//       { id: `${i}-6`, duration_hours: 6, rate_per_hour: 42 + (i % 5) },
//       { id: `${i}-9`, duration_hours: 9, rate_per_hour: 40 + (i % 5) },
//     ],
//   }));

//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   const mutate = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setData({ data: staticHotels });
//       setIsLoading(false);
//     }, 1500); // Simulate network delay
//   };

//   return { data, isLoading, isError, mutate, error: null };
// };

// // NEW: Skeleton Card Component for a better loading experience
// const SkeletonCard = () => (
//   <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
//     <div className="w-full h-64 bg-gray-200"></div>
//     <div className="p-8">
//       <div className="h-8 w-3/4 bg-gray-200 rounded-md mb-4"></div>
//       <div className="h-5 w-1/2 bg-gray-200 rounded-md mb-3"></div>
//       <div className="h-5 w-1/3 bg-gray-200 rounded-md"></div>
//       <div className="mt-8">
//         <div className="h-6 w-1/4 bg-gray-200 rounded-md mb-4"></div>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//           <div className="h-10 bg-gray-200 rounded-lg"></div>
//           <div className="h-10 bg-gray-200 rounded-lg"></div>
//           <div className="h-10 bg-gray-200 rounded-lg"></div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const BookingPage = () => {
//   const router = useRouter();
//   const { isError, isLoading, data, error, mutate } = useHourlyHotel();

//   // --- STATE MANAGEMENT ---
//   const [allHotels, setAllHotels] = useState([]); // Stores all fetched hotels
//   const [displayedHotels, setDisplayedHotels] = useState([]); // Hotels currently visible
//   const [visibleCount, setVisibleCount] = useState(10); // Number of hotels to show
//   const [selectedHotel, setSelectedHotel] = useState(null);
//   const [selectedSlotId, setSelectedSlotId] = useState(null);

//   // --- REFS FOR INFINITE SCROLL ---
//   const observer = useRef();
//   const lastHotelElementRef = useCallback(
//     (node) => {
//       if (isLoading) return; // Don't observe while loading
//       if (observer.current) observer.current.disconnect(); // Disconnect previous observer
//       observer.current = new IntersectionObserver((entries) => {
//         // If the last element is visible and there are more hotels to load
//         if (entries[0].isIntersecting && allHotels.length > visibleCount) {
//           // Load more hotels
//           setVisibleCount((prev) => prev + 10);
//         }
//       });
//       if (node) observer.current.observe(node); // Observe the new last element
//     },
//     [isLoading, allHotels.length, visibleCount]
//   );

//   // --- DATA FETCHING & INITIALIZATION ---
//   useEffect(() => {
//     mutate(""); // Trigger fetch on component mount
//   }, [mutate]);

//   useEffect(() => {
//     if (isError && !isLoading) {
//       toast.error(error instanceof Error ? error.message : "An error occurred");
//       router.push("/login");
//     }
//     if (data?.data && Array.isArray(data.data)) {
//       setAllHotels(data.data);
//       setDisplayedHotels(data.data.slice(0, 10)); // Set initial 10 hotels
//     }
//   }, [isError, isLoading, error, data, router]);

//   // --- INFINITE SCROLL LOGIC ---
//   useEffect(() => {
//     // When visibleCount changes, update the displayed hotels
//     if (allHotels.length > 0) {
//       setDisplayedHotels(allHotels.slice(0, visibleCount));
//     }
//   }, [visibleCount, allHotels]);

//   // --- HANDLERS ---
//   const handleSelect = (hotel, slot) => {
//     setSelectedHotel(hotel);
//     setSelectedSlotId(slot.id);
//   };

//   // --- RENDER ---
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
//         <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
//           {/* Hotel List */}
//           <div className="lg:col-span-2 space-y-6">
//             {isLoading && displayedHotels.length === 0 ? (
//               // Initial Loading State with Skeletons
//               Array.from({ length: 5 }).map((_, index) => (
//                 <SkeletonCard key={index} />
//               ))
//             ) : displayedHotels.length === 0 ? (
//               // Empty State
//               <div className="text-center py-20 bg-white rounded-2xl shadow-md">
//                 <FontAwesomeIcon
//                   icon={faBuilding}
//                   className="text-5xl text-gray-300 mb-4"
//                 />
//                 <h3 className="text-xl font-semibold text-gray-700">
//                   No Hotels Found
//                 </h3>
//                 <p className="text-gray-500 mt-2">
//                   We couldn't find any hotels. Please try again later.
//                 </p>
//               </div>
//             ) : (
//               // Display Hotel Cards
//               displayedHotels.map((hotel, index) => {
//                 // Attach ref to the last element for infinite scroll trigger
//                 const isLastElement = displayedHotels.length === index + 1;
//                 return (
//                   <div
//                     key={hotel.id}
//                     ref={isLastElement ? lastHotelElementRef : null}
//                     className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//                   >
//                     <div className="relative group">
//                       <img
//                         src={`https://picsum.photos/800/600?random=${hotel.id}`}
//                         alt={hotel.name}
//                         className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
//                       />
//                       <div className="absolute top-4 left-4 flex items-center space-x-3">
//                         <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
//                           Hourly Booking
//                         </span>
//                         <span className="bg-white text-blue-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center shadow-lg">
//                           <FontAwesomeIcon
//                             icon={faStar}
//                             className="mr-1.5 text-yellow-400"
//                           />
//                           {hotel.star_rating}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="p-6 sm:p-8">
//                       <h2 className="text-3xl font-bold text-gray-800">
//                         {hotel.name}
//                       </h2>
//                       <div className="mt-4 space-y-2 text-gray-600">
//                         <p className="flex items-center">
//                           <FontAwesomeIcon
//                             icon={faMapMarkerAlt}
//                             className="text-blue-500 mr-3 w-4"
//                           />
//                           {`${hotel.address}, ${hotel.city}, ${hotel.country}`}
//                         </p>
//                         <p className="flex items-center">
//                           <FontAwesomeIcon
//                             icon={faPhone}
//                             className="text-blue-500 mr-3 w-4"
//                           />
//                           {hotel.phone}
//                         </p>
//                       </div>

//                       <div className="mt-8">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                           Available Time Slots
//                         </h3>
//                         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
//                           {hotel?.room_hourly_rates?.map((slot) => {
//                             const isSelected =
//                               selectedHotel?.id === hotel.id &&
//                               selectedSlotId === slot.id;
//                             return (
//                               <button
//                                 key={slot.id}
//                                 onClick={() => handleSelect(hotel, slot)}
//                                 className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
//                                   isSelected
//                                     ? "bg-blue-600 text-white scale-105 shadow-lg"
//                                     : "bg-blue-50 text-blue-700 hover:bg-blue-100"
//                                 }`}
//                               >
//                                 {`${slot.duration_hours} hours`}
//                               </button>
//                             );
//                           })}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//             {/* Loading indicator for infinite scroll */}
//             {isLoading && displayedHotels.length > 0 && <SkeletonCard />}
//           </div>

//           {/* Booking Summary Panel */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 sticky top-6 border">
//               <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
//                 Your Booking
//               </h3>
//               {selectedHotel && selectedSlotId ? (
//                 (() => {
//                   const selectedSlotDetails =
//                     selectedHotel.room_hourly_rates.find(
//                       (s) => s.id === selectedSlotId
//                     );
//                   return (
//                     <div className="space-y-4 animate-fade-in">
//                       <BookingDetail label="Hotel" value={selectedHotel.name} />
//                       <BookingDetail
//                         label="Location"
//                         value={selectedHotel.city}
//                       />
//                       <BookingDetail
//                         label="Duration"
//                         value={`${selectedSlotDetails.duration_hours} hours`}
//                       />
//                       <div className="flex items-center justify-between pt-4">
//                         <span className="text-base font-medium text-gray-700">
//                           Total Price
//                         </span>
//                         <span className="text-xl text-blue-600 font-bold">
//                           $
//                           {selectedSlotDetails.rate_per_hour *
//                             selectedSlotDetails.duration_hours}
//                         </span>
//                       </div>
//                       <button className="w-full mt-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                         Confirm Booking
//                       </button>
//                     </div>
//                   );
//                 })()
//               ) : (
//                 <div className="text-center py-8">
//                   <FontAwesomeIcon
//                     icon={faMapMarkerAlt}
//                     className="text-5xl text-gray-300 mb-4"
//                   />
//                   <p className="text-gray-600 font-medium">
//                     Select a hotel and time slot
//                   </p>
//                   <p className="text-gray-400 text-sm mt-2">
//                     Your booking details will appear here.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // NEW: Helper component for consistent styling in the booking panel
// const BookingDetail = ({ label, value }) => (
//   <div className="flex items-center justify-between border-b border-gray-100 pb-3">
//     <span className="text-sm font-medium text-gray-600">{label}</span>
//     <span className="text-sm text-gray-800 font-semibold text-right">
//       {value}
//     </span>
//   </div>
// );

// export default BookingPage;
