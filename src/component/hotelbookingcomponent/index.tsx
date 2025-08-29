"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// --- MUI & DATE PICKER IMPORTS ---
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

// --- HOOKS & ICONS ---
import { useFindRoom } from "@src/hooks/apiHooks";
import PaymentIcon from "@mui/icons-material/Payment";
import MoneyIcon from "@mui/icons-material/Money";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppSelector } from "@src/redux/store";
import { selectUser } from "@src/redux/reducers/authSlice";

// --- LOADING SKELETON ---
const LoadingSkeleton = () => (
  <div className="max-w-4xl mx-auto p-4 sm:p-6 animate-pulse">
    <div className="h-48 bg-gray-200 rounded-2xl mb-8"></div>
    <div className="h-10 bg-gray-200 rounded-lg w-1/2 mb-6"></div>
    <div className="space-y-4">
      <div className="h-16 bg-gray-200 rounded-xl"></div>
      <div className="h-16 bg-gray-200 rounded-xl"></div>
    </div>
    <div className="h-10 bg-gray-200 rounded-lg w-1/3 my-6"></div>
    <div className="h-48 bg-gray-200 rounded-xl"></div>
    <div className="mt-8 h-14 bg-gray-200 rounded-lg"></div>
  </div>
);

// --- MAIN BOOKING COMPONENT ---
const HotelBookingComponent: React.FC<{ params: any }> = ({ params }) => {
  // Original static data structure
  const HOTEL_DETAILS = {
    rating: 4.92,
    guests: "2 guests",
    defaultNights: 0,
    defaultPricePerNight: 250,
    defaultTaxes: 0,
    paymentLogo:
      "https://www.uxdt.nic.in/wp-content/uploads/2020/06/Preview.png?x10327",
    defaultImageUrl:
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
  };

  const user = useAppSelector(selectUser);
  const router = useRouter();

  console.log("user is coming or not");
  console.log(user);
  console.log(user == null);

  useEffect(() => {
    console.log("use effect is called");
    if (user === null || user === undefined) {
      console.log("User not found, redirecting to login");
      router.push("/login");
    }
  }, [user, router]);

  // --- STATE ---
  const [hotelList, setHotelList] = useState<any>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isDateModalOpen, setDateModalOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isGuestModalOpen, setGuestModalOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState<string>("Online");

  // UPDATED GUEST STATE - Maximum 2 adults and 1 child
  const [adultCount, setAdultCount] = useState<number>(2);
  const [childCount, setChildCount] = useState<number>(0);

  // Use dayjs for state management
  const today = dayjs().startOf("day");
  const [startDate, setStartDate] = useState<Dayjs | null>(today);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // --- DATA FETCHING ---
  const {
    isError,
    isLoading,
    data: fetchedData,
    error,
    mutate: fetchRoom,
  } = useFindRoom();

  useEffect(() => {
    if (params) fetchRoom({ params });
  }, [params, fetchRoom]);

  useEffect(() => {
    if (isError) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
      router.push("/login");
    }
    if (fetchedData?.data) {
      setHotelList(fetchedData.data);
    }
  }, [isError, isLoading, error, fetchedData, router]);

  // --- DERIVED VALUES (using dayjs) ---
  const { days, totalAmount, pricePerNight, taxes } = useMemo(() => {
    const isDateRangeValid =
      startDate &&
      endDate &&
      startDate.isValid() &&
      endDate.isValid() &&
      startDate.isBefore(endDate);
    const currentDays = isDateRangeValid
      ? endDate.diff(startDate, "day")
      : HOTEL_DETAILS.defaultNights;

    const currentPricePerNight = hotelList?.base_price
      ? parseFloat(hotelList.base_price)
      : HOTEL_DETAILS.defaultPricePerNight;
    const currentTaxes = hotelList?.taxes ? parseFloat(hotelList.taxes) : 0;

    const currentTotal = currentDays * currentPricePerNight + currentTaxes;

    return {
      days: currentDays,
      totalAmount: currentTotal,
      pricePerNight: currentPricePerNight,
      taxes: currentTaxes,
    };
  }, [startDate, endDate, hotelList, HOTEL_DETAILS]);

  // --- HANDLERS (using dayjs) ---
  const handleStartDateChange = (date: Dayjs | null) => {
    if (date && date.isValid()) {
      const normalizedDate = date.startOf("day");
      setStartDate(normalizedDate);
      if (
        endDate &&
        (normalizedDate.isSame(endDate) || normalizedDate.isAfter(endDate))
      ) {
        setEndDate(null);
      }
    }
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    if (date && date.isValid() && startDate && date.isAfter(startDate)) {
      setEndDate(date.startOf("day"));
    }
  };

  // UPDATED GUEST HANDLERS - Maximum 2 adults and 1 child
  const handleAdultIncrement = () => {
    if (adultCount < 2) {
      setAdultCount(adultCount + 1);
    }
  };

  const handleAdultDecrement = () => {
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
    }
  };

  const handleChildIncrement = () => {
    if (childCount < 1) {
      setChildCount(childCount + 1);
    }
  };

  const handleChildDecrement = () => {
    if (childCount > 0) {
      setChildCount(childCount - 1);
    }
  };

  // --- PAYMENT INTEGRATION ---
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // --- NEW COD PAYMENT FUNCTION ---
  const makeCODPayment = async () => {
    setIsBooking(true);

    const bookingPayload = {
      hotel_id: hotelList.hotel.id,
      check_in_datetime: startDate,
      check_out_datetime: endDate,
      days: days,
      item_id: hotelList.id,
      total_amount: totalAmount,
      user_id: user.id,
      booking_type: "HOTEL",
      amount: totalAmount,
      order_type: "HOTEL",
      currency: "INR",
      tax_amount: taxes,
      adult_count: adultCount,
      child_count: childCount,
      total_guests: adultCount + childCount,
      payment_method: "COD", // Add this to distinguish COD orders
    };

    try {
      const response = await fetch("http://localhost:8000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });
      const result = await response.json();

      if (result.error) throw new Error(result.error);

      // For COD, we don't need Razorpay verification
      toast.success("Booking confirmed! Pay at the hotel counter.");
      router.push("/thankyou");
    } catch (err: any) {
      toast.error(err.message || "Failed to create booking.");
    } finally {
      setIsBooking(false);
    }
  };

  // --- EXISTING RAZORPAY PAYMENT FUNCTION (UNCHANGED) ---
  const makeOnlinePayment = async () => {
    setIsBooking(true);

    const bookingPayload = {
      hotel_id: hotelList.hotel.id,
      check_in_datetime: startDate,
      check_out_datetime: endDate,
      days: days,
      item_id: hotelList.id,
      total_amount: totalAmount,
      user_id: user.id,
      booking_type: "HOTEL",
      amount: totalAmount,
      order_type: "HOTEL",
      currency: "INR",
      tax_amount: taxes,
      adult_count: adultCount,
      child_count: childCount,
      total_guests: adultCount + childCount,
    };

    try {
      const response = await fetch("http://localhost:8000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });
      const order = await response.json();

      if (order.error) throw new Error(order.error);

      const options = {
        key: order.data.key,
        amount: order.data.amount,
        currency: order.data.currency,
        order_id: order.data.order_id,
        name: hotelList.hotel.name,
        description: `Booking for ${hotelList.type_name}`,
        handler: async function (response: any) {
          const verify = await fetch("http://localhost:8000/order/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, bill_id: order.data.bill_id }),
          });
          const result = await verify.json();
          toast.success(result.message || "Payment Successful!");
          router.push("/thankyou");
        },
        prefill: {
          name: `${user.firstName} ${user.lastName}`,
          email: `${user?.email}`,
          contact: "892389389",
        },
        theme: { color: "#2563EB" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", (response: any) =>
        toast.error("Payment failed: " + response.error.description)
      );
      rzp.open();
    } catch (err: any) {
      toast.error(err.message || "Failed to initiate payment.");
    } finally {
      setIsBooking(false);
    }
  };

  // --- MAIN PAYMENT HANDLER ---
  const handlePayment = () => {
    if (paymentOption === "Cash on Counter") {
      makeCODPayment();
    } else {
      makeOnlinePayment();
    }
  };

  // --- RENDER ---
  if (isLoading)
    return (
      <div className="bg-gray-50 min-h-screen">
        <LoadingSkeleton />
      </div>
    );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="min-h-screen bg-gray-50 font-sans">
        <main className="max-w-4xl mx-auto w-full p-4 sm:p-6 space-y-8">
          <section className="bg-white rounded-2xl shadow-lg border border-gray-200/80 p-6 flex flex-col sm:flex-row gap-6">
            <div className="flex flex-col gap-2 flex-1">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
                {hotelList?.type_name || "Room Type"}
              </p>
              <h1 className="text-gray-900 text-3xl font-bold">
                {hotelList?.hotel?.name || "Hotel Name"}
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Rating:{" "}
                <span className="font-bold text-yellow-500">
                  {HOTEL_DETAILS.rating} ★
                </span>
              </p>
            </div>
            <div
              className="w-full sm:w-1/3 h-48 rounded-xl bg-cover bg-center"
              style={{
                backgroundImage: `url("${
                  hotelList?.room_img || HOTEL_DETAILS.defaultImageUrl
                }")`,
              }}
            ></div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Trip</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md border border-gray-200/80">
                <div>
                  <p className="font-semibold text-gray-800">Dates</p>
                  <p className="text-gray-600 text-sm">
                    {startDate && startDate.isValid()
                      ? startDate.format("MMM D, YYYY")
                      : "Select check-in"}
                    {endDate && endDate.isValid()
                      ? ` → ${endDate.format("MMM D, YYYY")}`
                      : ""}
                  </p>
                </div>
                <Button variant="text" onClick={() => setDateModalOpen(true)}>
                  Edit
                </Button>
              </div>

              {/* UPDATED GUESTS SECTION */}
              <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md border border-gray-200/80">
                <div>
                  <p className="font-semibold text-gray-800">Guests</p>
                  <p className="text-gray-600 text-sm">
                    {adultCount} {adultCount === 1 ? "adult" : "adults"}
                    {childCount > 0 && `, ${childCount} child`}
                  </p>
                </div>
                <Button variant="text" onClick={() => setGuestModalOpen(true)}>
                  Edit
                </Button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Total
            </h2>
            <div className="space-y-3 bg-white rounded-xl shadow-lg border border-gray-200/80 p-6">
              <div className="flex items-center justify-between text-gray-700">
                <p>Hotel</p>
                <p>₹{(pricePerNight * days).toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between text-gray-700">
                <p>Taxes & fees</p>
                <p>₹{taxes.toLocaleString()}</p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-2 text-gray-900">
                <p className="font-bold text-lg">Total</p>
                <p className="font-bold text-lg">
                  ₹{totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Pay with</h2>
            <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md border border-gray-200/80">
              <div className="flex items-center gap-4">
                <img
                  src={
                    paymentOption === "Online"
                      ? HOTEL_DETAILS.paymentLogo
                      : "https://img.icons8.com/ios-filled/50/cash-in-hand.png"
                  }
                  alt="Payment Method"
                  className="h-6 object-contain"
                />
                <p className="font-semibold text-gray-800">{paymentOption}</p>
              </div>
              <Button variant="text" onClick={() => setPaymentModalOpen(true)}>
                Edit
              </Button>
            </div>
          </section>
        </main>

        <footer className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200 sticky bottom-0">
          <div className="max-w-4xl mx-auto">
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handlePayment} // Changed from makePayment
              disabled={isBooking || !startDate || !endDate || days <= 0}
              sx={{
                textTransform: "none",
                py: 1.5,
                fontSize: "1rem",
                borderRadius: "12px",
              }}
            >
              {isBooking ? (
                <CircularProgress size={24} color="inherit" />
              ) : paymentOption === "Cash on Counter" ? (
                "Confirm Booking"
              ) : (
                "Request to Book"
              )}
            </Button>
          </div>
        </footer>

        {/* DATE MODAL */}
        <Dialog
          open={isDateModalOpen}
          onClose={() => setDateModalOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }}>
            Select Dates
            <IconButton
              aria-label="close"
              onClick={() => setDateModalOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box display="flex" flexDirection="column" gap={3} py={1}>
              <DatePicker
                label="Check-in Date"
                value={startDate}
                onChange={handleStartDateChange}
                minDate={today}
              />
              <DatePicker
                label="Check-out Date"
                value={endDate}
                onChange={handleEndDateChange}
                minDate={startDate ? startDate.add(1, "day") : today}
                disabled={!startDate}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: "16px 24px" }}>
            <Button variant="contained" onClick={() => setDateModalOpen(false)}>
              Done
            </Button>
          </DialogActions>
        </Dialog>

        {/* UPDATED GUEST SELECTION MODAL - Maximum 2 adults and 1 child */}
        <Dialog
          open={isGuestModalOpen}
          onClose={() => setGuestModalOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }}>
            Select Guests
            <IconButton
              aria-label="close"
              onClick={() => setGuestModalOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box display="flex" flexDirection="column" gap={4} py={2}>
              {/* Adults Section */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Adults
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ages 13 or above
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <IconButton
                    onClick={handleAdultDecrement}
                    disabled={adultCount <= 1}
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      "&:disabled": {
                        bgcolor: "#f5f5f5",
                        color: "#bdbdbd",
                      },
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography
                    variant="h6"
                    sx={{
                      minWidth: "40px",
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "primary.main",
                    }}
                  >
                    {adultCount}
                  </Typography>

                  <IconButton
                    onClick={handleAdultIncrement}
                    disabled={adultCount >= 2}
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      "&:disabled": {
                        bgcolor: "#f5f5f5",
                        color: "#bdbdbd",
                      },
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Divider */}
              <Box sx={{ borderBottom: "1px solid #e0e0e0" }} />

              {/* Children Section */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Children
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ages 2-12
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <IconButton
                    onClick={handleChildDecrement}
                    disabled={childCount <= 0}
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      "&:disabled": {
                        bgcolor: "#f5f5f5",
                        color: "#bdbdbd",
                      },
                    }}
                  >
                    <RemoveIcon />
                  </IconButton>

                  <Typography
                    variant="h6"
                    sx={{
                      minWidth: "40px",
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "primary.main",
                    }}
                  >
                    {childCount}
                  </Typography>

                  <IconButton
                    onClick={handleChildIncrement}
                    disabled={childCount >= 1}
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      "&:disabled": {
                        bgcolor: "#f5f5f5",
                        color: "#bdbdbd",
                      },
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              {/* Info Text */}
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
                sx={{ mt: 1 }}
              >
                Maximum 2 adults and 1 child allowed
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: "16px 24px" }}>
            <Button
              variant="contained"
              onClick={() => setGuestModalOpen(false)}
              sx={{ borderRadius: "8px" }}
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>

        {/* PAYMENT MODAL */}
        <Dialog
          open={isPaymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }}>
            Payment Method
            <IconButton
              aria-label="close"
              onClick={() => setPaymentModalOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <FormControl component="fieldset" sx={{ width: "100%", py: 1 }}>
              <RadioGroup
                value={paymentOption}
                onChange={(e) => setPaymentOption(e.target.value)}
              >
                <FormControlLabel
                  value="Online"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <PaymentIcon />
                      <Typography>Online</Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="Cash on Counter"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <MoneyIcon />
                      <Typography>Pay at Hotel</Typography>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ p: "16px 24px" }}>
            <Button
              variant="contained"
              onClick={() => setPaymentModalOpen(false)}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default HotelBookingComponent;
