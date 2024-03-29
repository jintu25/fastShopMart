"use client";
import { AuthContext } from "@/app/context/AuthProvider";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

export default function Registration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, googleSignIn, facebookSignIn } = useContext(AuthContext);
  const [logInError, setLogInError] = useState("");
  const provider = new GoogleAuthProvider();
  const providerF = new FacebookAuthProvider();

  const handleRegistration = (data) => {
    console.log(data);
    setLogInError("");

    // Password validation
    if (data.password !== data.cPassword) {
      setLogInError("Passwords do not match");
      return;
    }

    createUser(data.email, data.password, data.name)
      .then((result) => {
        const user = result.user;
        console.log(user);
        // Reset the form after successful registration
        reset();
      })
      .catch((error) => {
        console.error("Error", error);
        setLogInError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn(provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };
  //facebook signIn
  const handleFacebookSignIn = () => {
    googleSignIn(providerF)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <main className="flex items-center justify-between p-10">
      <div className="bg-white mx-auto p-6 lg:p-16 xl:p-12">
        <div className="block md:flex justify-between items-center">
          <h1 className="text-xl md:text-xl leading-tight">
            Create your Account
          </h1>
          <p className="text-xs">
            Already member?{" "}
            <a className="text-blue-400 cursor-pointer" href="/login">
              Login
            </a>{" "}
            here
          </p>
        </div>
        <form className="mt-6" onSubmit={handleSubmit(handleRegistration)}>
          <div className="block md:flex gap-5">
            <div>
              <label className="block text-gray-700 text-sm">Name*</label>
              <input
                type="text"
                placeholder="Please enter your name"
                className="w-full px-4 py-2 bg-gray-200 mt-2 border text-sm focus:bg-white focus:outline-none"
                {...register("name", { required: "Name is required" })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="text-red-600 text-xs">{errors.name.message}</p>
              )}
            </div>
            <div className="mt-4 md:mt-0">
              <label className="block text-gray-700 text-sm">Email*</label>
              <input
                type="email"
                placeholder="Please enter your email"
                className="w-full px-4 py-2 bg-gray-200 mt-2 border text-sm focus:bg-white focus:outline-none"
                {...register("email", {
                  required: "Email Address is required",
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="text-red-600 text-xs">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="block md:flex gap-5">
            <div className="mt-4">
              <label className="block text-gray-700 text-sm">Password*</label>
              <input
                type="password"
                placeholder="Please enter your password"
                minLength={6}
                className="w-full px-4 py-2 bg-gray-200 mt-2 border text-sm focus:bg-white focus:outline-none"
                {...register("password", { required: "Password is required" })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p className="text-red-600 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm">
                Confirm Password*
              </label>
              <input
                type="password"
                placeholder="Please Confirm your password"
                minLength={6}
                className="w-full px-4 py-2 bg-gray-200 mt-2 border text-sm focus:bg-white focus:outline-none"
                {...register("cPassword", { required: "Password not matched" })}
                aria-invalid={errors.cPassword ? "true" : "false"}
              />
              {errors.cPassword && (
                <p className="text-red-600 text-xs">
                  {errors.cPassword.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full block bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 mt-5 mb-5 md:mb-0 text-sm"
          >
            SIGN UP
          </button>
          {logInError && (
            <p className="text-red-600 text-xs pt-3">{logInError}</p>
          )}
        </form>
        <p className="text-sm md:my-4">Or, sign up with</p>
        <div className="block md:flex gap-5">
          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold px-4 py-2 border border-gray-300"
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 320 512"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
              <span className="ml-4" onClick={handleFacebookSignIn}>
                Facebook
              </span>
            </div>
          </button>
          <button
            type="button"
            className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold px-4 py-2 border border-gray-300"
          >
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="w-6 h-6"
                viewBox="0 0 48 48"
              >
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="b">
                  <use xlinkHref="#a" overflow="visible" />
                </clipPath>
                <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                <path
                  clipPath="url(#b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                />
              </svg>
              <span className="ml-4" onClick={handleGoogleSignIn}>
                Google
              </span>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}
