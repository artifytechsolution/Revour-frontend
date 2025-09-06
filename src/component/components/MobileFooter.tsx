"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  HomeIcon,
  MapIcon,
  UserIcon,
  SparklesIcon,
  PhoneIcon,
  BookmarkIcon,
  ClockIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { selectIsLogin } from "@src/redux/reducers/authSlice";

// Safe Tailwind color mappings
const colorMap = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    dot: "bg-blue-600",
    ripple: "bg-blue-200",
    textActive: "text-blue-700",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    dot: "bg-purple-600",
    ripple: "bg-purple-200",
    textActive: "text-purple-700",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    dot: "bg-green-600",
    ripple: "bg-green-200",
    textActive: "text-green-700",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    dot: "bg-orange-600",
    ripple: "bg-orange-200",
    textActive: "text-orange-700",
  },
};

/* -------------------------------
   Main Mobile Footer
-------------------------------- */
const MobileFooter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("home");
  const isLogin = useSelector(selectIsLogin);

  const navigationItems = [
    { id: "home", label: "Home", icon: HomeIcon, href: "/home", color: "blue" },
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
    isLogin && {
      id: "profile",
      label: "Profile",
      icon: UserIcon,
      href: "/profile",
      color: "orange",
    },
  ].filter(Boolean); // ✅ prevent false item

  const handleNavigation = (item) => {
    setActiveTab(item.id);
    router.push(item.href);
  };

  const isActive = (itemHref) => pathname === itemHref;

  return (
    <>
      <div className="h-20 lg:hidden"></div>

      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50">
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl"></div>

        <div className="relative max-w-[600px] mx-auto">
          <div className="px-2 py-2 flex justify-around items-center">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const color = colorMap[item.color];

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 min-w-[70px] h-16 ${
                    active ? `${color.bg} shadow-lg` : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative mb-1">
                    <Icon
                      className={`h-6 w-6 transition-all duration-300 ${
                        active ? `${color.text} scale-110` : "text-gray-500"
                      }`}
                    />

                    {active && (
                      <div
                        className={`absolute -top-1 -right-1 w-2 h-2 ${color.dot} rounded-full animate-pulse`}
                      />
                    )}

                    {active && (
                      <div
                        className={`absolute inset-0 rounded-full ${color.ripple} scale-150 opacity-30 transition-all duration-300`}
                      />
                    )}
                  </div>

                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      active
                        ? `${color.textActive} font-semibold`
                        : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="h-safe-bottom"></div>
        </div>
      </div>
    </>
  );
};

/* -------------------------------
   Enhanced Version
-------------------------------- */
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

  const isActive = (href) => pathname === href;

  return (
    <>
      <div className="h-24 lg:hidden"></div>

      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50">
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl"></div>
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
                  className={`relative flex flex-col items-center justify-center p-3 rounded-2xl min-w-[75px] h-16 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 ${
                    active
                      ? `${item.bgColor} ${item.borderColor} border-2 shadow-lg`
                      : "hover:bg-gray-50 border-2 border-transparent"
                  }`}
                >
                  {active && (
                    <div
                      className={`absolute inset-0 rounded-2xl opacity-20 bg-gradient-to-br ${item.gradient} animate-pulse`}
                    />
                  )}

                  <div className="relative z-10 mb-1">
                    <Icon
                      className={`h-6 w-6 transition-all duration-300 ${
                        active ? `${item.textColor}` : "text-gray-500"
                      }`}
                    />
                    {active && (
                      <div
                        className={`absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-br ${item.gradient} animate-bounce`}
                      />
                    )}
                  </div>

                  <span
                    className={`relative z-10 text-xs font-medium transition-all duration-300 ${
                      active
                        ? `${item.textColor} font-semibold`
                        : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </span>

                  {active && (
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r ${item.gradient} animate-pulse`}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="pb-safe-bottom"></div>
        </div>
      </div>
    </>
  );
};

/* -------------------------------
   Simple Clean Version
-------------------------------- */
const MobileFooterSimple = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { id: "home", label: "Home", icon: HomeIcon, href: "/home" },
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
      <div className="h-20 lg:hidden"></div>

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
                  className={`flex flex-col items-center justify-center py-2 px-3 min-w-[70px] rounded-lg transition-all duration-200 ${
                    active
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
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
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full mt-1" />
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
