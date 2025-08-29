// // "use client";

// // import { useState, ChangeEvent, useEffect } from "react";
// // import {
// //   Box,
// //   Tabs,
// //   Tab,
// //   Typography,
// //   Button,
// //   Paper,
// //   Avatar,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogContentText,
// //   DialogActions,
// //   IconButton,
// //   Stack,
// //   Chip,
// //   Card,
// //   CardContent,
// //   TextField,
// //   Divider,
// //   CircularProgress,
// //   Skeleton, // Added Skeleton import
// // } from "@mui/material";
// // import CloseIcon from "@mui/icons-material/Close";
// // import CameraAltIcon from "@mui/icons-material/CameraAlt";
// // import EditIcon from "@mui/icons-material/Edit";
// // import SaveIcon from "@mui/icons-material/Save";
// // import CancelIcon from "@mui/icons-material/Cancel";
// // import { useCancelOrder, useOrdersByusers } from "@src/hooks/apiHooks";
// // import toast from "react-hot-toast";
// // import { useRouter } from "next/navigation";
// // import { useAppSelector } from "@src/redux/store";
// // import { selectUser } from "@src/redux/reducers/authSlice";
// // import axios from "axios";

// // /* --------------------------- Types & Interfaces ----------------------------- */
// // interface Booking {
// //   id: string;
// //   status: "Completed" | "Confirmed" | "cancel";
// //   dateRange: string;
// //   reservation_id: number;
// //   title: string;
// //   description: string;
// //   image: string;
// //   price?: string;
// //   paymentMethod?: string;
// //   bookingType?: string;
// //   duration?: string;
// //   orderId?: string;
// // }

// // interface UserProfile {
// //   name: string;
// //   bio: string;
// //   joinDate: string;
// //   avatar: string;
// // }

// // interface OrderData {
// //   id: string;
// //   order_id: number;
// //   amount: string;
// //   currency: string;
// //   status: string;
// //   payment_method: string;
// //   createdAt: string;
// //   reservation: {
// //     check_in_datetime: string;
// //     check_out_datetime: string;
// //     total_amount: string;
// //     booking_type: string;
// //     duration_hours: number;
// //     status: string;
// //     hotel: {
// //       name: string;
// //       description: string;
// //       address: string;
// //       city: string;
// //       star_rating: number;
// //     };
// //   };
// //   user: {
// //     firstName: string;
// //     lastName: string;
// //     email: string;
// //     role: string;
// //     avtar?: string; // Note: keeping original spelling from API
// //   };
// // }

// // /* --------------------------- Helper Functions ----------------------------- */
// // const formatDateRange = (
// //   checkIn: string,
// //   checkOut: string,
// //   durationHours?: number
// // ) => {
// //   if (!checkIn) return "Date not specified";

// //   const checkInDate = new Date(checkIn);
// //   const checkOutDate = new Date(checkOut);

// //   const formatDate = (date: Date) => {
// //     return date.toLocaleDateString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //       year: "numeric",
// //     });
// //   };

// //   if (durationHours && durationHours < 24) {
// //     return `${formatDate(checkInDate)} (${durationHours} hours)`;
// //   }

// //   if (checkInDate.toDateString() === checkOutDate.toDateString()) {
// //     return formatDate(checkInDate);
// //   }

// //   return `${formatDate(checkInDate)} – ${formatDate(checkOutDate)}`;
// // };

// // const transformOrderToBooking = (order: OrderData): Booking => {
// //   const { reservation = {}, user = {} } = order;
// //   const hotel = reservation?.hotel || {};

// //   // Check if booking is past or future based on check-in date
// //   const checkInDate = new Date(
// //     reservation?.check_in_datetime || order.createdAt
// //   );
// //   const currentDate = new Date("2025-08-17T00:00:00.000Z"); // Today's date
// //   const isPast = checkInDate < currentDate;

// //   return {
// //     id: order.order_id?.toString() || order.id,
// //     orderId: order.id,
// //     status: reservation?.status,
// //     reservation_id: reservation?.reservation_id,
// //     dateRange: formatDateRange(
// //       reservation?.check_in_datetime,
// //       reservation?.check_out_datetime,
// //       reservation?.duration_hours
// //     ),
// //     title: hotel.name || "Hotel Booking",
// //     description:
// //       hotel.description ||
// //       `${hotel.address || ""} ${hotel.city || ""}`.trim() ||
// //       "Hotel accommodation booking",
// //     image: "",
// //     price: `₹${order.amount || "0"}`,
// //     paymentMethod: order.payment_method,
// //     bookingType: reservation?.booking_type,
// //     duration: reservation?.duration_hours
// //       ? `${reservation.duration_hours} hours`
// //       : undefined,
// //   };
// // };

// // /* --------------------------- Helper Component ----------------------------- */
// // function TabPanel({
// //   children,
// //   value,
// //   index,
// // }: {
// //   children: React.ReactNode;
// //   value: number;
// //   index: number;
// // }) {
// //   return (
// //     <div hidden={value !== index} role="tabpanel">
// //       {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
// //     </div>
// //   );
// // }

// // /* --------------------------- Skeleton Components ----------------------------- */
// // function ProfileSkeleton() {
// //   return (
// //     <Box
// //       sx={{
// //         display: "flex",
// //         flexDirection: { xs: "column", sm: "row" },
// //         alignItems: { xs: "center", sm: "flex-start" },
// //         gap: 3,
// //       }}
// //     >
// //       {/* Profile Photo Skeleton */}
// //       <Box sx={{ position: "relative", textAlign: "center" }}>
// //         <Skeleton
// //           variant="circular"
// //           width={120}
// //           height={120}
// //           sx={{
// //             border: "4px solid white",
// //             boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
// //           }}
// //         />
// //       </Box>

// //       {/* Profile Info Skeleton */}
// //       <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
// //         <Skeleton variant="text" width="60%" height={48} sx={{ mb: 1 }} />
// //         <Skeleton variant="text" width="40%" height={32} />
// //       </Box>
// //     </Box>
// //   );
// // }

// // function BookingCardSkeleton() {
// //   return (
// //     <Card elevation={1}>
// //       <CardContent sx={{ p: 3 }}>
// //         <Box
// //           sx={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "flex-start",
// //             mb: 2,
// //           }}
// //         >
// //           <Box>
// //             <Skeleton variant="rounded" width={80} height={24} sx={{ mb: 1 }} />
// //             <Skeleton variant="text" width={120} height={20} />
// //           </Box>
// //           <Skeleton variant="text" width={60} height={28} />
// //         </Box>

// //         <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
// //         <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
// //         <Skeleton variant="text" width="70%" height={20} sx={{ mb: 2 }} />

// //         <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
// //           <Skeleton variant="rounded" width={70} height={24} />
// //           <Skeleton variant="rounded" width={60} height={24} />
// //           <Skeleton variant="rounded" width={80} height={24} />
// //         </Stack>

// //         <Skeleton variant="text" width="50%" height={16} sx={{ mb: 2 }} />

// //         <Divider sx={{ my: 2 }} />

// //         <Stack direction="row" spacing={1} justifyContent="flex-end">
// //           <Skeleton variant="rounded" width={100} height={32} />
// //           <Skeleton variant="rounded" width={70} height={32} />
// //         </Stack>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// // /* -------------------------------------------------------------------------- */
// // /*  Main Profile Component                                                    */
// // /* -------------------------------------------------------------------------- */
// // export default function ProfileComponent() {
// //   const [tab, setTab] = useState(0);
// //   const [past, setPast] = useState<Booking[]>([]);
// //   const [upcoming, setUpcoming] = useState<Booking[]>([]);
// //   const [profile, setProfile] = useState<UserProfile>({
// //     name: "User Profile",
// //     bio: "Hotel Guest",
// //     joinDate: "Joined 2024",
// //     avatar:
// //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
// //   });
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [orderList, setOrderList] = useState<OrderData[]>([]);
// //   const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
// //   const user = useAppSelector(selectUser);

// //   // Upload states
// //   const [isUploading, setIsUploading] = useState(false);
// //   const [uploadProgress, setUploadProgress] = useState(0);

// //   // Cancel dialog state
// //   const [open, setOpen] = useState(false);
// //   const [target, setTarget] = useState<Booking | null>(null);
// //   const router = useRouter();

// //   // ----------------------api calls--------------------
// //   const {
// //     isError: isHotelError,
// //     isLoading: isHotelLoading,
// //     data: hotelData,
// //     error: hotelError,
// //     mutate: hotelMutation,
// //   } = useOrdersByusers();

// //   useCancelOrder;
// //   const {
// //     isError: iscancelError,
// //     isLoading: iscancelLoading,
// //     data: cancelData,
// //     error: cancelError,
// //     mutate: cancelMutation,
// //   } = useCancelOrder();

// //   /* --------------------------- Upload Profile Image Function ----------------------------- */
// //   const uploadProfileImage = async (file: File) => {
// //     try {
// //       setIsUploading(true);
// //       setUploadProgress(0);

// //       // Validate file
// //       const allowedTypes = [
// //         "image/jpeg",
// //         "image/jpg",
// //         "image/png",
// //         "image/webp",
// //       ];
// //       if (!allowedTypes.includes(file.type)) {
// //         throw new Error("Only JPEG, PNG, and WebP images are allowed");
// //       }

