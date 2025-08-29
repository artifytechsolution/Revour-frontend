"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // For page navigation
import { useVerifyEmail } from "@src/hooks/apiHooks";
import toast from "react-hot-toast";

const VerifyEmail: React.FC = () => {
  const router = useRouter(); // Initialize the router hook
  const searchParams = useSearchParams(); // Corrected spelling of 'searchParams'
  const token = searchParams.get("token"); // Extract token from URL

  const {
    data: verifyData,
    mutate: verifyMutation,
    error: verifyError,
    isError: verifyIsError,
    isLoading: verifyLoading,
  } = useVerifyEmail();

  const [isVerifying, setIsVerifying] = useState(false); // To manage the verifying state

  // Handle success and error messages after the mutation response
  useEffect(() => {
    if (verifyData && !verifyLoading) {
      toast.success("Email verified successfully!");
      router.push("/login"); // Redirect to the login page upon success
    }

    if (verifyIsError) {
      toast.error(verifyError ?? "Something went wrong, please try again");
    }
  }, [verifyData, verifyLoading, verifyIsError, verifyError, router]);

  // Handle verify email button click
  const handleVerify = () => {
    if (!token) {
      toast.error("Token is missing or invalid.");
      return;
    }

    setIsVerifying(true); // Set verifying state to true during the mutation
    verifyMutation({
      token: token, // This is guaranteed to be a string now.
      data: { isVerified: true },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Email Address Verification
        </h2>

        {/* Display loading spinner if verifying */}
        {isVerifying || verifyLoading ? (
          <div className="flex justify-center items-center mb-4">
            <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin" />
          </div>
        ) : null}

        <button
          onClick={handleVerify}
          disabled={isVerifying || verifyLoading} // Disable button while verifying or loading
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isVerifying || verifyLoading ? "Verifying..." : "Verify Email"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
