const mongoose = require('mongoose');

// const productSchema = mongoose.Schema({
//     productName: String,
//     brandName: String,
//     category: String,
//     productImage: [String], // Array of image URLs
//     description: String,
//     price: Number,
//     sellingPrice: Number,
//     farmer: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: "user", // Reference to the user collection
//         required: true // Ensures every product has an associated farmer
//     }
// }, {
//     timestamps: true
// });

// const productModel = mongoose.model("product", productSchema);

// module.exports = productModel;


const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [String],
    description: String,
    price: Number,
    sellingPrice: Number,
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Ensure this matches your user model name
        required: true,
    },
    farmerName: String,    // Store farmer's name
    farmerLocation: String, // Store farmer's location
}, {
    timestamps: true,
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
