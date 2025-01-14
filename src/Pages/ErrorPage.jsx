import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-sand text-chocolate">
      <div className="text-center">
        <h1 className="text-9xl font-nunito font-bold text-terracotta">404</h1>
        <h2 className="text-2xl font-nunito font-bold mt-4">Oops! Page Not Found</h2>
        <p className="mt-2 font-heebo text-neutral text-lg">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-terracotta text-white rounded-lg text-lg font-heebo hover:bg-chocolate transition"
          >
            Go Back to Home
          </Link>

          
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-chocolate text-white rounded-lg text-lg font-heebo hover:bg-terracotta transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
