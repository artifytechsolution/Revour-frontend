//old code

/* -------------------------------------------------------------------------- */
/* ExperiencesComponent.tsx */
/* -------------------------------------------------------------------------- */
// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Rating,
//   TextField,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormLabel,
//   Skeleton,
//   Card,
//   CardContent,
//   Typography,
//   Divider,
// } from "@mui/material";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import {
//   DatePicker,
//   TimePicker,
//   LocalizationProvider,
// } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { format } from "date-fns";

// import { useExperience } from "@src/hooks/apiHooks";
// import { useAppSelector } from "@src/redux/store";
// import { selectSearchDetails } from "@src/redux/reducers/authSlice";

// /* -------------------------------------------------------------------------- */
// /* Types & constants */
// /* -------------------------------------------------------------------------- */
// interface IExperience {
//   id?: string;
//   title: string;
//   star_rating: number;
//   hours: string;
//   address: string;
//   price: number;
//   tag?: "Popular" | "New" | "Limited";
//   images: { image_url: string }[];
// }

// interface IBookingData {
//   experience: IExperience;
//   selectedDate: Date;
//   selectedTime: Date;
//   paymentMethod: "online" | "COD";
//   totalAmount: number;
//   bookingId?: string;
// }

// const EXPERIENCES_PER_PAGE = 6;
// const MAX_PAGE_NUMBERS_TO_SHOW = 3;
// const defaultImage =
//   "https://images.pexels.com/photos/3889987/pexels-photo-3889987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

// /* -------------------------------------------------------------------------- */
// /* Skeleton Components */
// /* -------------------------------------------------------------------------- */
// const ExperienceCardSkeleton = () => (
//   <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white">
//     {/* Image Skeleton */}
//     <div className="relative w-full h-36 sm:h-44 lg:h-52">
//       <Skeleton
//         variant="rectangular"
//         width="100%"
//         height="100%"
//         sx={{ borderRadius: 0 }}
//       />
//       {/* Tag Skeleton */}
//       <div className="absolute top-2 right-2">
//         <Skeleton
//           variant="rectangular"
//           width={60}
//           height={24}
//           sx={{ borderRadius: 3 }}
//         />
//       </div>
//     </div>

//     {/* Content Skeleton */}
//     <div className="p-4 flex flex-col flex-grow justify-between">
//       <div>
//         {/* Title Skeleton */}
//         <Skeleton variant="text" width="85%" height={24} sx={{ mb: 1 }} />
//         <Skeleton variant="text" width="70%" height={24} sx={{ mb: 2 }} />

//         {/* Rating Skeleton */}
//         <div className="flex items-center gap-2 mb-2">
//           <Skeleton
//             variant="rectangular"
//             width={100}
//             height={16}
//             sx={{ borderRadius: 1 }}
//           />
//           <Skeleton variant="circular" width={4} height={4} />
//           <Skeleton variant="text" width={80} height={16} />
//         </div>

//         {/* Duration Skeleton */}
//         <div className="flex items-center gap-2 mb-1">
//           <Skeleton variant="circular" width={18} height={18} />
//           <Skeleton variant="text" width={80} height={16} />
//         </div>

//         {/* Address Skeleton */}
//         <div className="flex items-center gap-2">
//           <Skeleton variant="circular" width={16} height={16} />
//           <Skeleton variant="text" width="90%" height={16} />
//         </div>
//       </div>

//       {/* Price and Button Skeleton */}
//       <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
//         <div>
//           <Skeleton variant="text" width={80} height={24} />
//         </div>
//         <Skeleton
//           variant="rectangular"
//           width={85}
//           height={36}
//           sx={{ borderRadius: 2 }}
//         />
//       </div>
//     </div>
//   </div>
// );

// const ExperiencesSkeletonLoader = () => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
//     {[1, 2, 3, 4, 5, 6].map((index) => (
//       <ExperienceCardSkeleton key={index} />
//     ))}
//   </div>
// );

// /* -------------------------------------------------------------------------- */
// /* Component */
// /* -------------------------------------------------------------------------- */
// const ExperiencesComponent: React.FC = () => {
//   const router = useRouter();
//   const searchDetails = useAppSelector(selectSearchDetails); // { destination, date }
//   const {
//     isError,
//     isLoading,
//     data,
//     error,
//     mutate: fetchExperiences,
//   } = useExperience();

//   /* ------------------------- Experiences & pagination --------------------- */
//   const [experienceList, setExperienceList] = useState<IExperience[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLastPage, setIsLastPage] = useState(false);
//   const [totalPages, setTotalPages] = useState<number | null>(null);

//   useEffect(() => {
//     if (isError && !isLoading) {
//       toast.error(error instanceof Error ? error.message : "An error occurred");
//       router.push("/login");
//     }
//     if (Array.isArray(data?.data?.experience)) {
//       const fetched = data.data.experience;
//       setExperienceList(fetched);
//       if (fetched.length < EXPERIENCES_PER_PAGE) {
//         setIsLastPage(true);
//         setTotalPages(currentPage);
//       } else {
//         setIsLastPage(false);
//       }
//     }
//   }, [isError, isLoading, error, data, router, currentPage]);

//   useEffect(() => {
//     setCurrentPage(1);
//     setIsLastPage(false);
//     setTotalPages(null);
//   }, [searchDetails?.destination]);

