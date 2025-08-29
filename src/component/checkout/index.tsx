"use client";
import { selectUser } from "@src/redux/reducers/authSlice";
import { useAppSelector } from "@src/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CheckoutComponent = () => {
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
  }, []);

  return (
    <div
      className="min-h-screen  font-sans flex flex-col max-w-7xl mx-auto"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 animate-fade-in">
        {/* Hotel Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-2xl bg-white p-6 shadow-card">
          <div className="lg:col-span-2 space-y-3">
            <p className="text-textSecondary text-sm font-medium">
              Entire Cabin
            </p>
            <h2 className="text-textPrimary text-2xl font-bold">
              Cozy Cabin with Mountain Views
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-accent font-medium">★★★★★</span>
              <p className="text-textSecondary text-sm">4.92 (128 reviews)</p>
            </div>
            <p className="text-textSecondary">
              Nestled in the heart of the mountains, this cozy cabin offers
              stunning views and modern amenities for a perfect getaway.
            </p>
          </div>
          <div
            className="w-full h-64 lg:h-full bg-center bg-cover rounded-xl"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80")',
            }}
          ></div>
        </div>

        {/* Trip Details */}
        <section className="space-y-4">
          <h2 className="text-textPrimary text-2xl font-bold">Your Trip</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <div>
                <p className="text-textPrimary font-medium">Dates</p>
                <p className="text-textSecondary text-sm">
                  November 15 - 20, 2025
                </p>
              </div>
              <button className="text-primary font-medium hover:text-accent transition-colors">
                Edit
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
              <div>
                <p className="text-textPrimary font-medium">Guests</p>
                <p className="text-textSecondary text-sm">2 Guests</p>
              </div>
              <button className="text-primary font-medium hover:text-accent transition-colors">
                Edit
              </button>
            </div>
          </div>
        </section>

        {/* Total Cost */}
        <section className="space-y-4">
          <h2 className="text-textPrimary text-2xl font-bold">Your Total</h2>
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-textPrimary">5 Nights</p>
              <p className="text-textPrimary font-medium">$1,250</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-textPrimary">Taxes</p>
              <p className="text-textPrimary font-medium">$125</p>
            </div>
            <div className="flex items-center justify-between border-t pt-3">
              <p className="text-textPrimary font-bold">Total</p>
              <p className="text-textPrimary font-bold">$1,375</p>
            </div>
          </div>
        </section>

        {/* Payment Method */}
        <section className="space-y-4">
          <h2 className="text-textPrimary text-2xl font-bold">Pay With</h2>
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <div
                className="h-8 w-12 bg-contain bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg")',
                }}
              ></div>
              <p className="text-textPrimary">Mastercard ending in 7890</p>
            </div>
            <button className="text-primary font-medium hover:text-accent transition-colors">
              Edit
            </button>
          </div>
        </section>

        {/* Cancellation Policy */}
        <section className="space-y-4">
          <h2 className="text-textPrimary text-2xl font-bold">
            Cancellation Policy
          </h2>
          <p className="text-textSecondary bg-white p-4 rounded-lg shadow-sm">
            Cancel before November 8, 2025, for a partial refund. After this
            date, the reservation is non-refundable.
          </p>
        </section>
      </main>
    </div>
  );
};

export default CheckoutComponent;
