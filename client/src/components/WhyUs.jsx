import { assets, features } from "../assets/assets.js";

const WhyUs = () => {
  return (
    // Section wrapper with background image styling
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${assets.whyUs_bg})` }}
    >
      {/* Section padding for spacing on all screen sizes */}
      <div className="mt-[80px] pt-[80px] pb-[80px] px-6 md:px-16 lg:px-24 xl:px-32">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[30px] sm:text-[36px] md:text-[42px] font-bold leading-tight text-center text-background">
            Why Choose SwiftMart?
          </h2>
          <p className="text-center text-base sm:text-lg text-background">
            Discover why SwiftMart is the go-to choice for smart shoppers
            everywhere.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[32px] mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-[32px] bg-background p-[32px] rounded-[10px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-1 transition duration-300 ease-in-out"
            >
              {/* Feature Icon */}
              <img
                src={feature.icon}
                alt={feature.title}
                className="md:w-16 w-12"
              />

              {/* Feature Title & Description */}
              <div>
                <h3 className="text-secondary-950 text-[24px] sm:text-[28px] md:text-[32px] font-semibold leading-tight mb-[8px]">
                  {feature.title}
                </h3>
                <p className="text-secondary-950 text-base sm:text-lg">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
