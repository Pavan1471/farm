// const productModel = require("../../models/productModel");

// const getFarmerProduct = async (req, res) => {
//     try {
//         const { userId } = req.body; // Extract the userId from the request body
//         console.log(userId)

//         if (!userId) {
//             return res.status(400).json({
//                 message: "User ID is required",
//                 success: false,
//                 error: true,
//             });
//         }

//         // Fetch products where the 'farmer' matches the provided userId
//         const farmerProducts = await productModel
//             .find({ farmer: userId }) // Filter products by matching farmer userId
//             .populate("farmer", "name location") // Populate 'farmer' field with 'name' and 'location'
//             .sort({ createdAt: -1 }) // Sort by creation date (newest first)
//             .lean(); // Convert Mongoose documents to plain JavaScript objects

//         // Debug: Log the fetched products with populated farmer details
//         console.log("Fetched Farmer's Products:", farmerProducts);

//         // Send the response with the fetched products
//         res.json({
//             message: "Farmer's Products fetched successfully",
//             success: true,
//             error: false,
//             data: farmerProducts, // Populated products
//         });
//     } catch (err) {
//         // Handle any errors that occur during the process
//         console.error("Error fetching farmer's products:", err);

//         res.status(400).json({
//             message: err.message || "Failed to fetch farmer's products",
//             success: false,
//             error: true,
//         });
//     }
// };

// module.exports = getFarmerProduct;

// const addToCartModel = require("../../models/addToCartModel");


const addToCartModel = require('../../models/cartProduct'); // Import the model

const getFarmerProduct = async (req, res) => {
  try {
    const { userId } = req.body; // Extract the userId from the request body
    console.log(userId);

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
        success: false,
        error: true,
      });
    }

    // Delete all cart items for the provided userId
    const result = await addToCartModel.deleteMany({ userId });
    console.log(`${result.deletedCount} cart items deleted for user: ${userId}`);

    // Send the response with the result of deletion
    res.json({
      message: `${result.deletedCount} cart items deleted successfully`,
      success: true,
      error: false,
    });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting cart items:", error);

    res.status(400).json({
      message: error.message || "Failed to delete cart items",
      success: false,
      error: true,
    });
  }
};

module.exports = getFarmerProduct;