//   useEffect(() => {
//     fetchExperiences({
//       limit: EXPERIENCES_PER_PAGE,
//       page: currentPage,
//       search: searchDetails?.destination || "ahmadabad",
//     });
//   }, [fetchExperiences, currentPage, searchDetails?.destination]);

//   /* ------------------------- Pagination helpers --------------------------- */
//   const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
//   const handleNext = () => !isLastPage && setCurrentPage((p) => p + 1);
//   const handlePageClick = (page: number) => setCurrentPage(page);

//   const pageNumbersToDisplay = useMemo(() => {
//     if (totalPages) {
//       const half = Math.floor(MAX_PAGE_NUMBERS_TO_SHOW / 2);
//       let start = Math.max(1, currentPage - half);
//       let end = Math.min(totalPages, currentPage + half);
//       if (end - start + 1 < MAX_PAGE_NUMBERS_TO_SHOW) {
//         if (currentPage < totalPages / 2) {
//           end = Math.min(totalPages, start + MAX_PAGE_NUMBERS_TO_SHOW - 1);
//         } else {
//           start = Math.max(1, end - MAX_PAGE_NUMBERS_TO_SHOW + 1);
//         }
//       }
//       return Array.from({ length: end - start + 1 }, (_, i) => start + i);
//     }
//     const pages = [currentPage];
//     if (!isLastPage) pages.push(currentPage + 1);
//     return pages;
//   }, [currentPage, totalPages, isLastPage]);

//   /* ----------------------------- Booking modal ---------------------------- */
//   const [open, setOpen] = useState(false);
//   const [selectedExp, setSelectedExp] = useState<IExperience | null>(null);
//   const [date, setDate] = useState<Date | null>(null);
//   const [time, setTime] = useState<Date | null>(null);
//   const [payment, setPayment] = useState<"online" | "COD">("online");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [bookingConfirmation, setBookingConfirmation] =
//     useState<IBookingData | null>(null);

//   const openModal = (exp: IExperience) => {
//     setSelectedExp(exp);
//     setDate(searchDetails?.date ? new Date(searchDetails.date) : new Date());
//     setTime(null);
//     setPayment("online");
//     setOpen(true);
//   };

//   const closeModal = () => {
//     setOpen(false);
//     setBookingConfirmation(null);
//   };

//   // Create booking payload
//   const createBookingPayload = (
//     experienceData: IExperience,
//     selectedDate: Date,
//     selectedTime: Date
//   ) => {
//     const bookingDateTime = new Date(selectedDate);
//     bookingDateTime.setHours(
//       selectedTime.getHours(),
//       selectedTime.getMinutes()
//     );

//     return {
//       experience_id: experienceData.id,
//       experience_title: experienceData.title,
//       booking_datetime: bookingDateTime.toISOString(),
//       booking_date: format(selectedDate, "yyyy-MM-dd"),
//       booking_time: format(selectedTime, "HH:mm"),
//       duration_hours: experienceData.hours,
//       location: experienceData.address,
//       total_amount: experienceData.price,
//       payment_method: payment,
//       booking_type: "EXPERIENCE",
//       currency: "USD",
//       guest_count: 1, // You can make this dynamic if needed
//     };
//   };

//   // Handle online payment with Razorpay
//   // const handleOnlinePayment = async (bookingData: IBookingData) => {
//   //   const bookingPayload = createBookingPayload(
//   //     bookingData.experience,
//   //     bookingData.selectedDate,
//   //     bookingData.selectedTime
//   //   );

//   //   try {
//   //     setIsSubmitting(true);

//   //     // Create order
//   //     const response = await fetch("http://localhost:8000/order", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(bookingPayload),
//   //     });

//   //     const order = await response.json();

//   //     if (order.error) throw new Error(order.error);

//   //     const options = {
//   //       key: order.data.key,
//   //       amount: order.data.amount,
//   //       currency: order.data.currency,
//   //       order_id: order.data.order_id,
//   //       name: bookingData.experience.title,
//   //       description: `Experience booking for ${bookingData.experience.hours} hours`,
//   //       handler: async function (response: any) {
//   //         try {
//   //           const verify = await fetch("http://localhost:8000/order/verify", {
//   //             method: "POST",
//   //             headers: { "Content-Type": "application/json" },
//   //             body: JSON.stringify({
//   //               ...response,
//   //               bill_id: order.data.bill_id,
//   //             }),
//   //           });

//   //           const result = await verify.json();

//   //           if (result.success) {
//   //             // Update booking confirmation with payment details
//   //             setBookingConfirmation({
//   //               ...bookingData,
//   //               bookingId: result.booking_id || `EXP-${Date.now()}`,
//   //             });

//   //             toast.success("Payment successful! Your experience is booked!");
//   //             console.log("Booking Details:", {
//   //               experience: bookingData.experience,
//   //               selectedDate: format(bookingData.selectedDate, "PPP"),
//   //               selectedTime: format(bookingData.selectedTime, "HH:mm"),
//   //               paymentMethod: bookingData.paymentMethod,
//   //               totalAmount: bookingData.totalAmount,
//   //               bookingId: result.booking_id || `EXP-${Date.now()}`,
//   //               status: "confirmed",
//   //             });
//   //           } else {
//   //             throw new Error(result.message || "Payment verification failed");
//   //           }
//   //         } catch (verifyError) {
//   //           console.error("Payment verification error:", verifyError);
//   //           toast.error("Payment verification failed. Please contact support.");
//   //         }
//   //       },
//   //       prefill: {
//   //         name: "User Name", // Replace with actual user data
//   //         email: "user@example.com", // Replace with actual user email
//   //         contact: "9999999999", // Replace with actual user contact
//   //       },
//   //       theme: { color: "#16A34A" },
//   //     };

