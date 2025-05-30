import { assets, footerLinks } from "../assets/assets.js";

const Footer = () => {
  return (
    // Main footer container with responsive horizontal padding and dark background
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-secondary-950">
      {/* Top section: logo, description, and link sections */}
      <div className="flex flex-col md:flex-row items-start gap-20 py-10 border-b border-secondary-900">
        {/* Logo and site description */}
        <div>
          <img className="h-9" src={assets.logo} alt="SwiftMart logo" />
          <p className="max-w-[410px] mt-[16px] text-background">
            Get everything you need delivered in just minutes, carefully
            handpicked for freshness, and designed to bring unbeatable
            convenience straight to your doorstep.
          </p>
        </div>

        {/* Footer navigation links divided by section */}
        <div className="flex flex-wrap justify-start w-full md:w-[45%] gap-20">
          {footerLinks.map((section, index) => (
            <div key={index}>
              {/* Section title */}
              <h3 className="font-semibold text-base sm:text-lg text-background mb-[16px]">
                {section.title}
              </h3>
              {/* Section links */}
              <ul className="text-sm space-y-2 text-background">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="hover:text-primary-500 transition"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright notice */}
      <p className="py-4 text-sm md:text-base text-background">
        Copyright {new Date().getFullYear()} &copy; Railey Inductivo All Rights
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