// //       const maxSize = 5 * 1024 * 1024; // 5MB
// //       if (file.size > maxSize) {
// //         throw new Error("File size must be less than 5MB");
// //       }

// //       // Prepare FormData
// //       const formData = new FormData();
// //       formData.append("images", file);
// //       formData.append("user_id", user?.id?.toString() || "0");
// //       formData.append("serviceName", "user");

// //       // Console log FormData for debugging
// //       console.log("=== PROFILE IMAGE UPLOAD FORMDATA ===");
// //       console.log("📄 FormData Contents:");
// //       for (let [key, value] of formData.entries()) {
// //         if (value instanceof File) {
// //           console.log(`${key}:`, {
// //             name: value.name,
// //             size: value.size,
// //             type: value.type,
// //             lastModified: value.lastModified,
// //           });
// //         } else {
// //           console.log(`${key}:`, value);
// //         }
// //       }
// //       console.log("=====================================");

// //       const response = await axios.post(
// //         `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/hotels/upload`,
// //         formData,
// //         {
// //           headers: { "Content-Type": "multipart/form-data" },
// //           timeout: 300000,
// //           onUploadProgress: (e) => {
// //             if (e.total) {
// //               const progress = Math.round((e.loaded * 100) / e.total);
// //               setUploadProgress(progress);
// //               console.log(`Upload Progress: ${progress}%`);
// //             }
// //           },
// //         }
// //       );

// //       console.log("✅ Upload Response:", response.data);

// //       // Handle successful upload
// //       if (response.data.success && response.data.imageUrls?.length) {
// //         const uploadedImageUrl = response.data.imageUrls[0];

// //         // Update profile state immediately
// //         setProfile((prev) => ({
// //           ...prev,
// //           avatar: uploadedImageUrl,
// //         }));

// //         toast.success(
// //           response.data.message || "Profile picture updated successfully!"
// //         );

// //         console.log("🎉 New Profile Picture URL:", uploadedImageUrl);
// //         return uploadedImageUrl;
// //       }

// //       throw new Error(response.data.message || "Upload failed");
// //     } catch (error: any) {
// //       console.error("❌ Profile Image Upload Failed:", error);

// //       let errorMessage = "Failed to upload profile picture";
// //       if (error.response?.data?.message) {
// //         errorMessage = error.response.data.message;
// //       } else if (error.message) {
// //         errorMessage = error.message;
// //       }

// //       toast.error(errorMessage);
// //       throw error;
// //     } finally {
// //       setIsUploading(false);
// //       setUploadProgress(0);
// //     }
// //   };

// //   // Process orderList and categorize into past/upcoming
// //   useEffect(() => {
// //     if (Array.isArray(orderList) && orderList.length > 0) {
// //       const currentDate = new Date("2025-08-17T00:00:00.000Z");
// //       const pastBookings: Booking[] = [];
// //       const upcomingBookings: Booking[] = [];

// //       orderList.forEach((order: any) => {
// //         try {
// //           const booking = transformOrderToBooking(order);
// //           const checkInDate = new Date(
// //             order.reservation?.check_in_datetime || order.createdAt
// //           );

// //           if (checkInDate < currentDate) {
// //             pastBookings.push({ ...booking, status: booking.status });
// //           } else {
// //             upcomingBookings.push({
// //               ...booking,
// //               status: booking.status,
// //               reservation_id: booking?.reservation_id,
// //             });
// //           }
// //         } catch (error) {
// //           console.error("Error processing order:", error, order);
// //         }
// //       });

// //       // Sort bookings by date
// //       pastBookings.sort((a, b) => {
// //         const dateA = new Date(
// //           orderList.find((o: any) => o.order_id?.toString() === a.id)
// //             ?.createdAt || ""
// //         );
// //         const dateB = new Date(
// //           orderList.find((o: any) => o.order_id?.toString() === b.id)
// //             ?.createdAt || ""
// //         );
// //         return dateB.getTime() - dateA.getTime();
// //       });

// //       upcomingBookings.sort((a, b) => {
// //         const dateA = new Date(
// //           orderList.find((o: any) => o.order_id?.toString() === a.id)
// //             ?.reservation?.check_in_datetime || ""
// //         );
// //         const dateB = new Date(
// //           orderList.find((o: any) => o.order_id?.toString() === b.id)
// //             ?.reservation?.check_in_datetime || ""
// //         );
// //         return dateA.getTime() - dateB.getTime();
// //       });

// //       setPast(pastBookings);
// //       setUpcoming(upcomingBookings);
// //     } else {
// //       setPast([]);
// //       setUpcoming([]);
// //     }
// //   }, [orderList]);

// //   // Update user profile when user data or orderList changes
// //   useEffect(() => {
// //     if (user) {
// //       const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

// //       // Get avatar from user data or from first order's user data
// //       let userAvatar = user.avtar || user.avatar; // Handle both spellings

// //       // If no avatar in user, try to get from orderList
// //       if (!userAvatar && orderList.length > 0) {
// //         userAvatar = orderList[0]?.user?.avtar;
// //       }

// //       // Fallback to default if still no avatar
// //       if (!userAvatar) {
// //         userAvatar =
// //           "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80";
// //       }

// //       const updatedProfile = {
// //         name: fullName || user.email || "User",
// //         bio: `${user.role || "Guest"} • Hotel Booking Platform`,
// //         joinDate: user.createdAt
// //           ? `Joined ${new Date(user.createdAt).getFullYear()}`
// //           : "Joined 2024",
// //         avatar: userAvatar,
// //       };

// //       setProfile(updatedProfile);
// //       setEditedProfile(updatedProfile);
// //     }
// //   }, [user, orderList]);

// //   // Handle API data loading
// //   useEffect(() => {
// //     if (isHotelError && !isHotelLoading) {
// //       toast.error(
// //         hotelError instanceof Error ? hotelError.message : "An error occurred"
// //       );
// //       router.push("/login");
// //     }
// //     if (Array.isArray(hotelData?.data)) {
// //       const fetchedOrders = hotelData.data;
// //       setOrderList(fetchedOrders);
// //     }
// //   }, [isHotelError, isHotelLoading, hotelError, hotelData, router]);

// //   /* -------------- Handlers -------------------------- */
// //   const handleCancelClick = (b: Booking) => {
// //     setTarget(b);
// //     setOpen(true);
// //   };

// //   const handleClose = () => {
// //     setOpen(false);
// //     setTarget(null);
// //   };

// //   const handleConfirm = () => {
// //     if (target) {
// //       cancelMutation({
// //         id: target.reservation_id,
// //       });
// //       setUpcoming((prev) => prev.filter((b) => b.id !== target.id));
// //       toast.success("Booking cancelled successfully");
// //     }
// //     handleClose();
// //   };

// //   // Handle profile photo upload
// //   const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     try {
// //       console.log("📸 Profile Photo Selected:", {
// //         name: file.name,
// //         size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
// //         type: file.type,
// //       });

// //       // Upload to server (no need for temporary preview since we update state directly)
// //       await uploadProfileImage(file);
// //     } catch (error) {
// //       console.error("Photo upload failed:", error);
// //     }

// //     // Reset file input
// //     e.target.value = "";
// //   };

// //   // Handle profile editing
// //   const handleEditClick = () => {
// //     setIsEditing(true);
// //     setEditedProfile(profile);
// //   };

// //   const handleSaveProfile = () => {
// //     setProfile(editedProfile);
// //     setIsEditing(false);
// //     toast.success("Profile updated successfully");
// //   };

// //   const handleCancelEdit = () => {
// //     setIsEditing(false);
// //     setEditedProfile(profile);
// //   };

// //   // Load user orders
// //   useEffect(() => {
// //     if (user?.id) {
// //       hotelMutation({
// //         user_id: user.id,
// //       });
// //     }
// //   }, [hotelMutation, user?.id]);

// //   console.log("User data:", user);
// //   console.log("Order list:", orderList);
// //   console.log("Profile data:", profile);
// //   console.log("what is a target and who is a target");
// //   console.log(target);
// //   console.log("uncomming bokking data is hererere");
// //   console.log(upcoming);

// //   /* --------------------------- UI ------------------- */
// //   return (
// //     <>
// //       <Box
// //         sx={{
// //           maxWidth: 1200,
// //           mx: "auto",
// //           px: { xs: 2, md: 3 },
// //           py: { xs: 4, md: 6 },
// //         }}
// //       >
// //         {/* --------------------- Profile Header -------------------- */}
// //         <Paper
// //           elevation={2}
// //           sx={{
// //             p: { xs: 3, md: 4 },
// //             mb: 4,
// //             borderRadius: 3,
// //             background: "linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%)",
// //           }}
// //         >
// //           {isHotelLoading ? (
// //             <ProfileSkeleton />
// //           ) : (
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 flexDirection: { xs: "column", sm: "row" },
// //                 alignItems: { xs: "center", sm: "flex-start" },
// //                 gap: 3,
// //               }}
// //             >
// //               {/* Profile Photo with Upload */}
// //               <Box sx={{ position: "relative", textAlign: "center" }}>
// //                 <Avatar
// //                   src={profile.avatar}
// //                   alt="Profile"
// //                   sx={{
// //                     width: { xs: 100, md: 120 },
// //                     height: { xs: 100, md: 120 },
// //                     border: "4px solid white",
// //                     boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
// //                     ...(isUploading && {
// //                       opacity: 0.7,
// //                       filter: "blur(1px)",
// //                     }),
// //                   }}
// //                 />

