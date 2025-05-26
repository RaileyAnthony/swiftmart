import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// Add product: /api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);

    const images = req.files;

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    await Product.create({ ...productData, image: imagesUrl });

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get product: /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get single product: /api/product/id
export const productById = async (req, res) => {
  try {
    // Accept id from POST body
    const { id } = req.body;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });

    const product = await Product.findById(id);
    if (!product)
      return res.json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get product instock: /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.json({ success: true, message: "Stock Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Update product: /api/product/edit
export const editProduct = async (req, res) => {
  try {
    const { id } = req.body;
    let productData = JSON.parse(req.body.productData);
    let updateData = { ...productData };
    // If there are images, upload and update them
    if (req.files && req.files.length > 0) {
      let imagesUrl = await Promise.all(
        req.files.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
      updateData.image = imagesUrl;
    }
    await Product.findByIdAndUpdate(id, updateData);
    res.json({ success: true, message: "Product Updated" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });

    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // Delete images from Cloudinary
    if (Array.isArray(product.image)) {
      await Promise.all(
        product.image.map(async (imgUrl) => {
          // Extract public_id from the URL (handles folders/nested structure)
          const matches = imgUrl.match(
            /\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/
          );
          if (matches && matches[1]) {
            const publicId = matches[1];
            try {
              await cloudinary.uploader.destroy(publicId, {
                resource_type: "image",
              });
            } catch (err) {
              // Log and continue; don't block delete
              console.log(`Failed to delete image ${publicId}:`, err.message);
            }
          }
        })
      );
    }

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product and images deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error" });
  }
};