//   //     const rzp = new (window as any).Razorpay(options);
//   //     rzp.on("payment.failed", (response: any) => {
//   //       console.error("Payment failed:", response.error);
//   //       toast.error("Payment failed: " + response.error.description);
//   //     });

//   //     rzp.open();
//   //   } catch (err) {
//   //     console.error("Payment initiation error:", err);
//   //     toast.error(
//   //       err instanceof Error ? err.message : "Failed to initiate payment."
//   //     );
//   //   } finally {
//   //     setIsSubmitting(false);
//   //   }
//   // };

//   const handleOnlinePayment = async (bookingData: IBookingData) => {
//     setIsSubmitting(true);

//     const bookingPayload = {
//       //"hotel_id": "1f859e1d-21b7-43ec-adb8-4aee38f7c86f",
//       check_in_datetime: "2025-07-26T10:00:00",
//       check_out_datetime: "2025-07-26T16:00:00",
//       days: "0",
//       item_id: "8fc82038-c186-4f97-9f6e-2aa81851466b",
//       experience_id: "8fc82038-c186-4f97-9f6e-2aa81851466b",
//       total_amount: "2000",
//       booking_type: "EXPERIENCE",
//       payment_method: "ONLINE",
//       //   "duration_hours": 6,
//       amount: 100,
//       order_type: "EXPERIENCE",
//       user_id: "4b2c3de9-5803-463e-83c3-309bb4c552e8",
//       currency: "INR",
//       tax_amount: 0,
//     };

//     try {
//       console.log("booking data is commminggg--------");
//       console.log(bookingData);
//       // const response = await fetch("http://localhost:8000/order", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify(bookingPayload),
//       // });
//       // const order = await response.json();
//       // if (order.error) throw new Error(order.error);
//       // const options = {
//       //   key: order.data.key,
//       //   amount: order.data.amount,
//       //   currency: order.data.currency,
//       //   order_id: order.data.order_id,
//       //   name: selectedHotel?.name,
//       //   description: `Booking for HOURLY`,
//       //   handler: async function (response: any) {
//       //     const verify = await fetch("http://localhost:8000/order/verify", {
//       //       method: "POST",
//       //       headers: { "Content-Type": "application/json" },
//       //       body: JSON.stringify({ ...response, bill_id: order.data.bill_id }),
//       //     });
//       //     const result = await verify.json();
//       //     toast.success(result.message || "Payment Successful!");
//       //     router.push("/home");
//       //   },
//       //   prefill: {
//       //     name: `${user.firstName} ${user.lastName}`,
//       //     email: `${user?.email}`,
//       //     contact: "892389389",
//       //   },
//       //   theme: { color: "#16A34A" }, // Changed from blue to green
//       // };
//       // const rzp = new (window as any).Razorpay(options);
//       // rzp.on("payment.failed", (response: any) =>
//       //   toast.error("Payment failed: " + response.error.description)
//       // );
//       // rzp.open();
//     } catch (err: any) {
//       toast.error(err || "Failed to initiate payment.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle COD booking
//   const handleCODBooking = async (bookingData: IBookingData) => {
//     const bookingPayload = createBookingPayload(
//       bookingData.experience,
//       bookingData.selectedDate,
//       bookingData.selectedTime
//     );

//     try {
//       setIsSubmitting(true);

//       // Create COD booking
//       const response = await fetch("http://localhost:8000/booking/cod", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingPayload),
//       });

//       const result = await response.json();

//       if (result.success) {
//         setBookingConfirmation({
//           ...bookingData,
//           bookingId: result.booking_id || `EXP-COD-${Date.now()}`,
//         });

//         toast.success("Booking confirmed! Pay on arrival.");
//         console.log("COD Booking Details:", {
//           experience: bookingData.experience,
//           selectedDate: format(bookingData.selectedDate, "PPP"),
//           selectedTime: format(bookingData.selectedTime, "HH:mm"),
//           paymentMethod: bookingData.paymentMethod,
//           totalAmount: bookingData.totalAmount,
//           bookingId: result.booking_id || `EXP-COD-${Date.now()}`,
//           status: "confirmed",
//         });
//       } else {
//         throw new Error(result.message || "Booking failed");
//       }
//     } catch (err) {
//       console.error("COD booking error:", err);
//       toast.error(
//         err instanceof Error ? err.message : "Failed to create booking."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Main booking handler
//   const handleConfirm = async () => {
//     if (!selectedExp || !date || !time) {
//       toast.error("Please select both date and time");
//       return;
//     }

//     const bookingData: IBookingData = {
//       experience: selectedExp,
//       selectedDate: date,
//       selectedTime: time,
//       paymentMethod: payment,
//       totalAmount: selectedExp.price,
//     };

