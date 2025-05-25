import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import { useAppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border-t-[10px] border-t-primary-500 px-4 md:px-8 border-b border-gray-300 py-3 bg-background transition-all duration-300">
        <Link to="/">
          <img
            src={assets.logo}
            alt="SwiftMart logo"
            className="cursor-pointer w-34 md:w-55"
          />
        </Link>
        <div className="flex items-center gap-3 md:gap-5 text-gray-500">
          <button
            onClick={logout}
            className="cursor-pointer border hover:bg-secondary-900/10 transition-all rounded-full text-sm sm:text-base px-5 py-2.5 md:px-8 md:py-2.5"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${
                              isActive
                                ? "border-r-4 md:border-r-[6px] bg-primary-500/10 border-primary-500"
                                : "hover:bg-gray-100/90 border-white"
                            }`}
            >
              <img
                src={item.icon}
                alt={`${item.name} icon`}
                className="w-7 h-7"
              />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SellerLayout;