// //                 {/* Upload Progress Overlay */}
// //                 {isUploading && (
// //                   <Box
// //                     sx={{
// //                       position: "absolute",
// //                       top: "50%",
// //                       left: "50%",
// //                       transform: "translate(-50%, -50%)",
// //                       zIndex: 2,
// //                     }}
// //                   >
// //                     <CircularProgress
// //                       variant="determinate"
// //                       value={uploadProgress}
// //                       size={60}
// //                       thickness={4}
// //                       sx={{ color: "success.main" }}
// //                     />
// //                     <Typography
// //                       variant="caption"
// //                       sx={{
// //                         position: "absolute",
// //                         top: "50%",
// //                         left: "50%",
// //                         transform: "translate(-50%, -50%)",
// //                         color: "success.main",
// //                         fontWeight: 600,
// //                       }}
// //                     >
// //                       {uploadProgress}%
// //                     </Typography>
// //                   </Box>
// //                 )}

// //                 <IconButton
// //                   component="label"
// //                   disabled={isUploading}
// //                   sx={{
// //                     position: "absolute",
// //                     bottom: 0,
// //                     right: 0,
// //                     bgcolor: "success.main",
// //                     color: "white",
// //                     width: 40,
// //                     height: 40,
// //                     "&:hover": { bgcolor: "success.dark" },
// //                     "&:disabled": {
// //                       bgcolor: "grey.400",
// //                       color: "grey.600",
// //                     },
// //                     boxShadow: 2,
// //                   }}
// //                 >
// //                   <input
// //                     hidden
// //                     accept="image/jpeg,image/jpg,image/png,image/webp"
// //                     type="file"
// //                     onChange={handlePhotoChange}
// //                   />
// //                   <CameraAltIcon fontSize="small" />
// //                 </IconButton>

// //                 {/* Upload Status */}
// //                 {isUploading && (
// //                   <Typography
// //                     variant="caption"
// //                     color="success.main"
// //                     sx={{ display: "block", mt: 1, fontWeight: 600 }}
// //                   >
// //                     Uploading...
// //                   </Typography>
// //                 )}
// //               </Box>

// //               {/* Profile Info */}
// //               <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
// //                 {isEditing ? (
// //                   <Stack spacing={2}>
// //                     <TextField
// //                       fullWidth
// //                       label="Name"
// //                       variant="outlined"
// //                       value={editedProfile.name}
// //                       onChange={(e) =>
// //                         setEditedProfile({
// //                           ...editedProfile,
// //                           name: e.target.value,
// //                         })
// //                       }
// //                       sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
// //                     />
// //                     <TextField
// //                       fullWidth
// //                       label="Bio"
// //                       variant="outlined"
// //                       value={editedProfile.bio}
// //                       onChange={(e) =>
// //                         setEditedProfile({
// //                           ...editedProfile,
// //                           bio: e.target.value,
// //                         })
// //                       }
// //                       sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
// //                     />
// //                     <Stack direction="row" spacing={1}>
// //                       <Button
// //                         variant="contained"
// //                         color="success"
// //                         startIcon={<SaveIcon />}
// //                         onClick={handleSaveProfile}
// //                       >
// //                         Save
// //                       </Button>
// //                       <Button
// //                         variant="outlined"
// //                         color="error"
// //                         startIcon={<CancelIcon />}
// //                         onClick={handleCancelEdit}
// //                       >
// //                         Cancel
// //                       </Button>
// //                     </Stack>
// //                   </Stack>
// //                 ) : (
// //                   <>
// //                     <Box
// //                       sx={{
// //                         display: "flex",
// //                         alignItems: "center",
// //                         gap: 1,
// //                         justifyContent: { xs: "center", sm: "flex-start" },
// //                         mb: 1,
// //                       }}
// //                     >
// //                       <Typography
// //                         variant="h4"
// //                         fontWeight={700}
// //                         color="text.primary"
// //                       >
// //                         {profile.name}
// //                       </Typography>
// //                     </Box>
// //                     <Typography
// //                       color="text.secondary"
// //                       sx={{ mb: 2, fontSize: "1.1rem" }}
// //                     >
// //                       {profile.bio} • {profile.joinDate}
// //                     </Typography>
// //                   </>
// //                 )}
// //               </Box>
// //             </Box>
// //           )}
// //         </Paper>

// //         {/* ------------------------ Bookings Section -------------------------- */}
// //         <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
// //           <Tabs
// //             value={tab}
// //             onChange={(_, v) => setTab(v)}
// //             sx={{
// //               bgcolor: "grey.50",
// //               "& .MuiTab-root": {
// //                 fontWeight: 600,
// //                 fontSize: "1rem",
// //                 color: "text.secondary",
// //                 "&.Mui-selected": {
// //                   color: "success.main",
// //                 },
// //               },
// //               "& .MuiTabs-indicator": {
// //                 backgroundColor: "success.main",
// //                 height: 3,
// //               },
// //             }}
// //             variant="fullWidth"
// //           >
// //             <Tab label={`Past Bookings (${past.length})`} />
// //             <Tab label={`Upcoming Bookings (${upcoming.length})`} />
// //           </Tabs>

// //           <Box sx={{ p: 3 }}>
// //             <TabPanel value={tab} index={0}>
// //               {isHotelLoading ? (
// //                 <Stack spacing={3}>
// //                   {[1, 2, 3].map((i) => (
// //                     <BookingCardSkeleton key={i} />
// //                   ))}
// //                 </Stack>
// //               ) : past.length === 0 ? (
// //                 <Box sx={{ textAlign: "center", py: 6 }}>
// //                   <Typography variant="h6" color="text.secondary" gutterBottom>
// //                     No past bookings yet
// //                   </Typography>
// //                   <Typography color="text.secondary">
// //                     Your completed stays will appear here
// //                   </Typography>
// //                 </Box>
// //               ) : (
// //                 <Stack spacing={3}>
// //                   {past.map((booking) => (
// //                     <BookingCardWithoutImage
// //                       key={booking.id}
// //                       {...booking}
// //                       actionLabel="VISIT HOTELS"
// //                       isPast={true}
// //                     />
// //                   ))}
// //                 </Stack>
// //               )}
// //             </TabPanel>

// //             <TabPanel value={tab} index={1}>
// //               {isHotelLoading ? (
// //                 <Stack spacing={3}>
// //                   {[1, 2, 3].map((i) => (
// //                     <BookingCardSkeleton key={i} />
// //                   ))}
// //                 </Stack>
// //               ) : upcoming.length === 0 ? (
// //                 <Box sx={{ textAlign: "center", py: 6 }}>
// //                   <Typography variant="h6" color="text.secondary" gutterBottom>
// //                     No upcoming bookings
// //                   </Typography>
// //                   <Typography color="text.secondary">
// //                     Book your next adventure today!
// //                   </Typography>
// //                   <Button variant="contained" color="success" sx={{ mt: 2 }}>
// //                     Explore Hotels
// //                   </Button>
// //                 </Box>
// //               ) : (
// //                 <Stack spacing={3}>
// //                   {upcoming.map((booking) => (
// //                     <BookingCardWithoutImage
// //                       key={booking.id}
// //                       {...booking}
// //                       actionLabel="VISIT HOTEL"
// //                       onCancel={() => handleCancelClick(booking)}
// //                       isPast={false}
// //                     />
// //                   ))}
// //                 </Stack>
// //               )}
// //             </TabPanel>
// //           </Box>
// //         </Paper>
// //       </Box>

// //       {/* =================== Cancel Confirmation Dialog =================== */}
// //       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
// //         <DialogTitle sx={{ pr: 5, fontWeight: 600 }}>
// //           Cancel Booking
// //           <IconButton
// //             aria-label="close"
// //             onClick={handleClose}
// //             sx={{ position: "absolute", right: 8, top: 8 }}
// //           >
// //             <CloseIcon />
// //           </IconButton>
// //         </DialogTitle>

// //         <DialogContent dividers>
// //           <DialogContentText sx={{ fontSize: "1rem" }}>
// //             {`Are you sure you want to cancel "${target?.title}" (${target?.dateRange})? `}
// //             This action cannot be undone and may be subject to cancellation
// //             fees.
// //           </DialogContentText>
// //         </DialogContent>

// //         <DialogActions sx={{ p: 3 }}>
// //           <Button onClick={handleClose} variant="outlined">
// //             Keep Booking
// //           </Button>
// //           <Button color="error" variant="contained" onClick={handleConfirm}>
// //             Yes, Cancel
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </>
// //   );
// // }

// // /* -------------------------- Booking Card WITHOUT Image ---------------------------------- */
// // function BookingCardWithoutImage({
// //   status,
// //   dateRange,
// //   title,
// //   description,
// //   actionLabel,
// //   onCancel,
// //   isPast,
// //   price,
// //   paymentMethod,
// //   bookingType,
// //   duration,
// //   orderId,
// // }: Booking & {
// //   actionLabel: string;
// //   onCancel?: () => void;
// //   isPast: boolean;
// // }) {
// //   const statusColor = status === "Completed" ? "success" : "info";

