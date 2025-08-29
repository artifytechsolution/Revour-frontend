"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  HomeIcon,
  MapIcon,
  BellIcon,
  UserIcon,
  SparklesIcon,
  PhoneIcon,
  HeartIcon,
  BookmarkIcon,
  ClockIcon,
} from "lucide-react";

const MobileFooter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("home");

  // Navigation items configuration
  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: HomeIcon,
      href: "/",
      color: "blue",
    },
    {
      id: "experiences",
      label: "Experiences",
      icon: MapIcon,
      href: "/experiences",
      color: "purple",
    },
    {
      id: "services",
      label: "Hourly",
      icon: ClockIcon,
      href: "/hourly",
      color: "green",
    },
    {
      id: "profile",
      label: "Profile",
      icon: UserIcon,
      href: "/profile",
      color: "orange",
    },
  ];

  const handleNavigation = (item) => {
    setActiveTab(item.id);
    router.push(item.href);
  };

  const isActive = (itemHref) => {
    return pathname === itemHref;
  };

  return (
    <>
      {/* Spacer to prevent content from being hidden behind footer */}
      <div className="h-20 lg:hidden"></div>

      {/* Mobile Footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl"></div>

        {/* Content */}
        <div className="relative max-w-[600px] mx-auto">
          <div className="px-2 py-2 flex justify-around items-center">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`
                    flex flex-col items-center justify-center p-2 rounded-xl
                    transition-all duration-300 ease-in-out transform
                    hover:scale-105 active:scale-95
                    min-w-[70px] h-16
                    ${
                      active
                        ? `bg-${item.color}-50 shadow-lg`
                        : "hover:bg-gray-50"
                    }
                  `}
                >
                  {/* Icon container with animation */}
                  <div className="relative mb-1">
                    <Icon
                      className={`
                        h-6 w-6 transition-all duration-300
                        ${
                          active
                            ? `text-${item.color}-600 scale-110`
                            : "text-gray-500 hover:text-gray-700"
                        }
                      `}
                    />

                    {/* Active indicator dot */}
                    {active && (
                      <div
                        className={`
                        absolute -top-1 -right-1 w-2 h-2 
                        bg-${item.color}-600 rounded-full
                        animate-pulse
                      `}
                      ></div>
                    )}

                    {/* Ripple effect on tap */}
                    <div
                      className={`
                      absolute inset-0 rounded-full
                      transition-all duration-300 scale-0
                      ${
                        active
                          ? `bg-${item.color}-200 scale-150 opacity-30`
                          : ""
                      }
                    `}
                    ></div>
                  </div>

                  {/* Label */}
                  <span
                    className={`
                    text-xs font-medium transition-all duration-300
                    ${
                      active
                        ? `text-${item.color}-700 font-semibold`
                        : "text-gray-600"
                    }
                  `}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Safe area padding for devices with home indicators */}
          <div className="h-safe-bottom"></div>
        </div>
      </div>
    </>
  );
};

// Alternative version with more visual emphasis
const MobileFooterEnhanced = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: HomeIcon,
      href: "/",
      gradient: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      id: "experiences",
      label: "Explore",
      icon: SparklesIcon,
      href: "/experiences",
      gradient: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      id: "services",
      label: "Services",
      icon: PhoneIcon,
      href: "/services",
      gradient: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      id: "profile",
      label: "Profile",
      icon: UserIcon,
      href: "/profile",
      gradient: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
  ];

  const isActive = (itemHref) => pathname === itemHref;

  return (
    <>
      {/* Content spacer */}
      <div className="h-24 lg:hidden"></div>

      {/* Enhanced Mobile Footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl"></div>

        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500"></div>

        <div className="relative max-w-[600px] mx-auto px-4 py-3">
          <div className="flex justify-around items-center">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.href)}
                  className={`
                    relative flex flex-col items-center justify-center
                    p-3 rounded-2xl min-w-[75px] h-16
                    transition-all duration-300 ease-out transform
                    hover:scale-105 active:scale-95
                    ${
                      active
                        ? `${item.bgColor} ${
                            item.borderColor
                          } border-2 shadow-lg shadow-${
                            item.textColor.split("-")[1]
                          }-200/50`
                        : "hover:bg-gray-50 border-2 border-transparent"
                    }
                  `}
                >
                  {/* Background glow effect for active state */}
                  {active && (
                    <div
                      className={`
                      absolute inset-0 rounded-2xl opacity-20
                      bg-gradient-to-br ${item.gradient}
                      animate-pulse
                    `}
                    ></div>
                  )}

                  {/* Icon */}
                  <div className="relative z-10 mb-1">
                    <Icon
                      className={`
                        h-6 w-6 transition-all duration-300
                        ${
                          active
                            ? `${item.textColor} drop-shadow-sm`
                            : "text-gray-500"
                        }
                      `}
                    />

                    {/* Success indicator */}
                    {active && (
                      <div
                        className={`
                        absolute -top-1 -right-1 w-2 h-2 rounded-full
                        bg-gradient-to-br ${item.gradient}
                        animate-bounce
                      `}
                      ></div>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`
                    relative z-10 text-xs font-medium transition-all duration-300
                    ${
                      active
                        ? `${item.textColor} font-semibold`
                        : "text-gray-600"
                    }
                  `}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator line */}
                  {active && (
                    <div
                      className={`
                      absolute bottom-0 left-1/2 transform -translate-x-1/2
                      w-8 h-1 rounded-full
                      bg-gradient-to-r ${item.gradient}
                      animate-pulse
                    `}
                    ></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* iPhone safe area bottom padding */}
          <div className="pb-safe-bottom"></div>
        </div>
      </div>
    </>
  );
};

// Simple clean version
const MobileFooterSimple = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { id: "home", label: "Home", icon: HomeIcon, href: "/" },
    { id: "explore", label: "Explore", icon: MapIcon, href: "/experiences" },
    {
      id: "bookings",
      label: "Bookings",
      icon: BookmarkIcon,
      href: "/bookings",
    },
    { id: "profile", label: "Profile", icon: UserIcon, href: "/profile" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Spacer */}
      <div className="h-20 lg:hidden"></div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50 shadow-lg">
        <div className="max-w-[600px] mx-auto px-4 py-2 pb-safe">
          <nav className="flex justify-around">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.href)}
                  className={`
                    flex flex-col items-center justify-center py-2 px-3
                    min-w-[70px] rounded-lg transition-all duration-200
                    ${
                      active
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon
                    className={`h-5 w-5 mb-1 ${
                      active ? "scale-110" : ""
                    } transition-transform`}
                  />
                  <span
                    className={`text-xs font-medium ${
                      active ? "font-semibold" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                  {active && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full mt-1"></div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
export { MobileFooterEnhanced, MobileFooterSimple };
