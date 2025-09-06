"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ThankYouPage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 20 : 100));
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push("/home");
    }
  }, [countdown, router]);

  const handleGoHome = () => {
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-emerald-500 to-green-700 relative overflow-hidden text-white">
      {/* Animated Background Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-300 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200 opacity-20 rounded-full blur-3xl animate-ping"></div>

      {/* Success Icon */}
      <div className="relative w-28 h-28 bg-green-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce mb-6">
        <svg
          className="w-14 h-14 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Thank You Text */}
      <h1 className="text-5xl font-extrabold mb-4 text-center">
        Thank You! 🎉
      </h1>
      <p className="text-lg mb-8 text-center">
        Your booking has been confirmed successfully.
      </p>

      {/* Countdown Circle with Progress */}
      <div className="relative w-32 h-32 mb-8">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-green-300"
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="text-white"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            strokeDasharray="282.6"
            strokeDashoffset={282.6 - (282.6 * progress) / 100}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
          {countdown}
        </div>
      </div>

      {/* Redirect Info */}
      <p className="mb-6 text-center">
        Redirecting to the home page in {countdown} seconds...
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
        >
          🏠 Go to Home
        </button>
        <button
          onClick={() => router.push("/profile")}
          className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 rounded-xl font-semibold shadow-lg transition transform hover:scale-105"
        >
          📋 View Bookings
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