// //   return (
// //     <Card elevation={1}>
// //       <CardContent sx={{ p: 3 }}>
// //         <Box
// //           sx={{
// //             display: "flex",
// //             justifyContent: "space-between",
// //             alignItems: "flex-start",
// //             mb: 1,
// //           }}
// //         >
// //           <Box>
// //             <Chip
// //               label={status}
// //               color={statusColor}
// //               size="small"
// //               sx={{ mb: 1, fontWeight: 600 }}
// //             />
// //             <Typography variant="body2" color="text.secondary">
// //               {dateRange}
// //             </Typography>
// //           </Box>
// //           {price && (
// //             <Typography variant="h6" color="success.main" fontWeight={600}>
// //               {price}
// //             </Typography>
// //           )}
// //         </Box>

// //         <Typography variant="h6" fontWeight={600} gutterBottom>
// //           {title}
// //         </Typography>
// //         <Typography
// //           variant="body2"
// //           color="text.secondary"
// //           sx={{
// //             mb: 2,
// //             display: "-webkit-box",
// //             WebkitLineClamp: 2,
// //             WebkitBoxOrient: "vertical",
// //             overflow: "hidden",
// //           }}
// //         >
// //           {description}
// //         </Typography>

// //         <Stack
// //           direction="row"
// //           spacing={1}
// //           sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
// //         >
// //           {paymentMethod && (
// //             <Chip
// //               label={paymentMethod}
// //               size="small"
// //               variant="outlined"
// //               color="primary"
// //             />
// //           )}
// //           {duration && (
// //             <Chip
// //               label={duration}
// //               size="small"
// //               variant="outlined"
// //               color="secondary"
// //             />
// //           )}
// //           {bookingType && (
// //             <Chip
// //               label={bookingType}
// //               size="small"
// //               variant="outlined"
// //               color="default"
// //             />
// //           )}
// //         </Stack>

// //         {orderId && (
// //           <Typography
// //             variant="caption"
// //             color="text.secondary"
// //             sx={{ mb: 2, display: "block" }}
// //           >
// //             Order ID: {orderId}
// //           </Typography>
// //         )}

// //         <Divider sx={{ my: 2 }} />

// //         <Stack direction="row" spacing={1} justifyContent="flex-end">
// //           <Button
// //             variant={isPast ? "outlined" : "contained"}
// //             color="success"
// //             size="small"
// //           >
// //             {actionLabel}
// //           </Button>
// //           {onCancel && !isPast && status !== "cancel" && (
// //             <Button
// //               variant="outlined"
// //               color="error"
// //               size="small"
// //               onClick={onCancel}
// //             >
// //               Cancel
// //             </Button>
// //           )}
// //         </Stack>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// "use client";

// import { useState, ChangeEvent, useEffect } from "react";
// import {
//   Box,
//   Tabs,
//   Tab,
//   Typography,
//   Button,
//   Paper,
//   Avatar,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   IconButton,
//   Stack,
//   Chip,
//   Card,
//   CardContent,
//   TextField,
//   Divider,
//   CircularProgress,
//   Skeleton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { useCancelOrder, useOrdersByusers } from "@src/hooks/apiHooks";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "@src/redux/store";
// import { selectUser } from "@src/redux/reducers/authSlice";
// import axios from "axios";

// /* --------------------------- Types & Interfaces ----------------------------- */
// interface Booking {
//   id: string;
//   status: "Completed" | "Confirmed" | "cancel";
//   dateRange: string;
//   reservation_id: number;
//   title: string;
//   description: string;
//   image: string;
//   price?: string;
//   paymentMethod?: string;
//   bookingType?: string;
//   duration?: string;
//   orderId?: string;
//   checkInDate?: Date;
// }

// interface UserProfile {
//   name: string;
//   bio: string;
//   joinDate: string;
//   avatar: string;
// }

// interface OrderData {
//   id: string;
//   order_id: number;
//   amount: string;
//   currency: string;
//   status: string;
//   payment_method: string;
//   createdAt: string;
//   reservation: {
//     check_in_datetime: string;
//     check_out_datetime: string;
//     total_amount: string;
//     booking_type: string;
//     duration_hours: number;
//     status: string;
//     hotel: {
//       name: string;
//       description: string;
//       address: string;
//       city: string;
//       star_rating: number;
//     };
//   };
//   user: {
//     firstName: string;
//     lastName: string;
//     email: string;
//     role: string;
//     avtar?: string;
//   };
// }

// /* --------------------------- Helper Functions ----------------------------- */
// const formatDateRange = (
//   checkIn: string,
//   checkOut: string,
//   durationHours?: number
// ) => {
//   if (!checkIn) return "Date not specified";

//   const checkInDate = new Date(checkIn);
//   const checkOutDate = new Date(checkOut);

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   if (durationHours && durationHours < 24) {
//     return `${formatDate(checkInDate)} (${durationHours} hours)`;
//   }

//   if (checkInDate.toDateString() === checkOutDate.toDateString()) {
//     return formatDate(checkInDate);
//   }

//   return `${formatDate(checkInDate)} – ${formatDate(checkOutDate)}`;
// };

// const transformOrderToBooking = (order: OrderData): Booking => {
//   const { reservation = {}, user = {} } = order;
//   const hotel = reservation?.hotel || {};

//   const checkInDate = new Date(
//     reservation?.check_in_datetime || order.createdAt
//   );

//   return {
//     id: order.order_id?.toString() || order.id,
//     orderId: order.id,
//     status: reservation?.status,
//     reservation_id: reservation?.reservation_id,
//     dateRange: formatDateRange(
//       reservation?.check_in_datetime,
//       reservation?.check_out_datetime,
//       reservation?.duration_hours
//     ),
//     title: hotel.name || "Hotel Booking",
//     description:
//       hotel.description ||
//       `${hotel.address || ""} ${hotel.city || ""}`.trim() ||
//       "Hotel accommodation booking",
//     image: "",
//     price: `₹${order.amount || "0"}`,
//     paymentMethod: order.payment_method,
//     bookingType: reservation?.booking_type,
//     duration: reservation?.duration_hours
//       ? `${reservation.duration_hours} hours`
//       : undefined,
//     checkInDate,
//   };
// };

// const isToday = (date: Date): boolean => {
//   const today = new Date("2025-08-19T00:00:00.000Z"); // Updated to current date
//   return (
//     date.getFullYear() === today.getFullYear() &&
//     date.getMonth() === today.getMonth() &&
//     date.getDate() === today.getDate()
//   );
// };

// /* --------------------------- Helper Component ----------------------------- */
// function TabPanel({
//   children,
//   value,
//   index,
// }: {
//   children: React.ReactNode;
//   value: number;
//   index: number;
// }) {
//   return (
//     <div hidden={value !== index} role="tabpanel">
//       {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// /* --------------------------- Skeleton Components ----------------------------- */
// function ProfileSkeleton() {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: { xs: "column", sm: "row" },
//         alignItems: { xs: "center", sm: "flex-start" },
//         gap: 3,
//       }}
//     >
//       <Box sx={{ position: "relative", textAlign: "center" }}>
//         <Skeleton
//           variant="circular"
//           width={120}
//           height={120}
//           sx={{
//             border: "4px solid white",
//             boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
//           }}
//         />
//       </Box>

//       <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
//         <Skeleton variant="text" width="60%" height={48} sx={{ mb: 1 }} />
//         <Skeleton variant="text" width="40%" height={32} />
//       </Box>
//     </Box>
//   );
// }

// function BookingCardSkeleton() {
//   return (
//     <Card elevation={1}>
//       <CardContent sx={{ p: 3 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             mb: 2,
//           }}
//         >
//           <Box>
//             <Skeleton variant="rounded" width={80} height={24} sx={{ mb: 1 }} />
//             <Skeleton variant="text" width={120} height={20} />
//           </Box>
//           <Skeleton variant="text" width={60} height={28} />
//         </Box>

//         <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
//         <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
//         <Skeleton variant="text" width="70%" height={20} sx={{ mb: 2 }} />

//         <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
//           <Skeleton variant="rounded" width={70} height={24} />
//           <Skeleton variant="rounded" width={60} height={24} />
//           <Skeleton variant="rounded" width={80} height={24} />
//         </Stack>

//         <Skeleton variant="text" width="50%" height={16} sx={{ mb: 2 }} />

//         <Divider sx={{ my: 2 }} />

//         <Stack direction="row" spacing={1} justifyContent="flex-end">
//           <Skeleton variant="rounded" width={100} height={32} />
//           <Skeleton variant="rounded" width={70} height={32} />
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  Main Profile Component                                                    */
// /* -------------------------------------------------------------------------- */
// export default function ProfileComponent() {
//   const [tab, setTab] = useState(0);
//   const [past, setPast] = useState<Booking[]>([]);
//   const [upcoming, setUpcoming] = useState<Booking[]>([]);
//   const [profile, setProfile] = useState<UserProfile>({
//     name: "User Profile",
//     bio: "Hotel Guest",
//     joinDate: "Joined 2024",
//     avatar:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [orderList, setOrderList] = useState<OrderData[]>([]);
//   const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
//   const user = useAppSelector(selectUser);

//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const [open, setOpen] = useState(false);
//   const [target, setTarget] = useState<Booking | null>(null);
//   const router = useRouter();

//   const {
//     isError: isHotelError,
//     isLoading: isHotelLoading,
//     data: hotelData,
//     error: hotelError,
//     mutate: hotelMutation,
//   } = useOrdersByusers();

//   const {
//     isError: iscancelError,
//     isLoading: iscancelLoading,
//     data: cancelData,
//     error: cancelError,
//     mutate: cancelMutation,
//   } = useCancelOrder();

//   /* --------------------------- Upload Profile Image Function ----------------------------- */
//   const uploadProfileImage = async (file: File) => {
//     try {
//       setIsUploading(true);
//       setUploadProgress(0);

//       const allowedTypes = [
//         "image/jpeg",
//         "image/jpg",
//         "image/png",
//         "image/webp",
//       ];
//       if (!allowedTypes.includes(file.type)) {
//         throw new Error("Only JPEG, PNG, and WebP images are allowed");
//       }

//       const maxSize = 5 * 1024 * 1024;
//       if (file.size > maxSize) {
//         throw new Error("File size must be less than 5MB");
//       }

//       const formData = new FormData();
//       formData.append("images", file);
//       formData.append("user_id", user?.id?.toString() || "0");
//       formData.append("serviceName", "user");

//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/hotels/upload`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           timeout: 300000,
//           onUploadProgress: (e) => {
//             if (e.total) {
//               const progress = Math.round((e.loaded * 100) / e.total);
//               setUploadProgress(progress);
//             }
//           },
//         }
//       );

//       if (response.data.success && response.data.imageUrls?.length) {
//         const uploadedImageUrl = response.data.imageUrls[0];

//         setProfile((prev) => ({
//           ...prev,
//           avatar: uploadedImageUrl,
//         }));

//         toast.success(
//           response.data.message || "Profile picture updated successfully!"
//         );

//         return uploadedImageUrl;
//       }

//       throw new Error(response.data.message || "Upload failed");
//     } catch (error: any) {
//       console.error("❌ Profile Image Upload Failed:", error);

//       let errorMessage = "Failed to upload profile picture";
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }

