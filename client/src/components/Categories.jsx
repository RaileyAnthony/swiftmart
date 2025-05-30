import { categories, assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
const Categories = () => {
  const { navigate } = useAppContext(); // Get navigation function from app context

  return (
    // Background wrapper with a full-cover image
    <div
      style={{
        backgroundImage: `url(${assets.categories_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mt-[80px] mb-[80px] pt-[80px] pb-[80px] px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Section Heading */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[30px] sm:text-[36px] md:text-[42px] font-bold leading-tight text-center text-secondary-950">
            Shop By Category
          </h2>
          <p className="text-center text-base sm:text-lg text-secondary-950">
            Fresh Picks, Sorted for You
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mt-10 gap-[32px]">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer py-5 px-3 gap-2 rounded-[10px] flex flex-col justify-center items-center"
              style={{ backgroundColor: category.bgColor }} // Dynamic background color
              onClick={() => {
                // Navigate to the category-specific products page
                navigate(`/products/${category.path.toLowerCase()}`);
                scrollTo(0, 0); // Scroll to top of page after navigation
              }}
            >
              {/* Category Image */}
              <img
                src={category.image}
                alt={category.text}
                className="group-hover:scale-105 transition max-w-28"
              />
              {/* Category Label */}
              <p className="text-center text-base sm:text-lg font-medium">
                {category.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
