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
  Container,
  alpha,
} from "@mui/material";
import {
  Close as CloseIcon,
  CameraAlt as CameraAltIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Hotel as HotelIcon,
  CalendarToday as CalendarIcon,
  Payment as PaymentIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
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
  checkOutDate?: Date;
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
    reservation_id: number;
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

/* --------------------------- Updated Helper Functions ----------------------------- */
// Get current real date
const getCurrentDate = (): Date => {
  return new Date(); // Use actual current date
};

// Check if check-in is within 24 hours from now
const isWithin24Hours = (checkInDate: Date): boolean => {
  const now = getCurrentDate();
  const timeDiff = checkInDate.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60); // Convert to hours
  return hoursDiff <= 24 && hoursDiff >= 0; // Within 24 hours and in the future
};

// Check if check-in date is today
const isToday = (date: Date): boolean => {
  const today = getCurrentDate();
  const dateStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  return dateStart.getTime() === todayStart.getTime();
};

// Check if check-in date is in the past
const isPastDate = (date: Date): boolean => {
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
  return dateStart < todayStart;
};

// Enhanced date range formatter to show both dates clearly
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // For hourly bookings (less than 24 hours)
  if (durationHours && durationHours < 24) {
    return `${formatDate(checkInDate)} (${durationHours} hours)`;
  }

  // Check if it's a same-day booking
  const isSameDay = checkInDate.toDateString() === checkOutDate.toDateString();

  if (isSameDay) {
    return `${formatDate(checkInDate)} • ${formatTime(
      checkInDate
    )} - ${formatTime(checkOutDate)}`;
  }

  // Multi-day booking - show both dates
  return `${formatDate(checkInDate)} - ${formatDate(checkOutDate)}`;
};

const transformOrderToBooking = (order: OrderData): Booking => {
  const { reservation = {}, user = {} } = order;
  const hotel = reservation?.hotel || {};

  const checkInDate = new Date(
    reservation?.check_in_datetime || order.createdAt
  );
  const checkOutDate = new Date(
    reservation?.check_out_datetime || order.createdAt
  );

  // Map status properly from API response
  const getBookingStatus = (): "Completed" | "Confirmed" | "cancel" => {
    const orderStatus = order.status?.toLowerCase();
    const reservationStatus = reservation?.status?.toLowerCase();

    if (
      orderStatus === "cancel" ||
      orderStatus === "cancelled" ||
      reservationStatus === "cancel" ||
      reservationStatus === "cancelled"
    ) {
      return "cancel";
    }
    if (orderStatus === "completed" || reservationStatus === "completed") {
      return "Completed";
    }
    return "Confirmed";
  };

  return {
    id: order.order_id?.toString() || order.id,
    orderId: order.id,
    status: getBookingStatus(),
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
    checkOutDate,
  };
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
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
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
          width={{ xs: 80, sm: 100 }}
          height={{ xs: 80, sm: 100 }}
          sx={{ boxShadow: 1 }}
        />
      </Box>

      <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
        <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="40%" height={24} />
      </Box>
    </Box>
  );
}

