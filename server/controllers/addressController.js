import Address from "../models/Address.js";

// Add address: /api/address/add
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const newAddress = await Address.create({
      ...address,
      userId: req.userId,
    });
    res.json({
      success: true,
      message: "Address added successfully",
      address: newAddress,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get address: /api/address/get
export const getAddress = async (req, res) => {
  try {
    const addresses = await Address.find({
      userId: req.userId, // Get from auth middleware
    });
    res.json({
      success: true,
      addresses,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete address: /api/address/delete/:id
export const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    console.log(`Delete request received for address ID: ${addressId}`); // Debug: Log the requested address ID

    // Ensure the address belongs to the user
    const address = await Address.findOne({
      _id: addressId,
      userId: req.userId,
    });

    console.log(`Address found: ${address ? JSON.stringify(address) : "None"}`); // Debug: Log the address found or indicate none

    if (!address) {
      console.log(
        `Address not found or unauthorized access for user ID: ${req.userId}`
      ); // Debug: Log when address is not found
      return res.status(404).json({
        success: false,
        message: "Address not found or you do not have permission to delete it",
      });
    }

    await Address.deleteOne({ _id: addressId });
    console.log(`Address with ID ${addressId} deleted successfully`); // Debug: Log successful deletion

    res.json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error(`Error while deleting address: ${error.message}`); // Detailed log for developers
    res.status(400).json({
      success: false,
      message: "Failed to delete address. Please try again later.", // Generalized error message for the client
    });
  }
};
