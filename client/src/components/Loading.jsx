import { useEffect } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const { navigate } = useAppContext(); // Get navigation method from context
  let { search } = useLocation(); // Get query string from current route

  // Parse the 'next' parameter from the URL, e.g., ?next=dashboard
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    // If a next URL exists, redirect to it after a short delay
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`); // Programmatic navigation to the next page
      }, 5000); // 5-second delay before redirecting
    }
  }, [navigate, nextUrl]);

  return (
    // Loading UI with spinner and message
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary-500"></div>
      <p className="text-primary-500 font-medium">
        Redirecting, please wait...
      </p>
    </div>
  );
};

export default Loading;