function BookingCardSkeleton() {
  return (
    <Card
      sx={{ borderRadius: 2, border: "1px solid", borderColor: "grey.200" }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box>
            <Skeleton variant="rounded" width={70} height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={100} height={16} />
          </Box>
          <Skeleton variant="text" width={50} height={24} />
        </Box>

        <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="100%" height={16} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="70%" height={16} sx={{ mb: 2 }} />

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Skeleton variant="rounded" width={60} height={20} />
          <Skeleton variant="rounded" width={50} height={20} />
        </Stack>

        <Skeleton variant="text" width="40%" height={14} sx={{ mb: 2 }} />

        <Divider sx={{ my: 1.5 }} />

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Skeleton variant="rounded" width={80} height={32} />
          <Skeleton variant="rounded" width={60} height={32} />
        </Stack>
      </CardContent>
    </Card>
  );
}

/* -------------------------- Enhanced Booking Card ---------------------------------- */
function MinimalBookingCard({
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
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return { bg: "#f0f9f4", color: "#16a34a", border: "#bbf7d0" };
      case "Confirmed":
        return { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" };
      case "cancel":
        return { bg: "#fef2f2", color: "#dc2626", border: "#fecaca" };
      default:
        return { bg: "#f8fafc", color: "#64748b", border: "#e2e8f0" };
    }
  };

  const statusColors = getStatusColor(status);

  // Check if check-in is today
  const isTodayBooking = checkInDate ? isToday(checkInDate) : false;

  // Check if check-in is within 24 hours
  const isWithin24HoursBooking = checkInDate
    ? isWithin24Hours(checkInDate)
    : false;

  // Get today/tomorrow label
  const getTodayLabel = () => {
    if (!checkInDate) return "Soon";

    if (isToday(checkInDate)) return "Today";

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (checkInDate.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }

    return "Soon";
  };

  // ✅ UPDATED CANCEL LOGIC:
  // - No cancel for past bookings
  // - No cancel for cancelled bookings
  // - No cancel if check-in is today or within 24 hours
  const showCancelButton =
    onCancel &&
    !isPast &&
    status !== "cancel" &&
    !isTodayBooking && // No cancel if check-in is today
    !isWithin24HoursBooking; // No cancel if check-in is within 24 hours

  return (
    <Card
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor:
          isTodayBooking || isWithin24HoursBooking
            ? "#f59e0b"
            : status === "cancel"
            ? "#fecaca"
            : "grey.200",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          transform: "translateY(-1px)",
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 0.5 }}
            >
              {/* Status Badge */}
              {status == "cancel" && (
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: statusColors.bg,
                    border: `1px solid ${statusColors.border}`,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: statusColors.color,
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    }}
                  >
                    Cancelled
                  </Typography>
                </Box>
              )}
              {(isTodayBooking || isWithin24HoursBooking) &&
                status !== "cancel" && (
                  <Box
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: "#fef3c7",
                      border: "1px solid #fde68a",
                      animation: "pulse 2s infinite",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#d97706",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      {getTodayLabel()}
                    </Typography>
                  </Box>
                )}
            </Stack>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <CalendarIcon sx={{ fontSize: 14, color: "grey.500" }} />
              <Typography
                variant="body2"
                color="grey.600"
                sx={{ fontSize: "0.875rem" }}
              >
                {dateRange}
              </Typography>
            </Box>
          </Box>
          {price && (
            <Typography
              variant="h6"
              sx={{
                color: status === "cancel" ? "#6b7280" : "#059669",
                fontWeight: 700,
                fontSize: "1.125rem",
                ...(status === "cancel" && {
                  textDecoration: "line-through",
                }),
              }}
            >
              {price}
            </Typography>
          )}
        </Box>

        {/* Title & Description */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 1 }}
          >
            <HotelIcon sx={{ fontSize: 18, color: "grey.500", mt: 0.2 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: "1rem",
                color: status === "cancel" ? "#6b7280" : "grey.900",
                lineHeight: 1.3,
              }}
            >
              {title}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: status === "cancel" ? "#9ca3af" : "grey.600",
              fontSize: "0.875rem",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              ml: 3,
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Details */}
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}
        >
          {paymentMethod && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 1,
                py: 0.25,
                borderRadius: 1,
                backgroundColor: alpha(
                  "#3b82f6",
                  status === "cancel" ? 0.05 : 0.1
                ),
                border: `1px solid ${alpha(
                  "#3b82f6",
                  status === "cancel" ? 0.1 : 0.2
                )}`,
              }}
            >
              <PaymentIcon
                sx={{
                  fontSize: 12,
                  color: status === "cancel" ? "#9ca3af" : "#3b82f6",
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: status === "cancel" ? "#9ca3af" : "#3b82f6",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                }}
              >
                {paymentMethod}
              </Typography>
            </Box>
          )}
          {duration && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 1,
                py: 0.25,
                borderRadius: 1,
                backgroundColor: alpha(
                  "#8b5cf6",
                  status === "cancel" ? 0.05 : 0.1
                ),
                border: `1px solid ${alpha(
                  "#8b5cf6",
                  status === "cancel" ? 0.1 : 0.2
                )}`,
              }}
            >
              <AccessTimeIcon
                sx={{
                  fontSize: 12,
                  color: status === "cancel" ? "#9ca3af" : "#8b5cf6",
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: status === "cancel" ? "#9ca3af" : "#8b5cf6",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                }}
              >
                {duration}
              </Typography>
            </Box>
          )}
          {bookingType && (
            <Box
              sx={{
                px: 1,
                py: 0.25,
                borderRadius: 1,
                backgroundColor: alpha(
                  "#6b7280",
                  status === "cancel" ? 0.05 : 0.1
                ),
                border: `1px solid ${alpha(
                  "#6b7280",
                  status === "cancel" ? 0.1 : 0.2
                )}`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: status === "cancel" ? "#9ca3af" : "#6b7280",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                }}
              >
                {bookingType}
              </Typography>
            </Box>
          )}
        </Stack>

        {/* Order ID */}
        {orderId && (
          <Typography
            variant="caption"
            sx={{
              color: status === "cancel" ? "#9ca3af" : "grey.500",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              mb: 2,
              display: "block",
            }}
          >
            Order: {orderId}
          </Typography>
        )}

        <Divider sx={{ my: 1.5, borderColor: "grey.200" }} />

        {/* Actions */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            variant={isPast ? "outlined" : "contained"}
            size="small"
            onClick={onViewHotel}
            sx={{
              borderRadius: 1.5,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
              px: 2,
              ...(isPast
                ? {
                    borderColor: "#059669",
                    color: "#059669",
                    "&:hover": {
                      backgroundColor: alpha("#059669", 0.05),
                      borderColor: "#047857",
                    },
                  }
                : {
                    backgroundColor: "#059669",
                    "&:hover": {
                      backgroundColor: "#047857",
                    },
                  }),
            }}
          >
            {actionLabel}
          </Button>

          {/* Show cancelled text when status is cancel */}
          {status !== "cancel" && showCancelButton && (
            <Button
              variant="outlined"
              size="small"
              onClick={onCancel}
              sx={{
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                px: 2,
                borderColor: "#dc2626",
                color: "#dc2626",
                "&:hover": {
                  backgroundColor: alpha("#dc2626", 0.05),
                  borderColor: "#b91c1c",
                },
              }}
            >
              Cancel
            </Button>
          )}
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

  // ✅ UPDATED: Enhanced booking categorization logic using real current date
  useEffect(() => {
    if (Array.isArray(orderList) && orderList.length > 0) {
      const pastBookings: Booking[] = [];
      const upcomingBookings: Booking[] = [];

      orderList.forEach((order: any) => {
        try {
          const booking = transformOrderToBooking(order);
          const checkInDate = new Date(
            order.reservation?.check_in_datetime || order.createdAt
          );

          // ✅ UPDATED LOGIC using real current date:
          // - Past: Only dates before today
          // - Upcoming: Today and future dates
          if (isPastDate(checkInDate)) {
            pastBookings.push({ ...booking, status: booking.status });
          } else {
            // Today and future bookings go to upcoming
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

      // Sort past bookings (most recent first)
      pastBookings.sort((a, b) => {
        const orderA = orderList.find(
          (o: any) => o.order_id?.toString() === a.id
        );
        const orderB = orderList.find(
          (o: any) => o.order_id?.toString() === b.id
        );
        const dateA = new Date(orderA?.createdAt || "");
        const dateB = new Date(orderB?.createdAt || "");
        return dateB.getTime() - dateA.getTime();
      });

      // Sort upcoming bookings (earliest check-in first)
      upcomingBookings.sort((a, b) => {
        const orderA = orderList.find(
          (o: any) => o.order_id?.toString() === a.id
        );
        const orderB = orderList.find(
          (o: any) => o.order_id?.toString() === b.id
        );

        const checkInA = new Date(
          orderA?.reservation?.check_in_datetime || orderA?.createdAt || ""
        );
        const checkInB = new Date(
          orderB?.reservation?.check_in_datetime || orderB?.createdAt || ""
        );

        // Sort by check-in date (earliest first)
        return checkInA.getTime() - checkInB.getTime();
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

  // Handle successful cancellation
  useEffect(() => {
    if (cancelData && !iscancelLoading && !iscancelError) {
      // Refresh the orders to get updated status from server
      if (user?.id) {
        hotelMutation({
          user_id: user.id,
        });
      }
    }
  }, [cancelData, iscancelLoading, iscancelError, hotelMutation, user?.id]);

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

      // Update the booking status to "cancel" instead of removing it
      setUpcoming((prev) =>
        prev.map((booking) =>
          booking.id === target.id
            ? { ...booking, status: "cancel" as const }
            : booking
        )
      );

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
    router.push("/home");
  };

  useEffect(() => {
    if (user?.id) {
      hotelMutation({
        user_id: user.id,
      });
    }
  }, [hotelMutation, user?.id]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        {/* Profile Header */}
        <Paper
          sx={{
            p: { xs: 2.5, sm: 3 },
            mb: 3,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "grey.200",
            backgroundColor: "#fafbfc",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
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
              {/* Profile Photo */}
              <Box sx={{ position: "relative", textAlign: "center" }}>
                <Avatar
                  src={profile.avatar}
                  alt="Profile"
                  sx={{
                    width: { xs: 80, sm: 100 },
                    height: { xs: 80, sm: 100 },
                    border: "2px solid white",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
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
                      size={50}
                      thickness={4}
                      sx={{ color: "#059669" }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "#059669",
                        fontWeight: 600,
                        fontSize: "0.75rem",
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
                    bottom: -2,
                    right: -2,
                    bgcolor: "#059669",
                    color: "white",
                    width: 32,
                    height: 32,
                    boxShadow: 1,
                    "&:hover": { bgcolor: "#047857" },
                    "&:disabled": {
                      bgcolor: "grey.400",
                      color: "grey.600",
                    },
                  }}
                >
                  <input
                    hidden
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    type="file"
                    onChange={handlePhotoChange}
                  />
                  <CameraAltIcon sx={{ fontSize: 16 }} />
                </IconButton>

                {isUploading && (
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 1,
                      fontWeight: 600,
                      color: "#059669",
                      fontSize: "0.75rem",
                      display: "block",
                    }}
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
                      size="small"
                      value={editedProfile.name}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          name: e.target.value,
                        })
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "white",
                          borderRadius: 1.5,
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Bio"
                      variant="outlined"
                      size="small"
                      value={editedProfile.bio}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          bio: e.target.value,
                        })
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "white",
                          borderRadius: 1.5,
                        },
                      }}
                    />
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveProfile}
                        sx={{
                          backgroundColor: "#059669",
                          borderRadius: 1.5,
                          textTransform: "none",
                          fontWeight: 600,
                          "&:hover": { backgroundColor: "#047857" },
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleCancelEdit}
                        sx={{
                          borderColor: "#dc2626",
                          color: "#dc2626",
                          borderRadius: 1.5,
                          textTransform: "none",
                          fontWeight: 600,
                          "&:hover": {
                            backgroundColor: alpha("#dc2626", 0.05),
                            borderColor: "#b91c1c",
                          },
                        }}
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
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: "#111827",
                          fontSize: { xs: "1.5rem", sm: "1.875rem" },
                        }}
                      >
                        {profile.name}
                      </Typography>
                      <IconButton
                        onClick={handleEditClick}
                        size="small"
                        sx={{
                          color: "#6b7280",
                          "&:hover": {
                            color: "#374151",
                            backgroundColor: alpha("#6b7280", 0.1),
                          },
                        }}
                      >
                        <EditIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </Box>
                    <Typography
                      sx={{
                        color: "#6b7280",
                        fontSize: "1rem",
                        fontWeight: 500,
                      }}
                    >
                      {user?.email} • {user?.phone || "not available"}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          )}
        </Paper>

        {/* Bookings Section */}
        <Paper
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: "grey.200",
            overflow: "hidden",
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{
              bgcolor: "#f8fafc",
              borderBottom: "1px solid",
              borderColor: "grey.200",
              minHeight: 48,
              "& .MuiTab-root": {
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "#6b7280",
                textTransform: "none",
                minHeight: 48,
                "&.Mui-selected": {
                  color: "#059669",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#059669",
                height: 2,
              },
            }}
            variant="fullWidth"
          >
            <Tab label={`Past Bookings (${past.length})`} />
            <Tab label={`Upcoming Bookings (${upcoming.length})`} />
          </Tabs>

          <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
            <TabPanel value={tab} index={0}>
              {isHotelLoading ? (
                <Stack spacing={2}>
                  {[1, 2, 3].map((i) => (
                    <BookingCardSkeleton key={i} />
                  ))}
                </Stack>
              ) : past.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#6b7280",
                      fontWeight: 600,
                      mb: 1,
                      fontSize: "1.125rem",
                    }}
                  >
                    No past bookings yet
                  </Typography>
                  <Typography sx={{ color: "#9ca3af", fontSize: "0.875rem" }}>
                    Your completed stays will appear here
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={2}>
                  {past.map((booking) => (
                    <MinimalBookingCard
                      key={booking.id}
                      {...booking}
                      actionLabel="Visit more Hotels"
                      isPast={true}
                      onViewHotel={handleViewHotel}
                    />
                  ))}
                </Stack>
              )}
            </TabPanel>

            <TabPanel value={tab} index={1}>
              {isHotelLoading ? (
                <Stack spacing={2}>
                  {[1, 2, 3].map((i) => (
                    <BookingCardSkeleton key={i} />
                  ))}
                </Stack>
              ) : upcoming.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#6b7280",
                      fontWeight: 600,
                      mb: 1,
                      fontSize: "1.125rem",
                    }}
                  >
                    No upcoming bookings
                  </Typography>
                  <Typography
                    sx={{
                      color: "#9ca3af",
                      fontSize: "0.875rem",
                      mb: 3,
                    }}
                  >
                    Book your next adventure today!
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleViewHotel}
                    sx={{
                      backgroundColor: "#059669",
                      borderRadius: 1.5,
                      textTransform: "none",
                      fontWeight: 600,
                      px: 3,
                      py: 1,
                      "&:hover": { backgroundColor: "#047857" },
                    }}
                  >
                    Explore Hotels
                  </Button>
                </Box>
              ) : (
                <Stack spacing={2}>
                  {upcoming.map((booking) => (
                    <MinimalBookingCard
                      key={booking.id}
                      {...booking}
                      actionLabel="Visit More Hotels"
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

      {/* Cancel Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            border: "1px solid",
            borderColor: "grey.200",
          },
        }}
      >
        <DialogTitle
          sx={{
            pr: 5,
            fontWeight: 600,
            fontSize: "1.25rem",
            color: "#111827",
          }}
        >
          Cancel Booking
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#6b7280",
              "&:hover": { color: "#374151" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: "1rem",
              color: "#374151",
              lineHeight: 1.6,
            }}
          >
            Are you sure you want to cancel "{target?.title}" (
            {target?.dateRange})? This action cannot be undone and may be
            subject to cancellation fees.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderColor: "#d1d5db",
              color: "#6b7280",
              borderRadius: 1.5,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: alpha("#6b7280", 0.05),
                borderColor: "#9ca3af",
              },
            }}
          >
            Keep Booking
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            sx={{
              backgroundColor: "#dc2626",
              borderRadius: 1.5,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#b91c1c" },
            }}
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
