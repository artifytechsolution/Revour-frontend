"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Shield,
  CreditCard,
  FileText,
  Building,
  Phone,
  Mail,
  Globe,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState("privacy");
  const [expandedItems, setExpandedItems] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sections = [
    { id: "privacy", label: "Privacy Policy", icon: Shield },
    { id: "cancellation", label: "Cancellation & Refunds", icon: CreditCard },
    { id: "terms", label: "Terms & Conditions", icon: FileText },
    { id: "hotel-policies", label: "Hotel Policies", icon: Building },
    { id: "contact", label: "Contact Us", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-25 to-emerald-50">
      {/* Header */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-green-900 mb-4">
                Navigation
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                        activeSection === section.id
                          ? "bg-green-100 text-green-800 border-2 border-green-300 shadow-sm"
                          : "text-green-700 hover:bg-green-50 hover:text-green-800"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Privacy Policy Section */}
            <section
              id="privacy"
              className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
                <div className="flex items-center space-x-3">
                  <Shield className="text-white" size={24} />
                  <h2 className="text-2xl font-bold text-white">
                    Privacy Policy
                  </h2>
                </div>
                <p className="text-green-100 mt-2">
                  Your trust is our priority. We are committed to protecting
                  your personal information.
                </p>
              </div>

              <div className="p-8 space-y-6">
                {/* Information We Collect */}
                <div className="border border-green-200 rounded-xl p-6 bg-green-50/50">
                  <button
                    onClick={() => toggleExpand("info-collect")}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-lg font-semibold text-green-900">
                      1. Information We Collect
                    </h3>
                    {expandedItems["info-collect"] ? (
                      <ChevronUp size={20} className="text-green-600" />
                    ) : (
                      <ChevronDown size={20} className="text-green-600" />
                    )}
                  </button>

                  {expandedItems["info-collect"] && (
                    <div className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-900 mb-2">
                            Personal Details
                          </h4>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Name & Contact Information</li>
                            <li>• Email & Phone Number</li>
                            <li>• Address Details</li>
                          </ul>
                        </div>
                        <div className="bg-green-200/60 p-4 rounded-lg border border-green-300">
                          <h4 className="font-semibold text-green-900 mb-2">
                            Booking Information
                          </h4>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Check-in/Check-out Dates</li>
                            <li>• Hotel & Room Selection</li>
                            <li>• Guest Preferences</li>
                          </ul>
                        </div>
                        <div className="bg-emerald-100 p-4 rounded-lg border border-emerald-200">
                          <h4 className="font-semibold text-emerald-900 mb-2">
                            Payment Details
                          </h4>
                          <ul className="text-sm text-emerald-800 space-y-1">
                            <li>• Card/UPI Information</li>
                            <li>• Wallet Transactions</li>
                            <li>• Secure Processing</li>
                          </ul>
                        </div>
                        <div className="bg-lime-100 p-4 rounded-lg border border-lime-200">
                          <h4 className="font-semibold text-lime-900 mb-2">
                            Usage Data
                          </h4>
                          <ul className="text-sm text-lime-800 space-y-1">
                            <li>• Cookies & Analytics</li>
                            <li>• Device Information</li>
                            <li>• Browsing Behavior</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* How We Use Information */}
                <div className="border border-green-200 rounded-xl p-6 bg-green-50/30">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">
                    2. How We Use Your Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        icon: CheckCircle,
                        text: "Confirm and manage bookings",
                        color: "text-green-600",
                      },
                      {
                        icon: Phone,
                        text: "Provide customer support",
                        color: "text-green-600",
                      },
                      {
                        icon: Shield,
                        text: "Improve website and services",
                        color: "text-green-600",
                      },
                      {
                        icon: Mail,
                        text: "Send confirmations & offers (opt-in)",
                        color: "text-green-600",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-green-100 rounded-lg border border-green-200"
                      >
                        <item.icon className={item.color} size={20} />
                        <span className="text-green-800">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Security */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                    <Shield className="text-green-700 mr-2" size={20} />
                    Data Security Measures
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-green-800">
                        All transactions encrypted with SSL technology
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-green-800">
                        Payments processed via trusted, secure gateways
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-green-800">
                        Limited access to authorized staff only
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cancellation & Refund Policy */}
            <section
              id="cancellation"
              className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6">
                <div className="flex items-center space-x-3">
                  <CreditCard className="text-white" size={24} />
                  <h2 className="text-2xl font-bold text-white">
                    Cancellation & Refund Policy
                  </h2>
                </div>
                <p className="text-green-100 mt-2">
                  Fair and transparent cancellation terms for your peace of
                  mind.
                </p>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center hover:bg-green-100 transition-colors">
                    <Clock className="text-green-600 mx-auto mb-3" size={32} />
                    <h3 className="font-semibold text-green-900 mb-2">
                      Free Cancellation
                    </h3>
                    <p className="text-sm text-green-800">
                      Up to 48 hours before check-in
                    </p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center hover:bg-yellow-100 transition-colors">
                    <AlertCircle
                      className="text-yellow-600 mx-auto mb-3"
                      size={32}
                    />
                    <h3 className="font-semibold text-yellow-900 mb-2">
                      Late Cancellation
                    </h3>
                    <p className="text-sm text-yellow-800">
                      Within 48 hours may attract charges
                    </p>
                  </div>
                  <div className="bg-green-100 border border-green-300 rounded-xl p-6 text-center hover:bg-green-150 transition-colors">
                    <CreditCard
                      className="text-green-700 mx-auto mb-3"
                      size={32}
                    />
                    <h3 className="font-semibold text-green-900 mb-2">
                      Refund Timeline
                    </h3>
                    <p className="text-sm text-green-800">
                      5-7 business days to original method
                    </p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="font-semibold text-red-900 mb-3 flex items-center">
                    <AlertCircle className="mr-2" size={20} />
                    No-Show Policy
                  </h3>
                  <p className="text-red-800">
                    If a guest doesn't check in on the booking date, the booking
                    will be marked as No-Show. Refund eligibility depends on
                    hotel-specific rules.
                  </p>
                </div>
              </div>
            </section>

            {/* Terms & Conditions */}
            <section
              id="terms"
              className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-700 to-green-800 px-8 py-6">
                <div className="flex items-center space-x-3">
                  <FileText className="text-white" size={24} />
                  <h2 className="text-2xl font-bold text-white">
                    Terms & Conditions
                  </h2>
                </div>
                <p className="text-green-100 mt-2">
                  Important terms for booking through Revour Hotels.
                </p>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-green-900">
                      General Terms
                    </h3>
                    <ul className="space-y-2 text-green-800">
                      <li className="flex items-start space-x-2">
                        <CheckCircle
                          className="text-green-600 mt-0.5 flex-shrink-0"
                          size={16}
                        />
                        <span>Bookings subject to availability</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle
                          className="text-green-600 mt-0.5 flex-shrink-0"
                          size={16}
                        />
                        <span>Accurate personal details required</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-green-900">
                      Check-In/Out Times
                    </h3>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">
                        <strong>Check-in:</strong> 12:00 PM
                        <br />
                        <strong>Check-out:</strong> 11:00 AM
                        <br />
                        <em>(May vary per hotel)</em>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="font-semibold text-yellow-900 mb-3">
                    Important Disclaimer
                  </h3>
                  <p className="text-yellow-800">
                    Revour Hotels acts as a facilitator between customers and
                    hotels. The hotel is solely responsible for the stay
                    experience, amenities, and services provided.
                  </p>
                </div>
              </div>
            </section>

            {/* Hotel Policies */}
            <section
              id="hotel-policies"
              className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <div className="flex items-center space-x-3">
                  <Building className="text-white" size={24} />
                  <h2 className="text-2xl font-bold text-white">
                    Hotel Policies
                  </h2>
                </div>
                <p className="text-green-100 mt-2">
                  General guidelines for a smooth hotel stay experience.
                </p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "ID Proof Required",
                      description: "Valid government ID mandatory at check-in",
                      icon: "🆔",
                      color: "bg-green-50 border-green-200",
                    },
                    {
                      title: "Children & Extra Beds",
                      description: "Additional charges may apply",
                      icon: "👶",
                      color: "bg-green-100 border-green-300",
                    },
                    {
                      title: "Pet Policy",
                      description: "Allowed only in selected hotels",
                      icon: "🐕",
                      color: "bg-emerald-50 border-emerald-200",
                    },
                    {
                      title: "Smoking Policy",
                      description: "Permitted in designated areas only",
                      icon: "🚭",
                      color: "bg-red-50 border-red-200",
                    },
                    {
                      title: "Property Damage",
                      description: "Guests responsible for any damages",
                      icon: "⚠️",
                      color: "bg-orange-50 border-orange-200",
                    },
                    {
                      title: "House Rules",
                      description: "May vary by individual property",
                      icon: "📋",
                      color: "bg-green-50 border-green-200",
                    },
                  ].map((policy, index) => (
                    <div
                      key={index}
                      className={`${policy.color} border rounded-xl p-6 text-center hover:shadow-md transition-all duration-200`}
                    >
                      <div className="text-3xl mb-3">{policy.icon}</div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {policy.title}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {policy.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section
              id="contact"
              className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
                <div className="flex items-center space-x-3">
                  <Phone className="text-white" size={24} />
                  <h2 className="text-2xl font-bold text-white">Contact Us</h2>
                </div>
                <p className="text-green-100 mt-2">
                  Need help? We're here to assist you 24/7.
                </p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                    <Mail className="text-green-600 mx-auto mb-3" size={32} />
                    <h3 className="font-semibold text-green-900 mb-2">
                      Email Support
                    </h3>
                    <a
                      href="mailto:support@revourhotels.com"
                      className="text-green-600 hover:text-green-700 hover:underline"
                    >
                      info@revourhotels.com
                    </a>
                  </div>
                  <div className="text-center p-6 bg-green-100 rounded-xl border border-green-300 hover:bg-green-150 transition-colors">
                    <Phone className="text-green-700 mx-auto mb-3" size={32} />
                    <h3 className="font-semibold text-green-900 mb-2">
                      Phone Support
                    </h3>
                    <a
                      href="tel:+91 7990216477"
                      className="text-green-700 hover:text-green-800 hover:underline"
                    >
                      +91 7990216477
                    </a>
                  </div>
                  <div className="text-center p-6 bg-emerald-50 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors">
                    <Globe
                      className="text-emerald-600 mx-auto mb-3"
                      size={32}
                    />
                    <h3 className="font-semibold text-emerald-900 mb-2">
                      Website
                    </h3>
                    <a
                      href="https://revourhotels.com"
                      className="text-emerald-600 hover:text-emerald-700 hover:underline"
                    >
                      revourhotels.com
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
