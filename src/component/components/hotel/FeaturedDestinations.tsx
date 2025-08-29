"use client";
import { Rating } from "@mui/material";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@src/components/ui/carousel";
import Link from "next/link";
import { useHotels } from "@src/hooks/apiHooks";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef, useMemo } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "@src/redux/store";
import { selectSearchDetails } from "@src/redux/reducers/authSlice";

//=============== Skeleton Loader Components (defined within the main file) ===============

/**
 * Skeleton loader for a single item in the "Featured Destinations" carousel.
 */
const BannerCardSkeleton = () => {
  return (
    <div className="px-2 basis-full sm:basis-1/2 lg:basis-1/3">
      <div className="animate-pulse w-full h-56 sm:h-64 bg-gray-300 rounded-xl"></div>
    </div>
  );
};

/**
 * Skeleton loader for a single item in the "Hotels for You" grid.
 */
const HotelCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden">
      {/* Image Placeholder */}
      <div className="w-full h-48 sm:h-52 lg:h-56 bg-gray-300"></div>

      <div className="p-4">
        {/* Title Placeholder */}
        <div className="h-5 bg-gray-300 rounded-md w-3/4 mb-3"></div>

        {/* Rating and Address Placeholder */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 rounded-md w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

//========================================================================================

interface Hotel {
  id?: string;
  title: string;
  desc: string;
  name: string;
  city: string;
  address: string;
  hotel_images: { image_url: string }[];
  room_types: { base_price: string }[];
}

const HOTELS_PER_PAGE = 6;

function FeaturedDestinations() {
  const router = useRouter();
  const [hotelList, setHotelList] = useState<Hotel[]>([]);
  const [bannerList, setBannerList] = useState<Hotel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const hiteldetails = useAppSelector(selectSearchDetails);

  // Hook for the paginated "Hotels for You" grid
  const {
    isError: isHotelError,
    isLoading: isHotelLoading,
    data: hotelData,
    error: hotelError,
    mutate: hotelMutation,
  } = useHotels();

  // A separate hook for the "Featured Destinations" banner
  const {
    data: bannerData,
    mutate: bannerMutation,
    isLoading: isBannerLoading,
  } = useHotels();

  useEffect(() => {
    if (isHotelError && !isHotelLoading) {
      toast.error(
        hotelError instanceof Error ? hotelError.message : "An error occurred"
      );
      router.push("/login");
    }
    if (Array.isArray(hotelData?.data?.hotels)) {
      const fetchedHotels = hotelData.data.hotels;
      setHotelList(fetchedHotels);
      if (fetchedHotels.length < HOTELS_PER_PAGE) {
        setIsLastPage(true);
        setTotalPages(currentPage);
      } else {
        setIsLastPage(false);
      }
    }
  }, [
    isHotelError,
    isHotelLoading,
    hotelError,
    hotelData,
    router,
    currentPage,
  ]);

  useEffect(() => {
    if (Array.isArray(bannerData?.data?.hotels)) {
      setBannerList(bannerData.data.hotels);
    }
  }, [bannerData]);

  useEffect(() => {
    setCurrentPage(1);
    setIsLastPage(false);
    setTotalPages(null);
  }, [hiteldetails?.destination]);

  useEffect(() => {
    hotelMutation({
      limit: HOTELS_PER_PAGE,
      page: currentPage,
      search: hiteldetails?.destination || "Ahmedabad",
      checkin: hiteldetails?.checkIn || "",
      checkout: hiteldetails?.checkOut || "",
    });
  }, [hotelMutation, currentPage, hiteldetails]);

  useEffect(() => {
    bannerMutation({ limit: 7 });
  }, [bannerMutation]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbersToDisplay = useMemo((): number[] => {
    if (totalPages) {
      const safeCurrentPage = Math.min(currentPage, totalPages);
      if (totalPages <= 3)
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      if (safeCurrentPage === 1) return [1, 2, 3];
      if (safeCurrentPage === totalPages)
        return [totalPages - 2, totalPages - 1, totalPages];
      return [safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1];
    }
    return [currentPage, currentPage + 1, currentPage + 2];
  }, [currentPage, totalPages]);

  const banners = [
    {
      id: 1,
      title: "Luxury Stays",
      subtitle: "Experience world-class comfort",
      img: "/Consultancy Website (1).png",
    },
    {
      id: 2,
      title: "Budget Friendly",
      subtitle: "Affordable hotels for every trip",
      img: "/Consultancy Website (2).png",
    },
    {
      id: 3,
      title: "Beach Resorts",
      subtitle: "Relax by the ocean 🌊",
      img: "/Consultancy Website.png",
    },
  ];

  const defaultImage =
    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  console.log("banner list is comming---------");
  console.log(bannerList);
  return (
    <main className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="pt-8 md:pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-green-600 pl-4">
            Why Revour ?
          </h2>
        </div>

        <section className="py-8">
          {/* RENDER BANNER SKELETON OR CAROUSEL */}
          {/* {isBannerLoading ? (
            <div className="flex -mx-2">
              <BannerCardSkeleton />
              <BannerCardSkeleton />
              <BannerCardSkeleton />
            </div>
          ) : (
            <Carousel
              className="w-full relative"
              opts={{ loop: true }}
              plugins={[plugin.current]}
            >
              <CarouselContent className="flex -mx-2">
                {bannerList.map((item) => (
                  <CarouselItem
                    key={`banner-${item.id}`}
                    className="px-2 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <Link href={`/hoteldetails/${item.id}`}>
                      <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        <div
                          className="w-full h-56 sm:h-64 bg-gray-200 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-300"
                          style={{
                            backgroundImage: `url(${
                              item?.hotel_images[0]?.image_url ?? defaultImage
                            })`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-lg sm:text-xl font-semibold">
                            {item?.name}
                          </h3>
                          <p className="text-sm opacity-90">{item?.city}</p>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 shadow-md rounded-full w-8 h-8 md:w-10 md:h-10" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 shadow-md rounded-full w-8 h-8 md:w-10 md:h-10" />
            </Carousel>
          )} */}
          {isBannerLoading ? (
            <div className="flex -mx-2">
              <BannerCardSkeleton />
              <BannerCardSkeleton />
              <BannerCardSkeleton />
            </div>
          ) : (
            <Carousel
              className="w-full relative"
              opts={{ loop: true }}
              plugins={[plugin.current]}
            >
              <CarouselContent className="flex -mx-2">
                {banners.map((item) => (
                  <CarouselItem
                    key={`banner-${item.id}`}
                    className="px-2 basis-full"
                  >
                    <Link href={""}>
                      <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                        <div
                          className="
                w-full 
                aspect-[16/9]        /* Keeps 16:9 ratio */
                sm:aspect-[4/3]      /* Taller on small screens */
                lg:aspect-[21/9]     /* Wide cinematic on laptops */
                bg-gray-200 bg-cover bg-center 
                transform group-hover:scale-105 
                transition-transform duration-500
              "
                          style={{
                            backgroundImage: `url("${item?.img}")`,
                          }}
                        >
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                          {/* Banner text */}
                          <div className="absolute bottom-6 left-6 text-white max-w-[80%]"></div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation arrows */}
              <CarouselPrevious className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 shadow-md rounded-full w-8 h-8 md:w-10 md:h-10" />
              <CarouselNext className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 shadow-md rounded-full w-8 h-8 md:w-10 md:h-10" />
            </Carousel>
          )}
        </section>

        <section className="py-6">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 border-l-4 border-green-600 pl-4">
              Hotels For You
            </h2>
            <p className="mt-2 text-md sm:text-lg text-gray-600 pl-5">
              Curated list of hotels based on your search.
            </p>
          </div>

          {/* RENDER HOTEL GRID SKELETON, ACTUAL DATA, OR NO RESULTS MESSAGE */}
          {isHotelLoading && hotelList.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Array.from({ length: HOTELS_PER_PAGE }).map((_, index) => (
                <HotelCardSkeleton key={index} />
              ))}
            </div>
          ) : Array.isArray(hotelList) && hotelList.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {hotelList.map((hotel) => {
                  /* ---------- 1. determine hourly ---------- */
                  const isHourly =
                    hotel?.room_types?.[0]?.base_price === undefined ||
                    hotel?.room_types?.[0]?.base_price === null;

                  /* ---------- 2. pick path & label ---------- */
                  const linkPath = isHourly
                    ? `/hourly` // <— hourly details
                    : `/hoteldetails/${hotel.id}`; // <— normal hotel details

                  const priceLabel = isHourly
                    ? "Hourly"
                    : `₹${hotel.room_types[0].base_price}`;

                  return (
                    <div
                      key={hotel.id}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      {/* ---------- 3. USE linkPath ---------- */}
                      <Link href={linkPath}>
                        <div className="relative w-full h-48 sm:h-52 lg:h-56 rounded-t-xl overflow-hidden">
                          <div
                            className="w-full h-full bg-cover bg-center transform hover:scale-105 transition-transform duration-300"
                            style={{
                              backgroundImage: `url(${
                                hotel?.hotel_images[0]?.image_url ??
                                defaultImage
                              })`,
                            }}
                          />
                          <span className="absolute bottom-3 left-3 bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                            {priceLabel}
                          </span>
                        </div>
                      </Link>

                      <div className="p-4">
                        <h4 className="text-md md:text-lg font-semibold text-gray-800">
                          {hotel?.name}
                        </h4>
                        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                          <Rating
                            name="read-only"
                            defaultValue={4.5}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                          <span className="truncate w-1/2 text-right">
                            {hotel?.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center items-center mt-10 gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Previous
                </button>
                {pageNumbersToDisplay.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      currentPage === page
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    } transition-colors duration-200`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={isLastPage}
                  className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-600 text-lg">
              No hotels available in this city.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default FeaturedDestinations;
