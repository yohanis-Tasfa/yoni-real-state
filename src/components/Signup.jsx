import React, { useState } from "react";
import { toast } from "react-toastify";

// Firebase imports
import { auth } from "../utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Signup = ({ toggleSignup, onAuthSuccess, onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup) {
      // VALIDATION (for signup)
      if (!formData.agree) {
        toast.error("Please agree to the Terms and Conditions.");
        return;
      }
      if (!formData.name || !formData.email || !formData.password) {
        toast.error("Please fill in all fields.");
        return;
      }

      // FIREBASE SIGNUP logic
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Reset form
        setFormData({ name: "", email: "", password: "", agree: false });

        // Switch to login mode
        setIsSignup(false);

        // Trigger success callback
        onAuthSuccess(userCredential.user);
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      // VALIDATION (for login)
      if (!formData.email || !formData.password) {
        toast.error("Please fill in all fields.");
        return;
      }

      // FIREBASE LOGIN logic
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        setFormData({ name: "", email: "", password: "", agree: false });

        onLoginSuccess(userCredential.user);
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="relative flex flex-col rounded-xl bg-white p-6 text-gray-700 shadow-lg">
          <button
            onClick={toggleSignup}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            {/* close button */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h4 className="block text-2xl font-semibold">
            {isSignup ? "Sign Up" : "Log In"}
          </h4>

          <p className="mt-1 text-base text-gray-700">
            {isSignup
              ? "Enter your details to register."
              : "Enter your credentials to log in."}
          </p>

          <div className="mt-8 mb-2 w-80 max-w-screen sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              {isSignup && (
                <div className="relative h-11 w-full min-w-[200px]">
                  <label>Name</label>
                  <input
                    className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3"
                    placeholder=""
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="relative h-11 w-full min-w-[200px]">
                <label>Email</label>
                <input
                  className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3"
                  placeholder=""
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className=" relative h-11 w-full min-w-[200px]">
                <label>Password</label>
                <input
                  type="password"
                  className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3"
                  placeholder=""
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {isSignup && (
              <div className="inline-flex items-center mt-3 ">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleInputChange}
                />
                <span className="ml-2 text-gray-700">
                  I agree to the Terms and Conditions
                </span>
              </div>
            )}

            <button
              className="mt-6 block w-full rounded-lg bg-pink-500 py-3 px-6 text-white cursor-pointer"
              type="button"
              onClick={handleSubmit}
            >
              {isSignup ? "Register" : "Log In"}
            </button>

            <p className="mt-4 text-center text-gray-700">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                className="font-semibold text-pink-500 ml-1 cursor-pointer"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
