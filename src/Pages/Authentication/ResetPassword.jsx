import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import logo from "../../assets/main_logo.jpg";
export const ResetPassword = () => {
  const { passwordReset } = useAuth();
const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();
    const email = e.target.email.value;

    if (!email) {
      setError("Please enter a valid email address!");
      return;
    }

    passwordReset(email)
      .then(() => {
        Swal.fire({
                position: "center",
                icon: "success",
                title: `User successfully logged in!!!`,
                showConfirmButton: false,
                timer: 1500,
              });
        navigate("/login");
      })
      .catch((err) => {
        setError(err.message);
      })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-sand">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-chocolate">
        <div className="flex justify-center mb-4">
                  <img className="h-10" src={logo} alt="TourHub Logo" />
                </div>
        <h1 className="text-2xl font-bold text-center text-terracotta font-nunito mb-4">
          Reset Your Password
        </h1>
        <p className="text-sm text-center text-neutral font-heebo mb-6">
          Enter your email address below, and we’ll send you instructions to
          reset your password.
        </p>
        <form onSubmit={handlePasswordReset}>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-semibold text-chocolate font-heebo">
                Email Address
              </span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white border border-neutral focus:outline-none focus:border-terracotta focus:ring focus:ring-terracotta focus:ring-opacity-50"
              required
            />
            <p className="text-red-500 pt-3">{error}</p>
          </div>
          <div className="form-control">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-terracotta rounded-lg font-heebo hover:bg-chocolate transition-shadow focus:outline-none focus:ring focus:ring-chocolate focus:ring-opacity-50"
            >
              Send Reset Email
            </button>
          </div>
        </form>
        <div className="divider my-6"></div>
        <div className="flex justify-between">
          <Link
            to="/login"
            className="text-sm text-chocolate font-heebo hover:underline"
          >
            Back to Login
          </Link>
          <Link
            to="/"
            className="text-sm text-chocolate font-heebo hover:underline"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
