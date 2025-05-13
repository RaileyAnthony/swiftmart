import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const { navigate } = useAppContext();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 5000);
    }
  }, [navigate, nextUrl]);
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary-500"></div>
      <p className="text-primary-500 font-medium">
        Redirecting, please wait...
      </p>
    </div>
  );
};

export default Loading;
