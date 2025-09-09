"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@src/redux/store";
import {
  selectIsLogin,
  selectUser,
  setIsLogin,
} from "@src/redux/reducers/authSlice";
import Image from "next/image";
import logo from "../../../public/logodata123.png";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const isLogin = useSelector(selectIsLogin);

  const navLinks = [
    { name: "Hotels", path: "/home" },
    { name: "Experiences", path: "/experiences" },
    { name: "Hourly", path: "/hourly" },
  ];

  const isActive = (path: string) => pathname === path;
  const user = useAppSelector(selectUser);
  const submitLogout = () => {
    localStorage.clear();
    dispatch(setIsLogin(false));
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Revour Logo"
              width={130}
              height={130}
              className="rounded-lg"
            />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`pb-2 transition-colors ${
                  isActive(link.path)
                    ? "text-green-600 font-semibold border-b-2 border-green-600"
                    : "text-gray-800 hover:text-green-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Icon */}
            {!isLogin ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href={"/login"}
                onClick={submitLogout}
                className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
              >
                Logout
              </Link>
            )}

            {isLogin && (
              <Link
                href="/profile"
                className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors"
              >
                <AccountCircleIcon fontSize="large" />
              </Link>
            )}

            <button
              className="text-gray-600 hover:text-green-600 transition-colors"
              onClick={() => router.push("/search")}
            >
              <SearchIcon fontSize="large" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <Link
              href={"/search"}
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              <SearchIcon />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              <MenuIcon fontSize="large" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-bold text-green-600">Menu</span>
          <button onClick={() => setMobileMenuOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`transition-colors ${
                isActive(link.path)
                  ? "text-green-600 font-semibold"
                  : "text-gray-800 hover:text-green-600"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {!isLogin ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                submitLogout();
                setMobileMenuOpen(false);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Logout
            </button>
          )}

          {/* {isLogin && (
            <Link
              href="/profile"
              className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <AccountCircleIcon />
              <span>Profile</span>
            </Link>
          )} */}
        </nav>
      </div>
    </header>
  );
}