//     // Print booking data to console
//     console.log("Submitting Experience Booking:", {
//       experience: {
//         id: selectedExp.id,
//         title: selectedExp.title,
//         duration: selectedExp.hours,
//         location: selectedExp.address,
//         rating: selectedExp.star_rating,
//         price: selectedExp.price,
//       },
//       selectedDate: format(date, "PPP"),
//       selectedTime: format(time, "HH:mm"),
//       paymentMethod: payment,
//       totalAmount: selectedExp.price,
//       timestamp: new Date().toISOString(),
//     });

//     if (payment === "online") {
//       await handleOnlinePayment(bookingData);
//     } else {
//       await handleCODBooking(bookingData);
//     }
//   };

//   /* ------------------------------------------------------------------------ */
//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <main className="max-w-[600px] mx-auto lg:max-w-7xl lg:px-6 pb-12 lg:pb-10">
//         <div className="px-4 lg:px-0 py-6">
//           <h2 className="text-xl lg:text-2xl font-semibold mb-6 text-gray-900">
//             Discover Amazing Experiences ✨
//           </h2>

//           {/* ----------------------------- State UI -------------------------- */}
//           {isLoading && experienceList.length === 0 ? (
//             <ExperiencesSkeletonLoader />
//           ) : experienceList.length > 0 ? (
//             <>
//               {/* -------------------- Experience cards ---------------------- */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
//                 {experienceList.map((exp, idx) => (
//                   <div
//                     key={exp.id || `${exp.title}-${idx}`}
//                     className="flex flex-col border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
//                   >
//                     <div
//                       className="relative w-full h-36 sm:h-44 lg:h-52 bg-gray-200"
//                       style={{
//                         backgroundImage: `url(${
//                           exp.images?.[0]?.image_url ?? defaultImage
//                         })`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                       }}
//                     >
//                       {exp.tag && (
//                         <span
//                           className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-medium ${
//                             exp.tag === "Popular"
//                               ? "bg-green-100 text-green-800"
//                               : exp.tag === "New"
//                               ? "bg-green-100 text-green-800"
//                               : "bg-red-100 text-red-800"
//                           }`}
//                         >
//                           {exp.tag}
//                         </span>
//                       )}
//                     </div>

//                     <div className="p-4 flex flex-col flex-grow justify-between">
//                       <div>
//                         <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2">
//                           {exp.title}
//                         </h3>
//                         <div className="flex items-center text-xs text-gray-600 gap-2 mb-2">
//                           <Rating
//                             name="read-only-rating"
//                             value={exp.star_rating}
//                             precision={0.5}
//                             size="small"
//                             readOnly
//                           />
//                           <span className="text-gray-400">•</span>
//                           <span>{exp.star_rating} reviews</span>
//                         </div>
//                         <div className="text-sm text-gray-600 flex flex-col gap-1">
//                           <div className="flex items-center gap-2">
//                             <AccessTimeIcon
//                               sx={{ fontSize: 18, color: "text.secondary" }}
//                             />
//                             <span>{exp.hours} Hours</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             {/* location icon */}
//                             <svg
//                               className="w-4 h-4 text-gray-500"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
//                               />
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                               />
//                             </svg>
//                             <span>{exp.address}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
//                         <p className="text-base font-semibold text-gray-900">
//                           ${exp.price}
//                           <span className="text-sm font-normal text-gray-600">
//                             {" "}
//                             / person
//                           </span>
//                         </p>
//                         <button
//                           onClick={() => openModal(exp)}
//                           className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700"
//                         >
//                           Book&nbsp;Now
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* ------------------------ Pagination ------------------------ */}
//               {!isLoading && (
//                 <div className="flex flex-wrap justify-center items-center mt-10 gap-2">
//                   <button
//                     onClick={handlePrev}
//                     disabled={currentPage === 1}
//                     className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300"
//                   >
//                     Previous
//                   </button>
//                   {pageNumbersToDisplay.map((p) => (
//                     <button
//                       key={p}
//                       onClick={() => handlePageClick(p)}
//                       className={`px-4 py-2 rounded-full text-sm font-medium ${
//                         currentPage === p
//                           ? "bg-green-600 text-white"
//                           : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//                       }`}
//                     >
//                       {p}
//                     </button>
//                   ))}
//                   <button
//                     onClick={handleNext}
//                     disabled={isLastPage}
//                     className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:bg-gray-300"
//                   >
//                     Next
//                   </button>
//                 </div>
//               )}
//             </>
//           ) : (
//             <div className="text-center py-16">
//               <div className="flex flex-col items-center justify-center">
//                 <div className="w-24 h-24 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//                   <svg
//                     className="w-12 h-12 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   No experiences found
//                 </h3>
//                 <p className="text-gray-600 max-w-md">
//                   We couldn't find any experiences for this destination. Try
//                   searching for a different location or check back later.
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* ----------------------------- Booking Dialog ------------------------ */}
//       <Dialog open={open} onClose={closeModal} maxWidth="sm" fullWidth>
//         <DialogTitle>Book Experience</DialogTitle>
//         <DialogContent dividers>
//           {selectedExp && (
//             <Box display="flex" flexDirection="column" gap={2} mt={1}>
//               <Typography variant="h6" gutterBottom>
//                 {selectedExp.title}
//               </Typography>

//               <Typography variant="body2" color="text.secondary" gutterBottom>
//                 Duration: {selectedExp.hours} hours • Location:{" "}
//                 {selectedExp.address}
//               </Typography>

