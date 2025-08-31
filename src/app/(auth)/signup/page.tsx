"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAuthToken, setUser } from "@src/redux/reducers/authSlice";
import CustomInput from "../../../component/customeFormField/index";

// API hook for signup
import { useUserSignup } from "@src/hooks/apiHooks";

// MUI Icons
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignupComponent = () => {
  const method = useForm<SignupFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = method;
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    isError: isSignupError,
    isLoading: isSignupLoading,
    data: signupData,
    error: signupError,
    mutate: signup,
  } = useUserSignup();

  useEffect(() => {
    if (signupData && !isSignupLoading) {
      toast.success(signupData?.message ?? "Signup Successful");
      reset();
      router?.push("/login");
    }
    if (isSignupError) {
      toast.error(signupError?.message || "Signup failed");
    }
  }, [
    signupData,
    isSignupLoading,
    signupError,
    isSignupError,
    reset,
    router,
    dispatch,
  ]);

  const onSubmit = (data: SignupFormData) => {
    signup({
      ...data,
      role: "CUSTOMER",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12 p-6 sm:p-8">
        {/* Left Side - Welcome Section */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Create Your Account
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-md">
            Join us today and unlock access to exclusive features and
            personalized experiences.
          </p>
          <p className="mt-8 text-sm sm:text-base text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-600 font-medium hover:text-green-800 transition-colors duration-200 underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 sm:p-10 max-w-lg w-full mx-auto transition-all duration-300 hover:shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              Sign Up
            </h1>
            <p className="text-gray-600 text-sm">
              Create your account to get started
            </p>
          </div>

          {/* Error Alert */}
          {isSignupError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800 font-medium">
                    {signupError?.message || "Signup failed. Please try again."}
                  </p>
                </div>
              </div>
            </div>
          )}

          <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <CustomInput
                      name="firstName"
                      type="text"
                      placeholder="John"
                      rules={{
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "First name must be at least 2 characters",
                        },
                      }}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <CustomInput
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      rules={{
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters",
                        },
                      }}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <CustomInput
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                    }}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <CustomInput
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message:
                          "Password must contain uppercase, lowercase and number",
                      },
                    }}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSignupLoading}
                  className="w-full py-4 px-4 text-base font-semibold text-white bg-green-600 rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSignupLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Create Account
                    </>
                  )}
                </button>
              </div>

              {/* Terms and Conditions */}
              <div className="text-center pt-4">
                <p className="text-xs text-gray-600">
                  By signing up, you agree to our{" "}
                  <Link
                    href="//privacypolicy"
                    className="text-green-600 hover:text-green-800 underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="//privacypolicy"
                    className="text-green-600 hover:text-green-800 underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </form>
          </FormProvider>

          {/* Additional Options */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Need help?{" "}
                <Link
                  href="//privacypolicy"
                  className="text-green-600 hover:text-green-800 font-medium underline"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
