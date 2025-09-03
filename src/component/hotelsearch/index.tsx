"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { Card, CardContent } from "@mui/material";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@src/components/ui/carousel";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useHotels } from "@src/hooks/apiHooks";
import { setSearchDetails } from "@src/redux/reducers/authSlice";

const HotelSearchComponent = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const dispatch = useDispatch();
  const router = useRouter();
  const [hotelList, setHotelList] = useState([]);

  const today = new Date().toISOString().split("T")[0];

  // React Hook Form for Daily Booking
  const {
    register: registerDaily,
    handleSubmit: handleSubmitDaily,
    getValues: getDailyValues,
    watch: watchDaily,
    formState: { errors: errorsDaily },
  } = useForm({
    defaultValues: {
      destination: "",
      checkIn: "",
      checkOut: "",
      guests: "1",
    },
  });

  // React Hook Form for Hourly Booking
  const {
    register: registerHourly,
    handleSubmit: handleSubmitHourly,
    getValues: getHourlyValues,
    watch: watchHourly,
    formState: { errors: errorsHourly },
  } = useForm({
    defaultValues: {
      destination: "",
      checkIn: "",
      checkInTime: "12:00",
      checkOutTime: "13:00",
    },
  });

  // Handle hotels API
  const { isError, isLoading, data, error, mutate } = useHotels();

  useEffect(() => {
    if (isError && !isLoading) {
      toast.error(
        error instanceof Error ? error.message : "Failed to load hotels"
      );
    }
    if (Array.isArray(data?.data?.hotels)) {
      setHotelList(data.data.hotels);
    } else if (Array.isArray(data?.data)) {
      setHotelList(data.data);
    } else {
      setHotelList([]);
    }
  }, [isError, isLoading, error, data]);

  useEffect(() => {
    mutate({ limit: 4 });
  }, [mutate]);

  // Submission handlers
  const onDailySubmit = (data) => {
    dispatch(setSearchDetails({ ...data, bookingType: "daily" }));
    toast.success("Searching for hotels...");
    router.push(`/home`);
  };

  const onHourlySubmit = (data) => {
    dispatch(setSearchDetails({ ...data, bookingType: "hourly" }));
    toast.success("Searching for hourly hotels...");
    router.push(`/hourly`);
  };

  // Banner data
  const banners = [
    {
      title: "Luxury Stays",
      subtitle: "Experience world-class comfort",
      img: "/Consultancy Website (1).png",
    },
    {
      title: "Budget Friendly",
      subtitle: "Affordable hotels for every trip",
      img: "/Consultancy Website (2).png",
    },
    {
      title: "Beach Resorts",
      subtitle: "Relax by the ocean 🌊",
      img: "/Consultancy Website.png",
    },
  ];

  // Carousel API and current slide state for controlling single banner visibility
  const [carouselAPI, setCarouselAPI] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // Auto-advance functionality
  const intervalRef = useRef(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const onSelect = useCallback(() => {
    if (!carouselAPI) return;
    setSelectedIndex(carouselAPI.selectedScrollSnap());
  }, [carouselAPI]);

  const scrollTo = (index) => {
    if (!carouselAPI) return;
    carouselAPI.scrollTo(index);
  };

  // Auto-advance carousel
  const startAutoAdvance = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (!isUserInteracting && carouselAPI) {
        const nextIndex = (selectedIndex + 1) % banners.length;
        carouselAPI.scrollTo(nextIndex);
      }
    }, 3000); // Change slide every 3 seconds
  }, [carouselAPI, selectedIndex, banners.length, isUserInteracting]);

  const stopAutoAdvance = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    stopAutoAdvance();

    // Resume auto-advance after 5 seconds of no interaction
    setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  }, [stopAutoAdvance]);

  useEffect(() => {
    if (!carouselAPI) return;
    setScrollSnaps(carouselAPI.scrollSnapList());
    onSelect();
    carouselAPI.on("select", onSelect);

    // Add event listeners for user interaction
    const carousel = carouselAPI.rootNode();
    if (carousel) {
      carousel.addEventListener("mouseenter", handleUserInteraction);
      carousel.addEventListener("touchstart", handleUserInteraction);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("mouseenter", handleUserInteraction);
        carousel.removeEventListener("touchstart", handleUserInteraction);
      }
    };
  }, [carouselAPI, onSelect, handleUserInteraction]);

  // Start auto-advance when component mounts and carousel is ready
  useEffect(() => {
    if (carouselAPI && !isUserInteracting) {
      startAutoAdvance();
    }

    return () => {
      stopAutoAdvance();
    };
  }, [carouselAPI, isUserInteracting, startAutoAdvance, stopAutoAdvance]);

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Render single hotel card for carousel
  const renderHotelCard = (hotel, index) => (
    <CarouselItem key={hotel.id || index} className="w-full">
      <Card className="rounded-lg shadow-lg overflow-hidden">
        <img
          src={
            hotel.image ||
            "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
          }
          alt={hotel.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <CardContent>
          <h3 className="text-lg font-semibold">{hotel.name}</h3>
          <p className="text-sm text-gray-600">
            {hotel.location || hotel.city}
          </p>
          <p className="mt-2 font-bold text-green-600">
            ${hotel.pricePerNight || hotel.price || "N/A"} / night
          </p>
        </CardContent>
      </Card>
    </CarouselItem>
  );

  return (
    <main className="max-w-[600px] mx-auto lg:max-w-7xl lg:px-6 pb-20 lg:pb-10">
      <div className="px-4 lg:px-0 py-6">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 border border-gray-100">
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setActiveTab("daily")}
              className={`flex-1 py-2 px-3 text-sm font-semibold rounded-md ${
                activeTab === "daily"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <i className="fas fa-calendar-alt mr-2"></i> Daily
            </button>
            <button
              onClick={() => setActiveTab("hourly")}
              className={`flex-1 py-2 px-3 text-sm font-semibold rounded-md ${
                activeTab === "hourly"
                  ? "bg-white text-green-600 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <i className="fas fa-clock mr-2"></i> Hourly
            </button>
          </div>

          {/* Forms */}
          {activeTab === "daily" ? (
            <form
              onSubmit={handleSubmitDaily(onDailySubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Where are you going?
                </label>
                <select
                  {...registerDaily("destination", {
                    required: "Destination is required",
                  })}
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errorsDaily.destination
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <option value="">Select destination</option>
                  <option value="ahmedabad">Ahmedabad</option>
                </select>
                {errorsDaily.destination && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsDaily.destination.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Check-in
                  </label>
                  <input
                    type="date"
                    {...registerDaily("checkIn", {
                      required: "Check-in date is required",
                    })}
                    min={today}
                    className={`w-full px-3 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errorsDaily.checkIn
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50"
                    }`}
                  />
                  {errorsDaily.checkIn && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorsDaily.checkIn.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Check-out
                  </label>
                  <input
                    type="date"
                    {...registerDaily("checkOut", {
                      required: "Check-out date is required",
                      validate: (value) =>
                        value > getDailyValues("checkIn") ||
                        "Must be after check-in",
                    })}
                    min={watchDaily("checkIn") || today}
                    className={`w-full px-3 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errorsDaily.checkOut
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50"
                    }`}
                  />
                  {errorsDaily.checkOut && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorsDaily.checkOut.message || "Invalid"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Guests
                </label>
                <select
                  {...registerDaily("guests")}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                  <option value="5+">5+ guests</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg text-sm font-semibold shadow-md"
              >
                <i className="fas fa-search mr-2"></i> Search Hotels
              </button>
            </form>
          ) : (
            <form
              onSubmit={handleSubmitHourly(onHourlySubmit)}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Where are you going?
                </label>
                <select
                  {...registerHourly("destination", {
                    required: "Destination is required",
                  })}
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errorsHourly.destination
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <option value="">Select destination</option>
                  <option value="ahmedabad">Ahmedabad</option>
                </select>
                {errorsHourly.destination && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsHourly.destination.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Check-in Date
                </label>
                <input
                  type="date"
                  {...registerHourly("checkIn", {
                    required: "Check-in date is required",
                  })}
                  min={today}
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errorsHourly.checkIn
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                />
                {errorsHourly.checkIn && (
                  <p className="text-red-500 text-xs mt-1">
                    {errorsHourly.checkIn.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Check-in Time
                  </label>
                  <input
                    type="time"
                    {...registerHourly("checkInTime", {
                      required: "Check-in time is required",
                    })}
                    className={`w-full px-3 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errorsHourly.checkInTime
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50"
                    }`}
                  />
                  {errorsHourly.checkInTime && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorsHourly.checkInTime.message}
                    </p>
                  )}
                </div>
                {/* <div>
                  <label className="block text-xs font-medium text-gray-700">
                    Check-out Time
                  </label>
                  <input
                    type="time"
                    {...registerHourly("checkOutTime", {
                      required: "Check-out time is required",
                      validate: (value) =>
                        value > getHourlyValues("checkInTime") ||
                        "Must be after check-in",
                    })}
                    className={`w-full px-3 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      errorsHourly.checkOutTime
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50"
                    }`}
                  />
                  {errorsHourly.checkOutTime && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorsHourly.checkOutTime.message || "Invalid"}
                    </p>
                  )}
                </div> */}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg text-sm font-semibold shadow-md"
              >
                <i className="fas fa-search mr-2"></i> Search Hotels
              </button>
            </form>
          )}
        </div>

        {/* Banner Carousel - One banner at a time with auto-advance */}
        <div className="w-full mb-12">
          <Carousel
            className="w-full max-w-7xl mx-auto px-2 md:px-4"
            opts={{ loop: true, align: "center" }}
            setApi={setCarouselAPI}
          >
            <CarouselContent className="w-full">
              {banners.map((banner, i) => (
                <CarouselItem key={i} className="w-full">
                  <Card className="overflow-hidden rounded-2xl shadow-md">
                    {/* Image + Text Overlay */}
                    <div
                      className="
              relative w-full 
              aspect-[16/9] sm:aspect-[21/9] 
              max-h-[500px]
            "
                    >
                      <img
                        src={banner.img}
                        alt={banner.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      {/* Text Overlay */}
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious
              className="left-2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              onClick={handleUserInteraction}
            />
            <CarouselNext
              className="right-2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
              onClick={handleUserInteraction}
            />
          </Carousel>
        </div>

        {/* Popular Hotels carousel */}
      </div>
    </main>
  );
};

export default HotelSearchComponent;