//               {/* Date & Time pickers */}
//               <DatePicker
//                 label="Select Date"
//                 value={date}
//                 onChange={(newVal) => setDate(newVal)}
//                 slotProps={{ textField: { fullWidth: true } }}
//                 minDate={new Date()}
//               />
//               <TimePicker
//                 label="Select Time"
//                 value={time}
//                 onChange={(newVal) => setTime(newVal)}
//                 slotProps={{ textField: { fullWidth: true } }}
//               />

//               {/* Payment Method */}
//               <FormLabel component="legend" sx={{ mt: 2 }}>
//                 Payment Method
//               </FormLabel>
//               <RadioGroup
//                 row
//                 value={payment}
//                 onChange={(e) => setPayment(e.target.value as "online" | "COD")}
//               >
//                 <FormControlLabel
//                   value="online"
//                   control={<Radio />}
//                   label="Pay Online"
//                 />
//                 <FormControlLabel
//                   value="COD"
//                   control={<Radio />}
//                   label="Pay on Arrival"
//                 />
//               </RadioGroup>

//               {/* Summary */}
//               {date && time && (
//                 <Card variant="outlined" sx={{ mt: 2 }}>
//                   <CardContent>
//                     <Typography variant="subtitle2" gutterBottom>
//                       Booking Summary
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Date: {format(date, "PPP")}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Time: {format(time, "HH:mm")}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Duration: {selectedExp.hours} hours
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Payment:{" "}
//                       {payment === "online" ? "Pay Online" : "Pay on Arrival"}
//                     </Typography>
//                     <Divider sx={{ my: 1 }} />
//                     <Box
//                       display="flex"
//                       justifyContent="space-between"
//                       alignItems="center"
//                     >
//                       <Typography variant="subtitle1" fontWeight="bold">
//                         Total Amount:
//                       </Typography>
//                       <Typography
//                         variant="h6"
//                         fontWeight="bold"
//                         color="primary"
//                       >
//                         ${selectedExp.price}
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               )}

//               {/* Booking Confirmation */}
//               {bookingConfirmation && (
//                 <Card variant="outlined" sx={{ mt: 2, bgcolor: "success.50" }}>
//                   <CardContent>
//                     <Typography variant="h6" color="success.main" gutterBottom>
//                       🎉 Booking Confirmed!
//                     </Typography>
//                     <Typography variant="body2">
//                       Booking ID: {bookingConfirmation.bookingId}
//                     </Typography>
//                     <Typography variant="body2">
//                       Experience: {bookingConfirmation.experience.title}
//                     </Typography>
//                     <Typography variant="body2">
//                       Date & Time:{" "}
//                       {format(bookingConfirmation.selectedDate, "PPP")} at{" "}
//                       {format(bookingConfirmation.selectedTime, "HH:mm")}
//                     </Typography>
//                     <Typography variant="body2">
//                       Total Paid: ${bookingConfirmation.totalAmount}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               )}
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeModal} disabled={isSubmitting}>
//             {bookingConfirmation ? "Close" : "Cancel"}
//           </Button>
//           {!bookingConfirmation && (
//             <Button
//               variant="contained"
//               onClick={handleConfirm}
//               disabled={!date || !time || isSubmitting}
//             >
//               {isSubmitting ? "Processing..." : "Confirm Booking"}
//             </Button>
//           )}
//         </DialogActions>
//       </Dialog>
//     </LocalizationProvider>
//   );
// };

// export default ExperiencesComponent;

"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Skeleton,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  IconButton,
} from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format, isToday, isFuture } from "date-fns";

import { useExperience } from "@src/hooks/apiHooks";
import { useAppSelector } from "@src/redux/store";
import { selectSearchDetails, selectUser } from "@src/redux/reducers/authSlice";

/* -------------------------------------------------------------------------- */
/* TypeScript Declarations */
/* -------------------------------------------------------------------------- */
declare global {
  interface Window {
    Razorpay: any;
  }
}

/* -------------------------------------------------------------------------- */
/* Types & Constants */
/* -------------------------------------------------------------------------- */
interface IExperience {
  id: string;
  title: string;
  star_rating: number;
  hours: string;
  address: string;
  price: number;
  tag?: "Popular" | "New" | "Limited";
  images: { image_url: string }[];
  description?: string;
}

interface IBookingData {
  experience: IExperience;
  selectedDate: Date;
  selectedTime: Date;
  paymentMethod: "online" | "COD";
  totalAmount: number;
}

interface IBookingConfirmation {
  bookingId: string;
  experience: IExperience;
  selectedDate: Date;
  selectedTime: Date;
  totalAmount: number;
  paymentId?: string;
  paymentMethod: string;
}

const EXPERIENCES_PER_PAGE = 6;
const MAX_PAGE_NUMBERS = 3;
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=60";

/* -------------------------------------------------------------------------- */
/* Skeleton Components */
/* -------------------------------------------------------------------------- */
const ExperienceCardSkeleton = () => (
  <Card sx={{ height: "100%" }}>
    <Skeleton variant="rectangular" height={200} />
    <CardContent>
      <Skeleton height={32} width="80%" sx={{ mb: 1 }} />
      <Skeleton height={20} width="60%" sx={{ mb: 2 }} />
      <Box display="flex" gap={2} mb={1}>
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton height={20} width="50%" />
      </Box>
      <Box display="flex" gap={2} mb={2}>
        <Skeleton variant="circular" width={20} height={20} />
        <Skeleton height={20} width="70%" />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Skeleton height={28} width="40%" />
        <Skeleton variant="rounded" height={36} width={100} />
      </Box>
    </CardContent>
  </Card>
);

