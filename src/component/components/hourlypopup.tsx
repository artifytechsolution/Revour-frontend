"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@src/redux/store";
import { selectSearchDetails, selectUser } from "@src/redux/reducers/authSlice";
import toast from "react-hot-toast";

const HourlyBookingPopup = ({
  isOpen,
  onClose,
  hotelData = [],
  defaultImage = "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
}) => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isBooking, setIsBooking] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: Hotel Selection, 2: Payment Details, 3: Payment Options

  const router = useRouter();
  const searchDetails = useAppSelector(selectSearchDetails);
  const userData = useAppSelector(selectUser);

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

  // Reset states when popup opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedHotel(null);
      setSelectedSlot(null);
      setShowPaymentDetails(false);
      setShowPaymentOptions(false);
      setCurrentStep(1);
    }
  }, [isOpen]);

  // Get selected slot details
  const selectedSlotDetails = selectedHotel?.room_hourly_rates?.find(
    (slot) => slot.id === selectedSlot
  );

  const handleHotelSlotSelect = (hotel, slotId) => {
    setSelectedHotel(hotel);
    setSelectedSlot(slotId);
    setShowPaymentDetails(true);
    setCurrentStep(2);
  };

  const handleConfirmBooking = () => {
    if (!selectedHotel || !selectedSlotDetails) {
      toast.error("Please select a hotel and time slot");
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

  const handleCashBooking = async () => {
    setIsBooking(true);

    const bookingPayload = {
      hotel_id: selectedHotel?.id,
      check_in_datetime: searchDetails.checkIn,
      check_out_datetime: searchDetails.checkOut,
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

  const handleOnlinePayment = async () => {
    setIsBooking(true);

    const bookingPayload = {
      hotel_id: selectedHotel?.id,
      check_in_datetime: searchDetails.checkIn,
      check_out_datetime: searchDetails.checkOut,
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
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentStep === 1 && "Select Hotel & Duration"}
              {currentStep === 2 && "Booking Details"}
              {currentStep === 3 && "Payment Method"}
            </h2>
            <div className="flex items-center mt-2 space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {currentStep > 1 && (
              <button
                onClick={handleBackStep}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
              >
                Back
              </button>
            )}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <FontAwesomeIcon icon={faTimes} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(90vh - 140px)" }}
        >
          {/* Step 1: Hotel Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {hotelData?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏨</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Hotels Available
                  </h3>
                  <p className="text-gray-600">
                    Please try adjusting your search criteria.
                  </p>
                </div>
              ) : (
                hotelData?.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    {/* Hotel Info */}
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Hotel Image */}
                        <div className="lg:w-1/3">
                          <img
                            src={
                              hotel?.hotel_images?.[0]?.image_url ||
                              defaultImage
                            }
                            alt={hotel.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>

                        {/* Hotel Details */}
                        <div className="lg:w-2/3 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {hotel.name}
                              </h3>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p className="flex items-center">
                                  <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    className="text-green-500 mr-2 w-4"
                                  />
                                  {hotel.city}, {hotel.country}
                                </p>
                                <p className="flex items-center">
                                  <FontAwesomeIcon
                                    icon={faPhone}
                                    className="text-green-500 mr-2 w-4"
                                  />
                                  {hotel.phone}
                                </p>
                                <p className="flex items-center">
                                  <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="text-green-500 mr-2 w-4"
                                  />
                                  {hotel.email}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="text-yellow-400 mr-1"
                              />
                              <span className="font-semibold text-yellow-600">
                                {hotel.star_rating}
                              </span>
                            </div>
                          </div>

                          {/* Time Slots */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Available Duration
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {hotel?.room_hourly_rates?.map((slot) => (
                                <button
                                  key={slot.id}
                                  onClick={() =>
                                    handleHotelSlotSelect(hotel, slot.id)
                                  }
                                  className="p-4 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-200 group"
                                >
                                  <div className="text-center">
                                    <div className="font-bold text-lg text-gray-900 group-hover:text-green-600">
                                      {slot.duration_hours}h
                                    </div>
                                    <div className="text-green-600 font-semibold">
                                      ₹{slot.rate_per_hour}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                      per hour
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Step 2: Payment Details */}
          {currentStep === 2 && selectedHotel && selectedSlotDetails && (
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
                  Booking Summary
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-green-200 pb-3">
                    <span className="text-gray-700 font-medium">Hotel</span>
                    <span className="text-gray-900 font-semibold text-right max-w-[60%]">
                      {selectedHotel.name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b border-green-200 pb-3">
                    <span className="text-gray-700 font-medium">Location</span>
                    <span className="text-gray-900 font-semibold">
                      {selectedHotel.city}
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b border-green-200 pb-3">
                    <span className="text-gray-700 font-medium">Duration</span>
                    <span className="text-gray-900 font-semibold">
                      {selectedSlotDetails.duration_hours} hours
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b border-green-200 pb-3">
                    <span className="text-gray-700 font-medium">
                      Rate per Hour
                    </span>
                    <span className="text-green-600 font-bold">
                      ₹{selectedSlotDetails.rate_per_hour}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{selectedSlotDetails.rate_per_hour}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleConfirmBooking}
                  disabled={isBooking}
                  className="w-full py-4 bg-green-600 text-white font-bold text-lg rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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
                    "Proceed to Payment"
                  )}
                </button>

                <button
                  onClick={clearSelection}
                  className="w-full py-3 text-gray-600 hover:text-gray-800 transition border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  Change Selection
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Options */}
          {currentStep === 3 && showPaymentOptions && (
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                Choose Payment Method
              </h3>

              <div className="space-y-4">
                <button
                  onClick={() => handlePaymentMethodSelect("online")}
                  disabled={isBooking}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                      <span className="text-2xl">💳</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        Pay Online
                      </h4>
                      <p className="text-sm text-gray-600">
                        Pay securely using UPI, Card, Net Banking
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handlePaymentMethodSelect("cash")}
                  disabled={isBooking}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                      <span className="text-2xl">💵</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        Cash on Counter (COC)
                      </h4>
                      <p className="text-sm text-gray-600">
                        Pay at the hotel reception
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
                      className="animate-spin text-xl mr-2"
                    />
                    <span className="text-lg font-medium">
                      Processing booking...
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HourlyBookingPopup;
