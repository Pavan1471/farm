// import React, { useState } from 'react'
// import { MdModeEditOutline } from "react-icons/md";
// import AdminEditProduct from './AdminEditProduct';
// import displayINRCurrency from '../helpers/displayCurrency';
// import { useSelector } from 'react-redux';
// const AdminProductCard = ({
//     data,
//     fetchdata,
// }) => {
//     const user = useSelector((state) => state?.user?.user);
//     const [editProduct,setEditProduct] = useState(false)
//     console.log(user._id)
//     // console.log(userId)

//   return (
//     <div className='bg-white p-4 rounded '>
//        <div className='w-40'>
//             <div className='w-32 h-32 flex justify-center items-center'>
//               <img src={data?.productImage[0]}  className='mx-auto object-fill h-full'/>   
//             </div> 
//             <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

//             <div>

//                 <p className='font-semibold'>
//                   {
//                     displayINRCurrency(data.sellingPrice)
//                   }
        
//                 </p>

//                 <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
//                     <MdModeEditOutline/>
//                 </div>

//             </div>

          
//        </div>
        
//         {
//           editProduct && (
//             <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
//           )
//         }
    
//     </div>
//   )
// }

// export default AdminProductCard


// import React, { useState } from 'react';
// import { MdModeEditOutline } from "react-icons/md";
// import AdminEditProduct from './AdminEditProduct';
// import displayINRCurrency from '../helpers/displayCurrency';
// import { useSelector } from 'react-redux';

// const AdminProductCard = ({
//     data,
//     fetchdata,
// }) => {
//     const user = useSelector((state) => state?.user?.user);
//     const [editProduct, setEditProduct] = useState(false);

//     // Filter to display the product only if the user._id matches data.farmer._id
//     if (user._id !== data.farmer._id) {
//         return null; // Return null if the IDs don't match, thus not displaying the card
//         console.log(data)
//     }
   
//     return (
//         <div className='bg-white p-4 rounded '>
//             <div className='w-40'>
//                 <div className='w-32 h-32 flex justify-center items-center'>
//                     <img src={data?.productImage[0]} className='mx-auto object-fill h-full' />
//                 </div>
//                 <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

//                 <div>
//                     <p className='font-semibold'>
//                         {
//                             displayINRCurrency(data.sellingPrice)
//                         }
//                     </p>

//                     <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
//                         <MdModeEditOutline />
//                     </div>
//                 </div>

//             </div>

//             {
//                 editProduct && (
//                     <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
//                 )
//             }

//         </div>
//     );
// }

// export default AdminProductCard;



// import React, { useState, useEffect } from 'react';
// import { MdModeEditOutline } from "react-icons/md";
// import AdminEditProduct from './AdminEditProduct';
// import displayINRCurrency from '../helpers/displayCurrency';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const AdminProductCard = ({ fetchdata }) => {
//     const [products, setProducts] = useState([]); // Store products in state
//     const [loading, setLoading] = useState(true);  // Loading state
//     const [error, setError] = useState(null);      // Error state
//     const [editProduct, setEditProduct] = useState(false); // Edit product modal state
//     const user = useSelector(state => state?.user?.user); // Get logged-in user

//     // Fetch the products on mount using the logged-in user's ID
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 // Fetch products by sending userId to backend
//                 const response = await axios.post('http://localhost:8080/get-farmer-product', { userId: user?._id });
//                 setProducts(response.data.data); // Assuming 'data' contains the products
//                 setLoading(false);
//             } catch (err) {
//                 setError("Failed to fetch products");
//                 setLoading(false);
//             }
//         };
//         console.log(products)
//         if (user?._id) {
//             fetchProducts();
//         }
//     }, [user?._id]); // Only refetch when user id changes