//       toast.error(errorMessage);
//       throw error;
//     } finally {
//       setIsUploading(false);
//       setUploadProgress(0);
//     }
//   };

//   // Process orderList and categorize into past/upcoming
//   useEffect(() => {
//     if (Array.isArray(orderList) && orderList.length > 0) {
//       const currentDate = new Date("2025-08-19T00:00:00.000Z"); // Updated to current date
//       const pastBookings: Booking[] = [];
//       const upcomingBookings: Booking[] = [];

//       orderList.forEach((order: any) => {
//         try {
//           const booking = transformOrderToBooking(order);
//           const checkInDate = new Date(
//             order.reservation?.check_in_datetime || order.createdAt
//           );

//           if (checkInDate < currentDate && !isToday(checkInDate)) {
//             pastBookings.push({ ...booking, status: booking.status });
//           } else {
//             upcomingBookings.push({
//               ...booking,
//               status: booking.status,
//               reservation_id: booking?.reservation_id,
//             });
//           }
//         } catch (error) {
//           console.error("Error processing order:", error, order);
//         }
//       });

//       pastBookings.sort((a, b) => {
//         const dateA = new Date(
//           orderList.find((o: any) => o.order_id?.toString() === a.id)
//             ?.createdAt || ""
//         );
//         const dateB = new Date(
//           orderList.find((o: any) => o.order_id?.toString() === b.id)
//             ?.createdAt || ""
//         );
//         return dateB.getTime() - dateA.getTime();
//       });

//       upcomingBookings.sort((a, b) => {
//         const dateA = new Date(
//           orderList.find((o: any) => o.order_id?.toString() === a.id)
//             ?.reservation?.check_in_datetime || ""
//         );
//         const dateB = new Date(
//           orderList.find((o: any) => o.order_id?.toString() === b.id)
//             ?.reservation?.check_in_datetime || ""
//         );
//         return dateA.getTime() - dateB.getTime();
//       });

//       setPast(pastBookings);
//       setUpcoming(upcomingBookings);
//     } else {
//       setPast([]);
//       setUpcoming([]);
//     }
//   }, [orderList]);

//   useEffect(() => {
//     if (user) {
//       const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

//       let userAvatar = user.avtar || user.avatar;

//       if (!userAvatar && orderList.length > 0) {
//         userAvatar = orderList[0]?.user?.avtar;
//       }

//       if (!userAvatar) {
//         userAvatar =
//           "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80";
//       }

//       const updatedProfile = {
//         name: fullName || user.email || "User",
//         bio: `${user.role || "Guest"} • Hotel Booking Platform`,
//         joinDate: user.createdAt
//           ? `Joined ${new Date(user.createdAt).getFullYear()}`
//           : "Joined 2024",
//         avatar: userAvatar,
//       };

//       setProfile(updatedProfile);
//       setEditedProfile(updatedProfile);
//     }
//   }, [user, orderList]);

//   useEffect(() => {
//     if (isHotelError && !isHotelLoading) {
//       toast.error(
//         hotelError instanceof Error ? hotelError.message : "An error occurred"
//       );
//       router.push("/login");
//     }
//     if (Array.isArray(hotelData?.data)) {
//       const fetchedOrders = hotelData.data;
//       setOrderList(fetchedOrders);
//     }
//   }, [isHotelError, isHotelLoading, hotelError, hotelData, router]);

//   const handleCancelClick = (b: Booking) => {
//     setTarget(b);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setTarget(null);
//   };

//   const handleConfirm = () => {
//     if (target) {
//       cancelMutation({
//         id: target.reservation_id,
//       });
//       setUpcoming((prev) => prev.filter((b) => b.id !== target.id));
//       toast.success("Booking cancelled successfully");
//     }
//     handleClose();
//   };

//   const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     try {
//       await uploadProfileImage(file);
//     } catch (error) {
//       console.error("Photo upload failed:", error);
//     }

//     e.target.value = "";
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//     setEditedProfile(profile);
//   };

//   const handleSaveProfile = () => {
//     setProfile(editedProfile);
//     setIsEditing(false);
//     toast.success("Profile updated successfully");
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setEditedProfile(profile);
//   };

//   const handleViewHotel = () => {
//     router.push("/");
//   };

//   useEffect(() => {
//     if (user?.id) {
//       hotelMutation({
//         user_id: user.id,
//       });
//     }
//   }, [hotelMutation, user?.id]);

//   return (
//     <>
//       <Box
//         sx={{
//           maxWidth: 1200,
//           mx: "auto",
//           px: { xs: 2, md: 3 },
//           py: { xs: 4, md: 6 },
//         }}
//       >
//         {/* --------------------- Profile Header -------------------- */}
//         <Paper
//           elevation={2}
//           sx={{
//             p: { xs: 3, md: 4 },
//             mb: 4,
//             borderRadius: 3,
//             background: "linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%)",
//           }}
//         >
//           {isHotelLoading ? (
//             <ProfileSkeleton />
//           ) : (
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 alignItems: { xs: "center", sm: "flex-start" },
//                 gap: 3,
//               }}
//             >
//               {/* Profile Photo with Upload */}
//               <Box sx={{ position: "relative", textAlign: "center" }}>
//                 <Avatar
//                   src={profile.avatar}
//                   alt="Profile"
//                   sx={{
//                     width: { xs: 100, md: 120 },
//                     height: { xs: 100, md: 120 },
//                     border: "4px solid white",
//                     boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
//                     ...(isUploading && {
//                       opacity: 0.7,
//                       filter: "blur(1px)",
//                     }),
//                   }}
//                 />

//                 {isUploading && (
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: "50%",
//                       left: "50%",
//                       transform: "translate(-50%, -50%)",
//                       zIndex: 2,
//                     }}
//                   >
//                     <CircularProgress
//                       variant="determinate"
//                       value={uploadProgress}
//                       size={60}
//                       thickness={4}
//                       sx={{ color: "success.main" }}
//                     />
//                     <Typography
//                       variant="caption"
//                       component="span" // ✅ FIXED: Using span instead of default p tag
//                       sx={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         color: "success.main",
//                         fontWeight: 600,
//                       }}
//                     >
//                       {uploadProgress}%
//                     </Typography>
//                   </Box>
//                 )}

//                 <IconButton
//                   component="label"
//                   disabled={isUploading}
//                   sx={{
//                     position: "absolute",
//                     bottom: 0,
//                     right: 0,
//                     bgcolor: "success.main",
//                     color: "white",
//                     width: 40,
//                     height: 40,
//                     "&:hover": { bgcolor: "success.dark" },
//                     "&:disabled": {
//                       bgcolor: "grey.400",
//                       color: "grey.600",
//                     },
//                     boxShadow: 2,
//                   }}
//                 >
//                   <input
//                     hidden
//                     accept="image/jpeg,image/jpg,image/png,image/webp"
//                     type="file"
//                     onChange={handlePhotoChange}
//                   />
//                   <CameraAltIcon fontSize="small" />
//                 </IconButton>

//                 {isUploading && (
//                   <Typography
//                     variant="caption"
//                     component="div" // ✅ FIXED: Using div instead of default p tag
//                     color="success.main"
//                     sx={{ mt: 1, fontWeight: 600 }}
//                   >
//                     Uploading...
//                   </Typography>
//                 )}
//               </Box>

