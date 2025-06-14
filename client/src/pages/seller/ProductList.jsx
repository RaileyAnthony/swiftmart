import React from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { products, currency, axios, fetchProducts } = useAppContext();
  const navigate = useNavigate();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h1 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold leading-tight mb-[40px]">
          All Products
        </h1>
        {/* Add overflow-x-auto to enable horizontal scrolling on small screens */}
        <div className="overflow-x-auto w-full rounded-md bg-background border border-gray-500/20">
          <table className="min-w-[700px] w-full">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 text-base font-semibold truncate">
                  Product
                </th>
                <th className="px-4 py-3 text-base font-semibold truncate">
                  Category
                </th>
                <th className="px-4 py-3 text-base font-semibold truncate hidden md:table-cell">
                  Selling Price
                </th>
                <th className="px-4 py-3 text-base font-semibold truncate">
                  In Stock
                </th>
                <th className="px-4 py-3 text-base font-semibold truncate">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product) => (
                <tr key={product._id} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="border border-gray-300 rounded p-2">
                      <img
                        src={product.image[0]}
                        alt="Product"
                        className="w-16"
                      />
                    </div>
                    <span className="truncate max-sm:hidden w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {currency}
                    {product.offerPrice}
                  </td>
                  <td className="px-4 py-3">
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        onChange={() =>
                          toggleStock(product._id, !product.inStock)
                        }
                        checked={product.inStock}
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-primary-500 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-background rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        navigate(`/seller/edit-product/${product._id}`)
                      }
                      className="text-blue-500 underline cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