const ExperiencesSkeletonGrid = () => (
  <Box
    display="grid"
    gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
    gap={3}
  >
    {Array.from({ length: EXPERIENCES_PER_PAGE }, (_, i) => (
      <ExperienceCardSkeleton key={i} />
    ))}
  </Box>
);

/* -------------------------------------------------------------------------- */
/* Main Component */
/* -------------------------------------------------------------------------- */
const ExperiencesComponent: React.FC = () => {
  const router = useRouter();
  const searchDetails = useAppSelector(selectSearchDetails);
  const user = useAppSelector(selectUser);

  const {
    data,
    isLoading,
    isError,
    error,
    mutate: fetchExperiences,
  } = useExperience();

  // State management
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  // Booking modal state
  const [selectedExperience, setSelectedExperience] =
    useState<IExperience | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "COD">(
    "online"
  );
  const [openBooking, setOpenBooking] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] =
    useState<IBookingConfirmation | null>(null);

  /* -------------------------------------------------------------------------- */
  /* Razorpay Script Loading */
  /* -------------------------------------------------------------------------- */
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /* -------------------------------------------------------------------------- */
  /* Effects */
  /* -------------------------------------------------------------------------- */

  // Handle API errors
  useEffect(() => {
    if (isError && !isLoading) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load experiences. Please try again."
      );
      // Optionally redirect to login if authentication error
      if (
        error?.message?.includes("authentication") ||
        error?.message?.includes("401")
      ) {
        router.push("/login");
      }
    }
  }, [isError, isLoading, error, router]);

  // Process API data
  useEffect(() => {
    if (data?.data?.experience && Array.isArray(data.data.experience)) {
      const fetchedExperiences = data.data.experience;
      setExperiences(fetchedExperiences);

      // Handle pagination
      const totalCount = data.data.totalCount || fetchedExperiences.length;
      const calculatedTotalPages = Math.ceil(totalCount / EXPERIENCES_PER_PAGE);
      setTotalPages(calculatedTotalPages);
      setIsLastPage(currentPage >= calculatedTotalPages);
    } else if (data?.data && !data.data.experience) {
      // Handle case where data exists but no experiences
      setExperiences([]);
      setTotalPages(1);
      setIsLastPage(true);
    }
  }, [data, currentPage]);

  // Fetch experiences on page/search change
  useEffect(() => {
    const searchQuery = searchDetails?.destination || "";
    fetchExperiences({
      limit: EXPERIENCES_PER_PAGE,
      page: currentPage,
      search: searchQuery,
    });
  }, [fetchExperiences, currentPage, searchDetails?.destination]);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
    setIsLastPage(false);
  }, [searchDetails?.destination]);

  /* -------------------------------------------------------------------------- */
  /* Computed Values */
  /* -------------------------------------------------------------------------- */
  const pageNumbers = useMemo(() => {
    if (totalPages <= 1) return [];

    const half = Math.floor(MAX_PAGE_NUMBERS / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    // Adjust if we don't have enough pages on one side
    if (end - start + 1 < MAX_PAGE_NUMBERS) {
      if (currentPage <= totalPages / 2) {
        end = Math.min(totalPages, start + MAX_PAGE_NUMBERS - 1);
      } else {
        start = Math.max(1, end - MAX_PAGE_NUMBERS + 1);
      }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages]);

  /* -------------------------------------------------------------------------- */
  /* Event Handlers */
  /* -------------------------------------------------------------------------- */
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openBookingModal = (experience: IExperience) => {
    setSelectedExperience(experience);
    setSelectedDate(
      searchDetails?.date ? new Date(searchDetails.date) : new Date()
    );
    setSelectedTime(null);
    setPaymentMethod("online");
    setBookingConfirmation(null);
    setOpenBooking(true);
  };

  const closeBookingModal = () => {
    setOpenBooking(false);
    setSelectedExperience(null);
    setBookingConfirmation(null);
  };

  const createBookingPayload = (): any => {
    if (!selectedExperience || !selectedDate || !selectedTime || !user) {
      return null;
    }

    const bookingDateTime = new Date(selectedDate);
    bookingDateTime.setHours(
      selectedTime.getHours(),
      selectedTime.getMinutes()
    );

    return {
      experience_id: selectedExperience.id,
      item_id: selectedExperience.id,
      check_in_datetime: bookingDateTime.toISOString(),
      check_out_datetime: bookingDateTime.toISOString(),
      booking_date: format(selectedDate, "yyyy-MM-dd"),
      booking_time: format(selectedTime, "HH:mm"),
      duration_hours: parseInt(selectedExperience.hours) || 1,
      total_amount: selectedExperience.price,
      amount: selectedExperience.price,
      payment_method: "UPI",
      booking_type: "EXPERIENCE",
      order_type: "EXPERIENCE",
      user_id: user.id,
      currency: "INR",
      tax_amount: 0,
      discount_amount: 0,
      days: 0,
    };
  };

  /* -------------------------------------------------------------------------- */
  /* Payment Handlers */
  /* -------------------------------------------------------------------------- */
  const handleRazorpayPayment = async () => {
    // First, ensure Razorpay script is loaded
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay. Please try again.");
      return;
    }

    const bookingPayload = createBookingPayload();
    if (!bookingPayload) {
      toast.error("Invalid booking data. Please check your selections.");
      return;
    }

    try {
      setBookingLoading(true);

      const response = await fetch("http://localhost:8000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const order = await response.json();

      if (order.error) {
        throw new Error(order.error);
      }

      const options = {
        key: order.data.key,
        amount: order.data.amount,
        currency: order.data.currency,
        order_id: order.data.order_id,
        name: "Experience Booking",
        description: `Booking for ${selectedExperience?.title || "Experience"}`,

        // ✅ Enable all payment methods
        method: {
          netbanking: true,
          card: true,
          upi: true,
          wallet: true,
          emi: true,
          paylater: true,
        },

        // ✅ Show all available payment methods
        config: {
          display: {
            preferences: {
              show_default_blocks: true,
            },
          },
        },

        handler: async function (response: any) {
          try {
            const verify = await fetch("http://localhost:8000/order/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                bill_id: order.data.bill_id,
              }),
            });

            if (!verify.ok) {
              throw new Error(
                `Verification failed with status: ${verify.status}`
              );
            }

            const result = await verify.json();

            // Set booking confirmation with actual data
            setBookingConfirmation({
              bookingId: `EXP-${Date.now()}`,
              experience: selectedExperience!,
              selectedDate: selectedDate!,
              selectedTime: selectedTime!,
              totalAmount: selectedExperience?.price || 0,
              paymentId: response.razorpay_payment_id,
              paymentMethod: "online",
            });

            toast.success(
              result.message || "Payment Successful! Experience booked!"
            );
            router.push("/thankyou");
          } catch (verifyError) {
            console.error("Payment verification failed:", verifyError);
            toast.error("Payment verification failed. Please contact support.");
          }
        },

        prefill: {
          name:
            `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
            "Guest",
          email: user?.email || "",
          contact: user?.phone || "9999999999",
        },

        theme: {
          color: "#16A34A",
          backdrop_color: "rgba(0,0,0,0.5)",
        },

        modal: {
          ondismiss: function () {
            console.log("Checkout form closed");
            toast.info("Payment cancelled");
          },
        },

        retry: {
          enabled: true,
          max_count: 3,
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response.error);
        toast.error(`Payment failed: ${response.error.description}`);
      });

      rzp.open();
    } catch (err: any) {
      console.error("Payment initiation error:", err);
      toast.error(err.message || "Failed to initiate payment.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handleCODBooking = async (bookingData: IBookingData) => {
    const payload = createBookingPayload();
    if (!payload) {
      toast.error("Invalid booking data");
      return;
    }

    try {
      setBookingLoading(true);

      const response = await fetch("/api/booking/cod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setBookingConfirmation({
          bookingId: result.booking_id || `EXP-COD-${Date.now()}`,
          experience: bookingData.experience,
          selectedDate: bookingData.selectedDate,
          selectedTime: bookingData.selectedTime,
          totalAmount: bookingData.totalAmount,
          paymentMethod: "COD",
        });
        toast.success("Booking confirmed! Pay on arrival.");
      } else {
        throw new Error(result.message || "Booking failed");
      }
    } catch (err) {
      console.error("COD booking error:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to create booking"
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedExperience || !selectedDate || !selectedTime) {
      toast.error("Please select date and time");
      return;
    }

    if (!user) {
      toast.error("Please login to book an experience");
      router.push("/login");
      return;
    }

    // Validate date is not in the past
    if (!isFuture(selectedDate) && !isToday(selectedDate)) {
      toast.error("Please select a future date");
      return;
    }

    const bookingData: IBookingData = {
      experience: selectedExperience,
      selectedDate,
      selectedTime,
      paymentMethod,
      totalAmount: selectedExperience.price,
    };

    console.log("Experience Booking Data:", {
      experience: {
        id: selectedExperience.id,
        title: selectedExperience.title,
        duration: selectedExperience.hours,
        location: selectedExperience.address,
        price: selectedExperience.price,
      },
      selectedDate: format(selectedDate, "PPP"),
      selectedTime: format(selectedTime, "HH:mm"),
      paymentMethod,
      totalAmount: selectedExperience.price,
      user: user?.email,
    });

    if (paymentMethod === "online") {
      await handleRazorpayPayment();
    } else {
      await handleCODBooking(bookingData);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* Render */
  /* -------------------------------------------------------------------------- */
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <Box mb={4}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            gutterBottom
          >
            Discover Amazing Experiences ✨
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Book unique experiences and create unforgettable memories
          </Typography>
        </Box>

        {/* Loading State */}
        {isLoading && experiences.length === 0 ? (
          <ExperiencesSkeletonGrid />
        ) : experiences.length > 0 ? (
          <>
            {/* Experiences Grid */}
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
              gap={3}
              mb={4}
            >
              {experiences.map((experience) => (
                <Card
                  key={experience.id}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 3,
                    },
                  }}
                  onClick={() => openBookingModal(experience)}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: `url(${
                        experience.images?.[0]?.image_url || DEFAULT_IMAGE
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                    }}
                  >
                    {experience.tag && (
                      <Chip
                        label={experience.tag}
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          backgroundColor:
                            experience.tag === "Popular"
                              ? "#16a34a"
                              : experience.tag === "New"
                              ? "#3b82f6"
                              : "#ef4444",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      />
                    )}
                  </Box>

                  {/* Content */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {experience.title}
                    </Typography>

                    {/* Rating */}
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <Rating
                        value={experience.star_rating}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                      <Typography variant="body2" color="text.secondary">
                        {experience.star_rating} reviews
                      </Typography>
                    </Box>

                    {/* Duration */}
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <AccessTimeIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {experience.hours} Hours
                      </Typography>
                    </Box>

                    {/* Location */}
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <LocationIcon fontSize="small" color="action" />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {experience.address}
                      </Typography>
                    </Box>

                    {/* Price and Book Button */}
                    <Box
                      mt="auto"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      pt={2}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          ₹{experience.price}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          per person
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        color="success"
                        size="large"
                        onClick={(e) => {
                          e.stopPropagation();
                          openBookingModal(experience);
                        }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <Button
                  variant="outlined"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>

                {pageNumbers.map((pageNum) => (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "contained" : "outlined"}
                    color={currentPage === pageNum ? "success" : "inherit"}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                ))}

                <Button
                  variant="outlined"
                  disabled={isLastPage}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </Box>
            )}
          </>
        ) : (
          /* Empty State */
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={8}
            textAlign="center"
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                backgroundColor: "grey.100",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Typography variant="h1" sx={{ fontSize: 48 }}>
                🎭
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              No Experiences Found
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth={400}>
              We couldn't find any experiences for "{searchDetails?.destination}
              ". Try searching for a different location or check back later.
            </Typography>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 3 }}
              onClick={() => router.push("/home")}
            >
              Explore All Destinations
            </Button>
          </Box>
        )}

        {/* Booking Dialog */}
        <Dialog
          open={openBooking}
          onClose={closeBookingModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              Book Experience
              <IconButton onClick={closeBookingModal}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent dividers>
            {selectedExperience && (
              <Box display="flex" flexDirection="column" gap={3}>
                {/* Experience Details */}
                <Box>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {selectedExperience.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {selectedExperience.hours} hours • Location:{" "}
                    {selectedExperience.address}
                  </Typography>
                </Box>

                {/* Date Picker */}
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  minDate={new Date()}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />

                {/* Time Picker */}
                <TimePicker
                  label="Select Time"
                  value={selectedTime}
                  onChange={(newValue) => setSelectedTime(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                />

                {/* Payment Method */}
                <Box>
                  <FormLabel component="legend" sx={{ mb: 1 }}>
                    Payment Method
                  </FormLabel>
                  <RadioGroup
                    row
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value as "online" | "COD")
                    }
                  >
                    <FormControlLabel
                      value="online"
                      control={<Radio />}
                      label="Pay Online"
                    />
                    {/* <FormControlLabel
                      value="COD"
                      control={<Radio />}
                      label="Pay on Arrival"
                    /> */}
                  </RadioGroup>
                </Box>

                {/* Booking Summary */}
                {selectedDate && selectedTime && (
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Booking Summary
                      </Typography>
                      <Divider sx={{ mb: 2 }} />
                      <Box display="flex" flexDirection="column" gap={1}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">Date:</Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {format(selectedDate, "PPP")}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">Time:</Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {format(selectedTime, "HH:mm")}
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">Duration:</Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {selectedExperience.hours} hours
                          </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">Payment:</Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {paymentMethod === "online"
                              ? "Online"
                              : "Pay on Arrival"}
                          </Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="h6" fontWeight="bold">
                            Total Amount:
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="success.main"
                          >
                            ₹{selectedExperience.price}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                )}

                {/* Booking Confirmation */}
                {bookingConfirmation && (
                  <Card
                    sx={{
                      bgcolor: "success.50",
                      border: "1px solid",
                      borderColor: "success.200",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="success.main"
                        gutterBottom
                      >
                        🎉 Booking Confirmed!
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={1}>
                        <Typography variant="body2">
                          <strong>Booking ID:</strong>{" "}
                          {bookingConfirmation.bookingId}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Experience:</strong>{" "}
                          {bookingConfirmation.experience.title}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Date & Time:</strong>{" "}
                          {format(bookingConfirmation.selectedDate, "PPP")} at{" "}
                          {format(bookingConfirmation.selectedTime, "HH:mm")}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Total:</strong> ₹
                          {bookingConfirmation.totalAmount}
                        </Typography>
                        {bookingConfirmation.paymentId && (
                          <Typography variant="body2">
                            <strong>Payment ID:</strong>{" "}
                            {bookingConfirmation.paymentId}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                )}
              </Box>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={closeBookingModal}
              disabled={bookingLoading}
              variant="outlined"
            >
              {bookingConfirmation ? "Close" : "Cancel"}
            </Button>
            {!bookingConfirmation && (
              <Button
                onClick={handleConfirmBooking}
                disabled={!selectedDate || !selectedTime || bookingLoading}
                variant="contained"
                color="success"
                size="large"
              >
                {bookingLoading ? "Processing..." : "Confirm Booking"}
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </main>
    </LocalizationProvider>
  );
};

export default ExperiencesComponent;