//               {/* Profile Info */}
//               <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
//                 {isEditing ? (
//                   <Stack spacing={2}>
//                     <TextField
//                       fullWidth
//                       label="Name"
//                       variant="outlined"
//                       value={editedProfile.name}
//                       onChange={(e) =>
//                         setEditedProfile({
//                           ...editedProfile,
//                           name: e.target.value,
//                         })
//                       }
//                       sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
//                     />
//                     <TextField
//                       fullWidth
//                       label="Bio"
//                       variant="outlined"
//                       value={editedProfile.bio}
//                       onChange={(e) =>
//                         setEditedProfile({
//                           ...editedProfile,
//                           bio: e.target.value,
//                         })
//                       }
//                       sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
//                     />
//                     <Stack direction="row" spacing={1}>
//                       <Button
//                         variant="contained"
//                         color="success"
//                         startIcon={<SaveIcon />}
//                         onClick={handleSaveProfile}
//                       >
//                         Save
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         color="error"
//                         startIcon={<CancelIcon />}
//                         onClick={handleCancelEdit}
//                       >
//                         Cancel
//                       </Button>
//                     </Stack>
//                   </Stack>
//                 ) : (
//                   <>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         justifyContent: { xs: "center", sm: "flex-start" },
//                         mb: 1,
//                       }}
//                     >
//                       <Typography
//                         variant="h4"
//                         component="h1" // ✅ FIXED: Explicit semantic heading
//                         fontWeight={700}
//                         color="text.primary"
//                       >
//                         {profile.name}
//                       </Typography>
//                     </Box>
//                     <Typography
//                       component="div" // ✅ FIXED: Using div instead of default p tag
//                       color="text.secondary"
//                       sx={{ mb: 2, fontSize: "1.1rem" }}
//                     >
//                       {profile.bio} • {profile.joinDate}
//                     </Typography>
//                   </>
//                 )}
//               </Box>
//             </Box>
//           )}
//         </Paper>

//         {/* ------------------------ Bookings Section -------------------------- */}
//         <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
//           <Tabs
//             value={tab}
//             onChange={(_, v) => setTab(v)}
//             sx={{
//               bgcolor: "grey.50",
//               "& .MuiTab-root": {
//                 fontWeight: 600,
//                 fontSize: "1rem",
//                 color: "text.secondary",
//                 "&.Mui-selected": {
//                   color: "success.main",
//                 },
//               },
//               "& .MuiTabs-indicator": {
//                 backgroundColor: "success.main",
//                 height: 3,
//               },
//             }}
//             variant="fullWidth"
//           >
//             <Tab label={`Past Bookings (${past.length})`} />
//             <Tab label={`Upcoming Bookings (${upcoming.length})`} />
//           </Tabs>

//           <Box sx={{ p: 3 }}>
//             <TabPanel value={tab} index={0}>
//               {isHotelLoading ? (
//                 <Stack spacing={3}>
//                   {[1, 2, 3].map((i) => (
//                     <BookingCardSkeleton key={i} />
//                   ))}
//                 </Stack>
//               ) : past.length === 0 ? (
//                 <Box sx={{ textAlign: "center", py: 6 }}>
//                   <Typography
//                     variant="h6"
//                     component="h2" // ✅ FIXED: Semantic heading
//                     color="text.secondary"
//                     gutterBottom
//                   >
//                     No past bookings yet
//                   </Typography>
//                   <Typography
//                     component="div" // ✅ FIXED: Using div instead of p
//                     color="text.secondary"
//                   >
//                     Your completed stays will appear here
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Stack spacing={3}>
//                   {past.map((booking) => (
//                     <BookingCardWithoutImage
//                       key={booking.id}
//                       {...booking}
//                       actionLabel="VISIT HOTELS"
//                       isPast={true}
//                       onViewHotel={handleViewHotel}
//                     />
//                   ))}
//                 </Stack>
//               )}
//             </TabPanel>

//             <TabPanel value={tab} index={1}>
//               {isHotelLoading ? (
//                 <Stack spacing={3}>
//                   {[1, 2, 3].map((i) => (
//                     <BookingCardSkeleton key={i} />
//                   ))}
//                 </Stack>
//               ) : upcoming.length === 0 ? (
//                 <Box sx={{ textAlign: "center", py: 6 }}>
//                   <Typography
//                     variant="h6"
//                     component="h2" // ✅ FIXED: Semantic heading
//                     color="text.secondary"
//                     gutterBottom
//                   >
//                     No upcoming bookings
//                   </Typography>
//                   <Typography
//                     component="div" // ✅ FIXED: Using div instead of p
//                     color="text.secondary"
//                     sx={{ mb: 2 }}
//                   >
//                     Book your next adventure today!
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     color="success"
//                     onClick={handleViewHotel}
//                   >
//                     Explore Hotels
//                   </Button>
//                 </Box>
//               ) : (
//                 <Stack spacing={3}>
//                   {upcoming.map((booking) => (
//                     <BookingCardWithoutImage
//                       key={booking.id}
//                       {...booking}
//                       actionLabel="VISIT HOTEL"
//                       onCancel={() => handleCancelClick(booking)}
//                       isPast={false}
//                       onViewHotel={handleViewHotel}
//                     />
//                   ))}
//                 </Stack>
//               )}
//             </TabPanel>
//           </Box>
//         </Paper>
//       </Box>

