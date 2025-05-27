import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

// Input field component
const InputField = ({
  type,
  placeholder,
  name,
  handleChange,
  address,
  label,
}) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name} className="text-sm font-medium text-secondary-950">
      {label}
    </label>
    <input
      id={name}
      className="w-full px-2 py-2.5 border border-gray-300 rounded outline-none text-secondary-900/70 focus:border-primary-500 transition"
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      name={name}
      value={address[name]}
      required
    />
  </div>
);

const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();

  const [address, setAddresses] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddresses((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, [user, navigate]);

  return (
    <div className="mt-[137px] mb-[80px] px-6 md:px-16 lg:px-24 xl:px-32">
      <h1 className="text-[30px] text-center sm:text-[36px] md:text-[42px] font-bold leading-tight text-secondary-950">
        Add Shipping Address
      </h1>
      <div className="flex justify-center mt-10">
        <div className="flex-1 max-w-md">
          <form
            onSubmit={onSubmitHandler}
            className="space-y-3 mt-[16px] text-sm"
          >
            <div className="grid grid-cols-2 gap-4">
              {" "}
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="e.g. John"
                label="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="e.g. Doe"
                label="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="text"
              placeholder="e.g. example@gmail.com"
              label="Email Address"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="e.g. 123 Main St"
              label="Street"
            />

            <div className="grid grid-cols-2 gap-4">
              {" "}
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="e.g. Abu Dhabi"
                label="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="e.g. Al Ain"
                label="State"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {" "}
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipcode"
                type="number"
                placeholder="Enter PO Box"
                label="Zip Code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="e.g. UAE"
                label="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="e.g. 050 123 4567"
              label="Phone"
            />

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  navigate("/cart");
                  window.scrollTo(0, 0);
                }}
                className="flex-1 text-sm sm:text-base rounded-full border border-primary-500 text-primary-500 py-2.5 hover:bg-primary-500/10 transition cursor-pointer"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="flex-1 text-sm sm:text-base rounded-full bg-primary-500 text-background py-2.5 hover:bg-primary-600 transition cursor-pointer"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
