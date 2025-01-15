import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/main_logo.jpg";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import imageUpload from "../../Api/Utils";
import Swal from "sweetalert2";
import { useState } from "react";

const Registration = () => {
  const { user, setUser, userSignUp, updateUserProfile, userGoogleLogin } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const from = location?.state || "/";
  const validatePassword = (pass) => {
    if (pass.length < 8) {
      setValidationMessage("Password must be at least 8 characters long.");
    } else if (!/[A-Z]/.test(pass)) {
      setValidationMessage(
        "Password must contain at least one uppercase letter."
      );
    } else if (!/[a-z]/.test(pass)) {
      setValidationMessage(
        "Password must contain at least one lowercase letter."
      );
    } else if (!/[0-9]/.test(pass)) {
      setValidationMessage("Password must contain at least one number.");
    } else if (!/[!@#$%^&*]/.test(pass)) {
      setValidationMessage(
        "Password must contain at least one special character (!@#$%^&*)."
      );
    } else {
      setValidationMessage("");
      setPassword(pass);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const imageFile = form.imageFile.files[0];
    const validPassword = password;

    if (!validPassword || validationMessage) {
      return;
    }

    // image file upload to imageBB:
    const photoURL = await imageUpload(imageFile);

    try {
      const result = await userSignUp(email, validPassword);
      // Update the user's profile:
      await updateUserProfile(name, photoURL);

      // Save user data to the database:
      await axios.post(`${import.meta.env.VITE_SERVER_API}/users/${email}`, {
        name: name,
        image: photoURL,
        email: email,
      });

      setUser(result.user);
      // Success message and redirection:
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${name} successfully created your account!`,
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      const result = await userGoogleLogin();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `User successfully logged in!!!`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <div className="flex flex-col lg:flex-row w-full max-w-sm lg:max-w-4xl mx-auto overflow-hidden border-2 border-[rgba(61,64,91,0.6)] bg-white rounded-lg shadow-lg">
        {/* Image Section for Larger Screens */}
        <div className="hidden lg:flex w-1/2 bg-terracotta justify-center items-center">
          <img
            src="/register-illustration.png"
            alt="Register Illustration"
            className="w-3/4 h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          {/* Logo */}
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-10 sm:h-8" src={logo} alt="TourHub Logo" />
          </div>

          {/* Title */}
          <p className="mt-3 text-xl text-center text-chocolate font-heebo mb-4">
            Create Your Free Account Today!
          </p>

          {/* Google Sign-In */}
          <div
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-5 border rounded-lg py-2 mb-6 cursor-pointer hover:bg-gray-100 transition"
          >
            <svg className="w-6 h-6" viewBox="0 0 40 40">
              {/* Google Icon Paths */}
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
            <span className="font-heebo font-medium">Sign in with Google</span>
          </div>

          {/* Separator */}
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <div className="text-xs text-center text-gray-500 uppercase hover:underline">
              Or Register with Email
            </div>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSignUp}>
            <div className="mt-4">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Username*
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-terracotta focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-terracotta"
                type="text"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="photo"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Image*
              </label>
              <input
                type="file"
                required
                name="imageFile"
                accept="image/*"
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="LoggingEmailAddress"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email Address*
              </label>
              <input
                id="LoggingEmailAddress"
                name="email"
                autoComplete="email"
                required
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-terracotta focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-terracotta"
                type="email"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="loggingPassword"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password*
              </label>
              <input
                id="loggingPassword"
                name="password"
                required
                onChange={(e) => validatePassword(e.target.value)}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-terracotta focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-terracotta"
                type="password"
              />
              <p className="pt-2 text-sm text-red-500 font-heebo">
                {validationMessage}
              </p>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-terracotta rounded-lg hover:bg-chocolate focus:outline-none focus:ring focus:ring-chocolate focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Already Have an Account */}
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <Link
              to="/login"
              className="text-xs text-gray-500 uppercase hover:underline"
            >
              Or sign in
            </Link>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