//       {/* =================== Cancel Confirmation Dialog =================== */}
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ pr: 5, fontWeight: 600 }}>
//           Cancel Booking
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{ position: "absolute", right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent dividers>
//           <DialogContentText sx={{ fontSize: "1rem" }}>
//             {`Are you sure you want to cancel "${target?.title}" (${target?.dateRange})? `}
//             This action cannot be undone and may be subject to cancellation
//             fees.
//           </DialogContentText>
//         </DialogContent>

//         <DialogActions sx={{ p: 3 }}>
//           <Button onClick={handleClose} variant="outlined">
//             Keep Booking
//           </Button>
//           <Button color="error" variant="contained" onClick={handleConfirm}>
//             Yes, Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// /* -------------------------- Booking Card WITHOUT Image ---------------------------------- */
// function BookingCardWithoutImage({
//   status,
//   dateRange,
//   title,
//   description,
//   actionLabel,
//   onCancel,
//   isPast,
//   price,
//   paymentMethod,
//   bookingType,
//   duration,
//   orderId,
//   checkInDate,
//   onViewHotel,
// }: Booking & {
//   actionLabel: string;
//   onCancel?: () => void;
//   isPast: boolean;
//   onViewHotel?: () => void;
// }) {
//   const statusColor = status === "Completed" ? "success" : "info";
//   const isTodayBooking = checkInDate ? isToday(checkInDate) : false;
//   const showCancelButton =
//     onCancel && !isPast && status !== "cancel" && !isTodayBooking;

//   return (
//     <Card elevation={1}>
//       <CardContent sx={{ p: 3 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             mb: 1,
//           }}
//         >
//           <Box>
//             <Chip
//               label={status}
//               color={statusColor}
//               size="small"
//               sx={{ mb: 1, fontWeight: 600 }}
//             />
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 flexWrap: "wrap",
//                 gap: 1,
//               }}
//             >
//               <Typography
//                 variant="body2"
//                 component="span" // ✅ FIXED: Using span instead of p
//                 color="text.secondary"
//               >
//                 {dateRange}
//               </Typography>
//               {isTodayBooking && (
//                 <Chip
//                   label="Today"
//                   size="small"
//                   color="warning"
//                   sx={{ fontSize: "0.7rem", height: 20 }}
//                 />
//               )}
//             </Box>
//           </Box>
//           {price && (
//             <Typography
//               variant="h6"
//               component="div" // ✅ FIXED: Using div instead of p
//               color="success.main"
//               fontWeight={600}
//             >
//               {price}
//             </Typography>
//           )}
//         </Box>

//         <Typography
//           variant="h6"
//           component="h3" // ✅ FIXED: Semantic heading
//           fontWeight={600}
//           gutterBottom
//         >
//           {title}
//         </Typography>
//         <Typography
//           variant="body2"
//           component="div" // ✅ FIXED: Using div instead of p
//           color="text.secondary"
//           sx={{
//             mb: 2,
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//           }}
//         >
//           {description}
//         </Typography>

//         <Stack
//           direction="row"
//           spacing={1}
//           sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
//         >
//           {paymentMethod && (
//             <Chip
//               label={paymentMethod}
//               size="small"
//               variant="outlined"
//               color="primary"
//             />
//           )}
//           {duration && (
//             <Chip
//               label={duration}
//               size="small"
//               variant="outlined"
//               color="secondary"
//             />
//           )}
//           {bookingType && (
//             <Chip
//               label={bookingType}
//               size="small"
//               variant="outlined"
//               color="default"
//             />
//           )}
//         </Stack>

//         {orderId && (
//           <Typography
//             variant="caption"
//             component="div" // ✅ FIXED: Using div instead of p
//             color="text.secondary"
//             sx={{ mb: 2 }}
//           >
//             Order ID: {orderId}
//           </Typography>
//         )}

//         <Divider sx={{ my: 2 }} />

//         <Stack direction="row" spacing={1} justifyContent="flex-end">
//           <Button
//             variant={isPast ? "outlined" : "contained"}
//             color="success"
//             size="small"
//             onClick={onViewHotel}
//           >
//             {actionLabel}
//           </Button>
//           {showCancelButton && (
//             <Button
//               variant="outlined"
//               color="error"
//               size="small"
//               onClick={onCancel}
//             >
//               Cancel
//             </Button>
//           )}
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// }

//new code

"use client";

import { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  Paper,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Stack,
  Chip,
  Card,
  CardContent,
  TextField,
  Divider,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { useCancelOrder, useOrdersByusers } from "@src/hooks/apiHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@src/redux/store";
import { selectUser } from "@src/redux/reducers/authSlice";
import axios from "axios";

/* --------------------------- Types & Interfaces ----------------------------- */
interface Booking {
  id: string;
  status: "Completed" | "Confirmed" | "cancel";
  dateRange: string;
  reservation_id: number;
  title: string;
  description: string;
  image: string;
  price?: string;
  paymentMethod?: string;
  bookingType?: string;
  duration?: string;
  orderId?: string;
  checkInDate?: Date;
}

interface UserProfile {
  name: string;
  bio: string;
  joinDate: string;
  avatar: string;
}

interface OrderData {
  id: string;
  order_id: number;
  amount: string;
  currency: string;
  status: string;
  payment_method: string;
  createdAt: string;
  reservation: {
    check_in_datetime: string;
    check_out_datetime: string;
    total_amount: string;
    booking_type: string;
    duration_hours: number;
    status: string;
    hotel: {
      name: string;
      description: string;
      address: string;
      city: string;
      star_rating: number;
    };
  };
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avtar?: string;
  };
}

/* --------------------------- Helper Functions ----------------------------- */
const formatDateRange = (
  checkIn: string,
  checkOut: string,
  durationHours?: number
) => {
  if (!checkIn) return "Date not specified";

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (durationHours && durationHours < 24) {
    return `${formatDate(checkInDate)} (${durationHours} hours)`;
  }

  if (checkInDate.toDateString() === checkOutDate.toDateString()) {
    return formatDate(checkInDate);
  }

  return `${formatDate(checkInDate)} – ${formatDate(checkOutDate)}`;
};

const transformOrderToBooking = (order: OrderData): Booking => {
  const { reservation = {}, user = {} } = order;
  const hotel = reservation?.hotel || {};

  const checkInDate = new Date(
    reservation?.check_in_datetime || order.createdAt
  );

  return {
    id: order.order_id?.toString() || order.id,
    orderId: order.id,
    status: reservation?.status,
    reservation_id: reservation?.reservation_id,
    dateRange: formatDateRange(
      reservation?.check_in_datetime,
      reservation?.check_out_datetime,
      reservation?.duration_hours
    ),
    title: hotel.name || "Hotel Booking",
    description:
      hotel.description ||
      `${hotel.address || ""} ${hotel.city || ""}`.trim() ||
      "Hotel accommodation booking",
    image: "",
    price: `₹${order.amount || "0"}`,
    paymentMethod: order.payment_method,
    bookingType: reservation?.booking_type,
    duration: reservation?.duration_hours
      ? `${reservation.duration_hours} hours`
      : undefined,
    checkInDate,
  };
};

// ✅ UPDATED: Current date to August 29, 2025
const getCurrentDate = (): Date => {
  return new Date("2025-08-29T00:00:00.000Z");
};

const isToday = (date: Date): boolean => {
  const today = getCurrentDate();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
};

// ✅ NEW: Check if date is in the future (after today)
const isFutureDate = (date: Date): boolean => {
  const today = getCurrentDate();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const dateStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  return dateStart > todayStart;
};

/* --------------------------- Helper Component ----------------------------- */
function TabPanel({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) {
  return (
    <div hidden={value !== index} role="tabpanel">
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

/* --------------------------- Skeleton Components ----------------------------- */
function ProfileSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "center", sm: "flex-start" },
        gap: 3,
      }}
    >
      <Box sx={{ position: "relative", textAlign: "center" }}>
        <Skeleton
          variant="circular"
          width={120}
          height={120}
          sx={{
            border: "4px solid white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        />
      </Box>

      <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
        <Skeleton variant="text" width="60%" height={48} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={32} />
      </Box>
    </Box>
  );
}

function BookingCardSkeleton() {
  return (
    <Card elevation={1}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box>
            <Skeleton variant="rounded" width={80} height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={120} height={20} />
          </Box>
          <Skeleton variant="text" width={60} height={28} />
        </Box>

        <Skeleton variant="text" width="80%" height={28} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="70%" height={20} sx={{ mb: 2 }} />

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Skeleton variant="rounded" width={70} height={24} />
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={80} height={24} />
        </Stack>

        <Skeleton variant="text" width="50%" height={16} sx={{ mb: 2 }} />

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Skeleton variant="rounded" width={100} height={32} />
          <Skeleton variant="rounded" width={70} height={32} />
        </Stack>
      </CardContent>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Profile Component                                                    */
/* -------------------------------------------------------------------------- */
export default function ProfileComponent() {
  const [tab, setTab] = useState(0);
  const [past, setPast] = useState<Booking[]>([]);
  const [upcoming, setUpcoming] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    name: "User Profile",
    bio: "Hotel Guest",
    joinDate: "Joined 2024",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [orderList, setOrderList] = useState<OrderData[]>([]);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const user = useAppSelector(selectUser);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<Booking | null>(null);
  const router = useRouter();

  const {
    isError: isHotelError,
    isLoading: isHotelLoading,
    data: hotelData,
    error: hotelError,
    mutate: hotelMutation,
  } = useOrdersByusers();

  const {
    isError: iscancelError,
    isLoading: iscancelLoading,
    data: cancelData,
    error: cancelError,
    mutate: cancelMutation,
  } = useCancelOrder();

  /* --------------------------- Upload Profile Image Function ----------------------------- */
  const uploadProfileImage = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Only JPEG, PNG, and WebP images are allowed");
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error("File size must be less than 5MB");
      }

      const formData = new FormData();
      formData.append("images", file);
      formData.append("user_id", user?.id?.toString() || "0");
      formData.append("serviceName", "user");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/hotels/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 300000,
          onUploadProgress: (e) => {
            if (e.total) {
              const progress = Math.round((e.loaded * 100) / e.total);
              setUploadProgress(progress);
            }
          },
        }
      );

      if (response.data.success && response.data.imageUrls?.length) {
        const uploadedImageUrl = response.data.imageUrls[0];

        setProfile((prev) => ({
          ...prev,
          avatar: uploadedImageUrl,
        }));

        toast.success(
          response.data.message || "Profile picture updated successfully!"
        );

        return uploadedImageUrl;
      }

      throw new Error(response.data.message || "Upload failed");
    } catch (error: any) {
      console.error("❌ Profile Image Upload Failed:", error);

      let errorMessage = "Failed to upload profile picture";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
      throw error;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // ✅ UPDATED: Process orderList and categorize into past/upcoming
  useEffect(() => {
    if (Array.isArray(orderList) && orderList.length > 0) {
      const currentDate = getCurrentDate();
      const pastBookings: Booking[] = [];
      const upcomingBookings: Booking[] = [];

      orderList.forEach((order: any) => {
        try {
          const booking = transformOrderToBooking(order);
          const checkInDate = new Date(
            order.reservation?.check_in_datetime || order.createdAt
          );

          // Today and future bookings go to upcoming, only past goes to past
          if (checkInDate < currentDate && !isToday(checkInDate)) {
            pastBookings.push({ ...booking, status: booking.status });
          } else {
            upcomingBookings.push({
              ...booking,
              status: booking.status,
              reservation_id: booking?.reservation_id,
            });
          }
        } catch (error) {
          console.error("Error processing order:", error, order);
        }
      });

      pastBookings.sort((a, b) => {
        const dateA = new Date(
          orderList.find((o: any) => o.order_id?.toString() === a.id)
            ?.createdAt || ""
        );
        const dateB = new Date(
          orderList.find((o: any) => o.order_id?.toString() === b.id)
            ?.createdAt || ""
        );
        return dateB.getTime() - dateA.getTime();
      });

      upcomingBookings.sort((a, b) => {
        const dateA = new Date(
          orderList.find((o: any) => o.order_id?.toString() === a.id)
            ?.reservation?.check_in_datetime || ""
        );
        const dateB = new Date(
          orderList.find((o: any) => o.order_id?.toString() === b.id)
            ?.reservation?.check_in_datetime || ""
        );
        return dateA.getTime() - dateB.getTime();
      });

      setPast(pastBookings);
      setUpcoming(upcomingBookings);
    } else {
      setPast([]);
      setUpcoming([]);
    }
  }, [orderList]);

  useEffect(() => {
    if (user) {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

      let userAvatar = user.avtar || user.avatar;

      if (!userAvatar && orderList.length > 0) {
        userAvatar = orderList[0]?.user?.avtar;
      }

      if (!userAvatar) {
        userAvatar =
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80";
      }

      const updatedProfile = {
        name: fullName || user.email || "User",
        bio: `${user.role || "Guest"} • Hotel Booking Platform`,
        joinDate: user.createdAt
          ? `Joined ${new Date(user.createdAt).getFullYear()}`
          : "Joined 2024",
        avatar: userAvatar,
      };

      setProfile(updatedProfile);
      setEditedProfile(updatedProfile);
    }
  }, [user, orderList]);

  useEffect(() => {
    if (isHotelError && !isHotelLoading) {
      toast.error(
        hotelError instanceof Error ? hotelError.message : "An error occurred"
      );
      router.push("/login");
    }
    if (Array.isArray(hotelData?.data)) {
      const fetchedOrders = hotelData.data;
      setOrderList(fetchedOrders);
    }
  }, [isHotelError, isHotelLoading, hotelError, hotelData, router]);

  const handleCancelClick = (b: Booking) => {
    setTarget(b);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTarget(null);
  };

  const handleConfirm = () => {
    if (target) {
      cancelMutation({
        id: target.reservation_id,
      });
      setUpcoming((prev) => prev.filter((b) => b.id !== target.id));
      toast.success("Booking cancelled successfully");
    }
    handleClose();
  };

  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await uploadProfileImage(file);
    } catch (error) {
      console.error("Photo upload failed:", error);
    }

    e.target.value = "";
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleViewHotel = () => {
    router.push("/");
  };

  useEffect(() => {
    if (user?.id) {
      hotelMutation({
        user_id: user.id,
      });
    }
  }, [hotelMutation, user?.id]);

  return (
    <>
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, md: 3 },
          py: { xs: 4, md: 6 },
        }}
      >
        {/* --------------------- Profile Header -------------------- */}
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #f0f9ff 0%, #ecfdf5 100%)",
          }}
        >
          {isHotelLoading ? (
            <ProfileSkeleton />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                gap: 3,
              }}
            >
              {/* Profile Photo with Upload */}
              <Box sx={{ position: "relative", textAlign: "center" }}>
                <Avatar
                  src={profile.avatar}
                  alt="Profile"
                  sx={{
                    width: { xs: 100, md: 120 },
                    height: { xs: 100, md: 120 },
                    border: "4px solid white",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    ...(isUploading && {
                      opacity: 0.7,
                      filter: "blur(1px)",
                    }),
                  }}
                />

                {isUploading && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2,
                    }}
                  >
                    <CircularProgress
                      variant="determinate"
                      value={uploadProgress}
                      size={60}
                      thickness={4}
                      sx={{ color: "success.main" }}
                    />
                    <Typography
                      variant="caption"
                      component="span"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "success.main",
                        fontWeight: 600,
                      }}
                    >
                      {uploadProgress}%
                    </Typography>
                  </Box>
                )}

                <IconButton
                  component="label"
                  disabled={isUploading}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "success.main",
                    color: "white",
                    width: 40,
                    height: 40,
                    "&:hover": { bgcolor: "success.dark" },
                    "&:disabled": {
                      bgcolor: "grey.400",
                      color: "grey.600",
                    },
                    boxShadow: 2,
                  }}
                >
                  <input
                    hidden
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    type="file"
                    onChange={handlePhotoChange}
                  />
                  <CameraAltIcon fontSize="small" />
                </IconButton>

                {isUploading && (
                  <Typography
                    variant="caption"
                    component="div"
                    color="success.main"
                    sx={{ mt: 1, fontWeight: 600 }}
                  >
                    Uploading...
                  </Typography>
                )}
              </Box>

              {/* Profile Info */}
              <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
                {isEditing ? (
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      value={editedProfile.name}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          name: e.target.value,
                        })
                      }
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                    <TextField
                      fullWidth
                      label="Bio"
                      variant="outlined"
                      value={editedProfile.bio}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          bio: e.target.value,
                        })
                      }
                      sx={{ "& .MuiOutlinedInput-root": { bgcolor: "white" } }}
                    />
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveProfile}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<CancelIcon />}
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </Stack>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        justifyContent: { xs: "center", sm: "flex-start" },
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="h4"
                        component="h1"
                        fontWeight={700}
                        color="text.primary"
                      >
                        {profile.name}
                      </Typography>
                      {/* <IconButton onClick={handleEditClick} size="small">
                        <EditIcon />
                      </IconButton> */}
                    </Box>
                    <Typography
                      component="div"
                      color="text.secondary"
                      sx={{ mb: 2, fontSize: "1.1rem" }}
                    >
                      {profile.bio} • {profile.joinDate}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          )}
        </Paper>

        {/* ------------------------ Bookings Section -------------------------- */}
        <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              bgcolor: "grey.50",
              "& .MuiTab-root": {
                fontWeight: 600,
                fontSize: "1rem",
                color: "text.secondary",
                "&.Mui-selected": {
                  color: "success.main",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "success.main",
                height: 3,
              },
            }}
            variant="fullWidth"
          >
            <Tab label={`Past Bookings (${past.length})`} />
            <Tab label={`Upcoming Bookings (${upcoming.length})`} />
          </Tabs>

          <Box sx={{ p: 3 }}>
            <TabPanel value={tab} index={0}>
              {isHotelLoading ? (
                <Stack spacing={3}>
                  {[1, 2, 3].map((i) => (
                    <BookingCardSkeleton key={i} />
                  ))}
                </Stack>
              ) : past.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    color="text.secondary"
                    gutterBottom
                  >
                    No past bookings yet
                  </Typography>
                  <Typography component="div" color="text.secondary">
                    Your completed stays will appear here
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={3}>
                  {past.map((booking) => (
                    <BookingCardWithoutImage
                      key={booking.id}
                      {...booking}
                      actionLabel="VISIT HOTELS"
                      isPast={true}
                      onViewHotel={handleViewHotel}
                    />
                  ))}
                </Stack>
              )}
            </TabPanel>

            <TabPanel value={tab} index={1}>
              {isHotelLoading ? (
                <Stack spacing={3}>
                  {[1, 2, 3].map((i) => (
                    <BookingCardSkeleton key={i} />
                  ))}
                </Stack>
              ) : upcoming.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    color="text.secondary"
                    gutterBottom
                  >
                    No upcoming bookings
                  </Typography>
                  <Typography
                    component="div"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Book your next adventure today!
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleViewHotel}
                  >
                    Explore Hotels
                  </Button>
                </Box>
              ) : (
                <Stack spacing={3}>
                  {upcoming.map((booking) => (
                    <BookingCardWithoutImage
                      key={booking.id}
                      {...booking}
                      actionLabel="VISIT HOTEL"
                      onCancel={() => handleCancelClick(booking)}
                      isPast={false}
                      onViewHotel={handleViewHotel}
                    />
                  ))}
                </Stack>
              )}
            </TabPanel>
          </Box>
        </Paper>
      </Box>

      {/* =================== Cancel Confirmation Dialog =================== */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ pr: 5, fontWeight: 600 }}>
          Cancel Booking
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <DialogContentText sx={{ fontSize: "1rem" }}>
            {`Are you sure you want to cancel "${target?.title}" (${target?.dateRange})? `}
            This action cannot be undone and may be subject to cancellation
            fees.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} variant="outlined">
            Keep Booking
          </Button>
          <Button color="error" variant="contained" onClick={handleConfirm}>
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

