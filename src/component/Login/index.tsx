"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useUserLogin } from "@src/hooks/apiHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setAuthToken,
  setIsLogin,
  setUser,
} from "@src/redux/reducers/authSlice";
import CustomInput from "../customeFormField";

// MUI Icons
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginComponent = () => {
  const method = useForm({
    defaultValues: {
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
  const [showPassword, setShowPassword] = React.useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");
  const [isResetLoading, setIsResetLoading] = useState(false);

  const {
    isError: isLoginError,
    isLoading: isLoginLoading,
    data: loginData,
    error: loginError,
    mutate: login,
  } = useUserLogin();

  useEffect(() => {
    if (loginData && !isLoginLoading) {
      dispatch(setUser(loginData.data));
      dispatch(setAuthToken(loginData.data.token));
      dispatch(setIsLogin(true));
      toast.success(loginData?.message ?? "Login Successful");
      reset();
      router?.push("/home");
    }
    if (isLoginError) {
      toast.error(loginError?.message || "Login failed");
    }
  }, [
    loginData,
    isLoginLoading,
    loginError,
    isLoginError,
    reset,
    router,
    dispatch,
  ]);

  const onSubmit = (data) => {
    login(data);
  };

  const handleForgotPasswordSubmit = async () => {
    if (!emailForReset) {
      toast.error("Please enter your email address");
      return;
    }

    setIsResetLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/sendmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailForReset }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(
          data.message || "Password reset email sent successfully!"
        );
        setForgotPassword(false);
        setEmailForReset("");
      } else {
        throw new Error(data.message || "Failed to send reset email");
      }
    } catch (error) {
      toast.error(error.message || "Error sending reset email");
    } finally {
      setIsResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-12 p-6 sm:p-8">
        {/* Left Side - Welcome Section */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            {forgotPassword ? "Reset Password" : "Welcome Back"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-md">
            {forgotPassword
              ? "Enter your email address and we'll send you a link to reset your password."
              : "Sign in to access your account and explore exclusive features with ease."}
          </p>
          <p className="mt-8 text-sm sm:text-base text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-green-600 font-medium hover:text-green-800 transition-colors duration-200 underline"
            >
              Create one now
            </Link>
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 sm:p-10 max-w-lg w-full mx-auto transition-all duration-300 hover:shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
              {forgotPassword ? "Reset Password" : "Sign In"}
            </h1>
            <p className="text-gray-600 text-sm">
              {forgotPassword
                ? "Enter your email to receive reset instructions"
                : "Enter your credentials to access your account"}
            </p>
          </div>

          {/* Error Alert */}
          {isLoginError && !forgotPassword && (
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
                    {loginError?.message || "Invalid email or password"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {forgotPassword ? (
            // Forgot Password Form
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="you@example.com"
                  value={emailForReset}
                  onChange={(e) => setEmailForReset(e.target.value)}
                />
              </div>

              <div className="pt-6 space-y-4">
                <button
                  type="button"
                  onClick={handleForgotPasswordSubmit}
                  disabled={isResetLoading}
                  className="w-full py-4 px-4 text-base font-semibold text-white bg-green-600 rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isResetLoading ? (
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
                      Sending...
                    </>
                  ) : (
                    "Send Reset Email"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForgotPassword(false);
                    setEmailForReset("");
                  }}
                  className="w-full py-3 px-4 text-base font-medium text-green-600 bg-transparent border border-green-600 rounded-xl hover:bg-green-50 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-200"
                >
                  Back to Login
                </button>
              </div>
            </div>
          ) : (
            // Regular Login Form
            <FormProvider {...method}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    <p className="text-red-500 text-xs mt-2 flex items-center">
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
                    {/* Left Icon */}

                    {/* Input */}
                    <CustomInput
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      }}
                    />

                    {/* Show/Hide Button */}
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    ></button>
                  </div>

                  {errors.password && (
                    <p className="text-red-500 text-xs mt-2 flex items-center">
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
                    disabled={isLoginLoading}
                    className="w-full py-4 px-4 text-base font-semibold text-white bg-green-600 rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoginLoading ? (
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
                        Logging in...
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
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign In to Account
                      </>
                    )}
                  </button>
                </div>

                {/* Forgot Password Link */}
                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => setForgotPassword(true)}
                    className="text-sm text-green-600 hover:text-green-800 hover:underline transition-colors duration-200 font-medium"
                  >
                    Forgot your password?
                  </button>
                </div>
              </form>
            </FormProvider>
          )}

          {/* Additional Options */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                Need help?{" "}
                <Link
                  href="/privacypolicy"
                  className="text-green-600 hover:text-green-800 font-medium underline"
                >
                  Contact Support
                </Link>
              </p>

              {/* ✅ ADDED: Privacy Policy Link */}
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{" "}
                <Link
                  href="/privacypolicy"
                  className="text-green-600 hover:text-green-800 font-medium underline"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacypolicy"
                  className="text-green-600 hover:text-green-800 font-medium underline"
                >
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
