// const productModel = require("../../models/productModel")

// const getProductController = async(req,res)=>{
//     try{
//         const allProduct = await productModel.find().sort({ createdAt : -1 })

//         res.json({
//             message : "All Product",
//             success : true,
//             error : false,
//             data : allProduct
//         })

//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }

// }

// module.exports = getProductController

// const productModel = require("../../models/productModel");

// const getProductController = async (req, res) => {
//     try {
//         // Fetch all products and populate farmer details
//         const allProduct = await productModel
//             .find()
//             .populate("farmer", "name location") // Fetch name and location of the farmer
//             .sort({ createdAt: -1 });

//         // Transform the data to include Farmername and location directly in the product object
//         const formattedProducts = allProduct.map(product => ({
//             _id: product._id,
//             productName: product.productName,
//             brandName: product.brandName,
//             category: product.category,
//             productImage: product.productImage,
//             description: product.description,
//             price: product.price,
//             sellingPrice: product.sellingPrice,
//             Farmername: product.farmer?.name || "Unknown",
//             location: product.farmer?.location || "Unknown",
//             createdAt: product.createdAt,
//             updatedAt: product.updatedAt,
//         }));

//         res.json({
//             message: "All Products",
//             success: true,
//             error: false,
//             data: formattedProducts,
//         });
//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false,
//         });
//     }
// };

// module.exports = getProductController;


// const productModel = require("../../models/productModel");

// const getProductController = async (req, res) => {
//     try {
//         // Fetch products and populate farmer details
//         const allProducts = await productModel
//             .find()
//             .populate("farmer", "name location") // Fetch only `name` and `location` fields from user
//             .sort({ createdAt: -1 });

//         console.log(allProducts); // Debug to ensure correct population

//         res.json({
//             message: "All Products",
//             success: true,
//             error: false,
//             data: allProducts,
//         });
//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false,
//         });
//     }
// };

// module.exports = getProductController;


const productModel = require("../../models/productModel");

const getProductController = async (req, res) => {
    try {
        // Fetch products, populate the 'farmer' field with 'name' and 'location' from the 'user' model
        const allProducts = await productModel
            .find()
            .populate("farmer", "name location") // Populate 'farmer' with 'name' and 'location' fields from the user model
            .sort({ createdAt: -1 })
            .lean(); // Convert the document to a plain object

        // Debugging: Check the populated results
        console.log(allProducts); // Logs the populated products with farmer details

        res.json({
            message: "All Products",
            success: true,
            error: false,
            data: allProducts, // This will include the populated 'farmer' details
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = getProductController;