/* -------------------------- Booking Card WITHOUT Image ---------------------------------- */
function BookingCardWithoutImage({
  status,
  dateRange,
  title,
  description,
  actionLabel,
  onCancel,
  isPast,
  price,
  paymentMethod,
  bookingType,
  duration,
  orderId,
  checkInDate,
  onViewHotel,
}: Booking & {
  actionLabel: string;
  onCancel?: () => void;
  isPast: boolean;
  onViewHotel?: () => void;
}) {
  const statusColor = status === "Completed" ? "success" : "info";
  const isTodayBooking = checkInDate ? isToday(checkInDate) : false;
  const isFutureBooking = checkInDate ? isFutureDate(checkInDate) : false;

  // ✅ UPDATED: Cancel button logic
  // Show cancel button only for future bookings (not past, not today)
  const showCancelButton =
    onCancel && !isPast && status !== "cancel" && isFutureBooking; // Only show for future dates

  return (
    <Card elevation={1}>
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Chip
                label={status}
                color={statusColor}
                size="small"
                sx={{ fontWeight: 600 }}
              />
              {isTodayBooking && (
                <Chip
                  label="Today"
                  size="small"
                  color="warning"
                  sx={{
                    fontSize: "0.7rem",
                    height: 20,
                    fontWeight: 600,
                    animation: "pulse 2s infinite",
                  }}
                />
              )}
            </Box>
            <Typography variant="body2" component="span" color="text.secondary">
              {dateRange}
            </Typography>
          </Box>
          {price && (
            <Typography
              variant="h6"
              component="div"
              color="success.main"
              fontWeight={600}
            >
              {price}
            </Typography>
          )}
        </Box>

        <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="body2"
          component="div"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
        >
          {paymentMethod && (
            <Chip
              label={paymentMethod}
              size="small"
              variant="outlined"
              color="primary"
            />
          )}
          {duration && (
            <Chip
              label={duration}
              size="small"
              variant="outlined"
              color="secondary"
            />
          )}
          {bookingType && (
            <Chip
              label={bookingType}
              size="small"
              variant="outlined"
              color="default"
            />
          )}
        </Stack>

        {orderId && (
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Order ID: {orderId}
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            variant={isPast ? "outlined" : "contained"}
            color="success"
            size="small"
            onClick={onViewHotel}
          >
            {actionLabel}
          </Button>
          {showCancelButton && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
