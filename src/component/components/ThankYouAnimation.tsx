"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ThankYouAnimation = () => {
  const [counter, setCounter] = useState(5);
  const [showContent, setShowContent] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const router = useRouter();

  const funnyMessages = [
    "🎉 BOOM! Your booking is locked and loaded! 🚀",
    "🕺 Our team is doing victory laps! 💃",
    "🎊 You just made our day 100% better! ✨",
    "🏠 Taking you back home in style! 🎈",
  ];

  useEffect(() => {
    // Show content with animation
    setTimeout(() => setShowContent(true), 100);

    // Cycle through funny messages
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % funnyMessages.length);
    }, 1500);

    // Countdown timer
    const countdownTimer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(messageTimer);
      clearInterval(countdownTimer);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center z-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Confetti */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {
              ["🎉", "🎊", "✨", "🎈", "🚀", "💫"][
                Math.floor(Math.random() * 6)
              ]
            }
          </div>
        ))}
      </div>

      {/* Main Content Card */}
      <div
        className={`relative bg-white/95 backdrop-blur-lg rounded-3xl p-8 mx-4 max-w-lg w-full shadow-2xl border border-white/20 transition-all duration-1000 ${
          showContent
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-75 opacity-0 translate-y-8"
        }`}
      >
        {/* Dancing Emojis Header */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-pulse">
            <span
              className="inline-block animate-bounce"
              style={{ animationDelay: "0s" }}
            >
              🎉
            </span>
            <span
              className="inline-block animate-bounce"
              style={{ animationDelay: "0.1s" }}
            >
              🙌
            </span>
            <span
              className="inline-block animate-bounce"
              style={{ animationDelay: "0.2s" }}
            >
              🎊
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 animate-pulse">
            THANK YOU!
          </h1>

          <div className="text-2xl mb-4">
            <span className="inline-block animate-spin text-yellow-500">
              ⭐
            </span>
            <span className="mx-2 font-bold text-gray-700">
              Booking Confirmed
            </span>
            <span className="inline-block animate-spin text-yellow-500">
              ⭐
            </span>
          </div>
        </div>

        {/* Animated Message Section */}
        <div className="text-center mb-6 h-16 flex items-center justify-center">
          <p
            key={messageIndex}
            className="text-lg font-semibold text-gray-700 animate-fadeInScale"
          >
            {funnyMessages[messageIndex]}
          </p>
        </div>

        {/* Celebration Emojis */}
        <div className="flex justify-center space-x-4 mb-6">
          {["🥳", "🎪", "🌟", "💝"].map((emoji, index) => (
            <span
              key={index}
              className="text-3xl animate-bounce"
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: "1s",
              }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Countdown Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-3 border-2 border-purple-200">
            <span className="text-purple-600 font-bold mr-2">🏠</span>
            <span className="text-purple-700 font-semibold">
              Redirecting in {counter} second{counter !== 1 ? "s" : ""}...
            </span>
            <div className="ml-2 flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            🏠 Go Home Now
          </button>

          <button
            onClick={() => router.push("/bookings")}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            📋 View Bookings
          </button>
        </div>

        {/* Fun Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>🎭 You just made our day! Thanks for choosing us! 🎭</p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouAnimation;
