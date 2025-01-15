import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/main_logo.jpg";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
const Login = () => {
  const { setUser, userLogin, userGoogleLogin } = useAuth();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

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

  // Email Password Signin
  const handleLogin = async (e) => {
    setLoginError("");
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      //User Login
      await userLogin(email, password);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `User successfully logged in!!!`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setLoginError(err.code);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-sand">
      <div className="w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img className="h-10" src={logo} alt="TourHub Logo" />
        </div>
        <h2 className="text-xl font-nunito text-chocolate text-center mb-4">
          Welcome Back!
        </h2>

        {/* Google Login */}
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

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email Address*
            </label>
            <input
              id="email"
              name="email"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-terracotta focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-terracotta"
              type="email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password*
            </label>
            <input
              id="password"
              name="password"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-terracotta focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-terracotta"
              type="password"
              required
            />
            <label className="label">
              <Link
                to="/reset-password"
                className="label-text-alt link link-hover text-[#4A90E2]"
              >
                Forgot password?
              </Link>
            </label>
          </div>
          {loginError && <p className="text-red-500 mb-3">{loginError}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 text-white font-medium tracking-wide capitalize bg-terracotta rounded-lg hover:bg-chocolate transition focus:outline-none focus:ring focus:ring-chocolate"
          >
            Sign In
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-sm text-center text-gray-600 font-heebo">
          Don’t have an account?{" "}
          <Link to="/registration" className="text-terracotta hover:underline">
            Sign up here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
