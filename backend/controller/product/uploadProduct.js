// const uploadProductPermission = require("../../helpers/permission")
// const productModel = require("../../models/productModel")

// async function UploadProductController(req,res){
//     try{
//         const sessionUserId = req.userId

//         if(!uploadProductPermission(sessionUserId)){
//             throw new Error("Permission denied")
//         }
    
//         const uploadProduct = new productModel(req.body)
//         const saveProduct = await uploadProduct.save()

//         res.status(201).json({
//             message : "Product upload successfully",
//             error : false,
//             success : true,
//             data : saveProduct
//         })

//     }catch(err){
//         res.status(400).json({
//             message : err.message || err,
//             error : true,
//             success : false
//         })
//     }
// }

// const uploadProductPermission = require("../../helpers/permission");
// const productModel = require("../../models/productModel");

// async function UploadProductController(req, res) {
//     try {
//         const sessionUserId = req.userId; // Assuming this is retrieved from a decoded JWT or session

//         // Check if the user has permission to upload products
//         if (!uploadProductPermission(sessionUserId)) {
//             throw new Error("Permission denied");
//         }

//         // Add the farmer field to the product data
//         const productData = {
//             ...req.body,
//             farmer: sessionUserId, // Add the farmer's ID to the product
//         };

//         // Create and save the product
//         const uploadProduct = new productModel(productData);
//         const saveProduct = await uploadProduct.save();

//         res.status(201).json({
//             message: "Product uploaded successfully",
//             error: false,
//             success: true,
//             data: saveProduct,
//         });
//     } catch (err) {
//         res.status(400).json({
//             message: err.message || err,
//             error: true,
//             success: false,
//         });
//     }
// }

// // module.exports = UploadProductController;


// module.exports = UploadProductController


const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");
const userModel = require("../../models/userModel"); // Import user model

async function UploadProductController(req, res) {
    try {
        const sessionUserId = req.userId; // Assuming this is retrieved from a decoded JWT or session

        // Check if the user has permission to upload products
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied");
        }

        // Fetch the user details based on sessionUserId
        const user = await userModel.findById(sessionUserId);
        
        
        if (!user) {
            throw new Error("User not found");
        }

        // Add the farmer details (name and location) along with the farmer's ID to the product data
        const productData = {
            ...req.body,
            farmer: sessionUserId, // Store the farmer's ID
            farmerName: user.name, // Store the farmer's name
            farmerLocation: user.location, // Store the farmer's location
        };

        // Create and save the product
        const uploadProduct = new productModel(productData);
        const saveProduct = await uploadProduct.save();

        res.status(201).json({
            message: "Product uploaded successfully",
            error: false,
            success: true,
            data: saveProduct,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = UploadProductController;

