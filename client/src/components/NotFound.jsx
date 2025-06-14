import { Link } from "react-router-dom";

// Functional component to handle 404 - Page Not Found errors
const NotFound = () => {
  return (
    // Full-height centered container for the 404 message
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center text-sm text-center">
        {/* Large 404 error code */}
        <h1 className="text-8xl md:text-9xl font-bold text-primary-500">404</h1>

        {/* Decorative divider below the 404 number */}
        <div className="h-1 w-16 rounded bg-primary-500 my-5 md:my-7"></div>

        {/* Heading indicating the page was not found */}
        <p className="text-2xl md:text-3xl font-bold text-secondary-950">
          Page Not Found
        </p>

        {/* Additional explanation message for the user */}
        <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Navigation button to return the user back to the homepage */}
        <div className="flex items-center gap-4 mt-6">
          <Link
            to="/"
            className="text-sm sm:text-base bg-primary-500 hover:bg-primary-600 px-6 py-2.5 text-white rounded-full active:scale-95 transition-all"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