//     if (loading) {
//         return <div>Loading products...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div className='grid gap-4'>
//             {products.length === 0 ? (
//                 <div>No products available</div>
//             ) : (
//                 products.map(product => (
//                     <div key={product._id} className='bg-white p-4 rounded'>
//                         <div className='w-40'>
//                             <div className='w-32 h-32 flex justify-center items-center'>
//                                 <img
//                                     src={product?.productImage[0]}
//                                     className='mx-auto object-fill h-full'
//                                     alt={product?.productName}
//                                 />
//                             </div>
//                             <h1 className='text-ellipsis line-clamp-2'>{product.productName}</h1>
//                             <div>
//                                 <p className='font-semibold'>
//                                     {displayINRCurrency(product.sellingPrice)}
//                                 </p>
//                                 <div
//                                     className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
//                                     onClick={() => setEditProduct(product)}
//                                 >
//                                     <MdModeEditOutline />
//                                 </div>
//                             </div>
//                         </div>
//                         {editProduct?._id === product._id && (
//                             <AdminEditProduct
//                                 productData={product}
//                                 onClose={() => setEditProduct(false)}
//                                 fetchdata={fetchdata}
//                             />
//                         )}
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// };

// export default AdminProductCard;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const AdminProductCard = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const user = useSelector(state => state?.user?.user); // Get logged-in user

//     // Define the API call
//     const farmerProduct = {
//         url: `http://localhost:8080/api/get-farmer-product`, // Backend API URL
//         method: 'post' // POST method
//     };

//     useEffect(() => {
//         // Function to fetch the farmer's products
//         const fetchFarmerProducts = async () => {
//             try {
//                 const response = await axios({
//                     url: farmerProduct.url,
//                     method: farmerProduct.method,
//                     data: { userId: user._id } // Sending userId in the request body (use user._id)
//                 });

//                 setProducts(response.data.data); // Set the fetched products
//             } catch (err) {
//                 setError(err.message || "Error fetching products");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (user && user._id) { // Ensure user exists and has an _id before calling the API
//             fetchFarmerProducts();
//         }
//     }, [user]); // Dependency array is now based on `user`, so it will rerun when the user changes

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     return (
//         <div>
//             <h2>Farmer's Products</h2>
//             <div className="product-list">
//                 {products.map(product => (
//                     <div key={product._id} className="product-card">
//                         <img src={product.productImage[0]} alt={product.productName} />
//                         <h3>{product.productName}</h3>
//                         <p>{product.farmer.name}</p>
//                         <p>{product.farmer.location}</p>
//                         <p>Price: ₹{product.sellingPrice}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AdminProductCard;


// import React, { useEffect, useState } from 'react';
// import { MdModeEditOutline } from "react-icons/md";
// import AdminEditProduct from './AdminEditProduct';
// import displayINRCurrency from '../helpers/displayCurrency';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const AdminProductCard = ({ fetchdata }) => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editProduct, setEditProduct] = useState(null); // Track the product being edited
//     const user = useSelector(state => state?.user?.user); // Get logged-in user

//     // Define the API call
//     const farmerProduct = {
//         url: `http://localhost:8080/api/get-farmer-product`, // Backend API URL
//         method: 'post' // POST method
//     };

//     // Fetch products when user logs in or component mounts
//     useEffect(() => {
//         const fetchFarmerProducts = async () => {
//             try {
//                 const response = await axios({
//                     url: farmerProduct.url,
//                     method: farmerProduct.method,
//                     data: { userId: user._id } // Sending userId in the request body
//                 });
//                 setProducts(response.data.data); // Set the fetched products
//             } catch (err) {
//                 setError(err.message || "Error fetching products");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         console.log(products)
//         if (user && user._id) { // Ensure user exists and has an _id before calling the API
//             fetchFarmerProducts();
//         }
//     }, [user]); // Dependency on user, fetch when user changes

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     return (
//         <div className="product-list grid gap-4">
//             {products.map(product => (
//                 <div key={product._id} className="bg-white p-4 rounded shadow-md">
//                     <div className="w-40">
//                         <div className="w-32 h-32 flex justify-center items-center">
//                             <img
//                                 src={product.productImage[0]}
//                                 alt={product.productName}
//                                 className="mx-auto object-fill h-full"
//                             />
//                         </div>
//                         <h1 className="text-ellipsis line-clamp-2">{product.productName}</h1>

//                         <div>
//                             <p className="font-semibold">
//                                 {displayINRCurrency(product.sellingPrice)}
//                             </p>

//                             <div
//                                 className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
//                                 onClick={() => setEditProduct(product)} // Set the product to be edited
//                             >
//                                 <MdModeEditOutline />
//                             </div>
//                         </div>
//                     </div>

//                     {editProduct?._id === product._id && (
//                         <AdminEditProduct
//                             productData={product}
//                             onClose={() => setEditProduct(null)} // Close the edit modal
//                             fetchdata={fetchdata} // Optionally fetch the data after editing
//                         />
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AdminProductCard;

// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { MdModeEditOutline } from "react-icons/md";
// import AdminEditProduct from './AdminEditProduct';
// import displayINRCurrency from '../helpers/displayCurrency';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// const fetchFarmerProducts = async (userId) => {
//     const farmerProduct = {
//         url: `http://localhost:8080/api/get-farmer-product`,
//         method: 'post',
//     };

//     try {
//         const response = await axios({
//             url: farmerProduct.url,
//             method: farmerProduct.method,
//             data: { userId },
//         });
//         return response.data.data;
//     } catch (err) {
//         throw new Error(err.message || "Error fetching products");
//     }
// };

// const AdminProductCard = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editProduct, setEditProduct] = useState(null);
//     const user = useSelector((state) => state?.user?.user);
//     const dataFetchedRef = useRef(false); // Use useRef to track if data is fetched

//     useEffect(() => {
//         const fetchProducts = async () => {
//             if (dataFetchedRef.current || !user || !user._id) return; // Check if data is already fetched

//             dataFetchedRef.current = true; // Mark as data fetched to avoid fetching again

//             setLoading(true);
//             try {
//                 const data = await fetchFarmerProducts(user._id);
//                 // Filter out duplicates based on product `_id`
//                 const uniqueProducts = data.filter((product, index, self) =>
//                     index === self.findIndex((p) => p._id === product._id)
//                 );
//                 setProducts(uniqueProducts); // Set unique products
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, [user]); // Only fetch products when `user` changes

//     const handleEditProduct = useCallback((product) => {
//         setEditProduct(product);
//     }, []);

//     const handleCloseEditModal = useCallback(() => {
//         setEditProduct(null);
//     }, []);

//     const handleUpdateProduct = useCallback(
//         (updatedProduct) => {
//             setProducts((prevProducts) =>
//                 prevProducts.map((product) =>
//                     product._id === updatedProduct._id ? updatedProduct : product
//                 )
//             );
//             handleCloseEditModal();
//         },
//         [handleCloseEditModal]
//     );

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     if (error) {
//         return <p>Error: {error}</p>;
//     }

//     return (
//         <div className="product-list grid gap-4">
//             {products.map((product) => (
//                 <div key={product._id} className="bg-white p-4 rounded shadow-md">
//                     <div className="w-40">
//                         <div className="w-32 h-32 flex justify-center items-center">
//                             <img
//                                 src={product.productImage[0]}
//                                 alt={product.productName}
//                                 className="mx-auto object-fill h-full"
//                             />
//                         </div>
//                         <h1 className="text-ellipsis line-clamp-2">{product.productName}</h1>

//                         <div>
//                             <p className="font-semibold">
//                                 {displayINRCurrency(product.sellingPrice)}
//                             </p>

//                             <div
//                                 className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
//                                 onClick={() => handleEditProduct(product)}
//                             >
//                                 <MdModeEditOutline />
//                             </div>
//                         </div>
//                     </div>

//                     {editProduct?._id === product._id && (
//                         <AdminEditProduct
//                             productData={product}
//                             onClose={handleCloseEditModal}
//                             onUpdate={handleUpdateProduct}
//                         />
//                     )}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default React.memo(AdminProductCard);


import React, { useState } from 'react';
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { useSelector } from 'react-redux';

const AdminProductCard = ({
    data,
    fetchdata,
}) => {
    const user = useSelector((state) => state?.user?.user);
    const [editProduct, setEditProduct] = useState(false);

    // Check if user._id is available and matches data.farmer._id
    if (!user?._id) {
        return <div>No user found. Please log in.</div>; // Display a message or fallback UI if user._id is not available
    }

    if (user._id !== data.farmer._id) {
        return null; // Return null if the IDs don't match, thus not displaying the card
    }

    return (
        <div className='bg-white p-4 rounded '>
            <div className='w-40'>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} className='mx-auto object-fill h-full' />
                </div>
                <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

                <div>
                    <p className='font-semibold'>
                        {
                            displayINRCurrency(data.sellingPrice)
                        }
                    </p>

                    <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={() => setEditProduct(true)}>
                        <MdModeEditOutline />
                    </div>
                </div>

            </div>

            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
                )
            }

        </div>
    );
}

export default AdminProductCard;
