// import React, { useContext, useEffect, useState } from 'react'
// import SummaryApi from '../common'
// import Context from '../context'
// import displayINRCurrency from '../helpers/displayCurrency'
// import { MdDelete } from "react-icons/md";

// const Cart = () => {
//     const [data,setData] = useState([])
//     const [loading,setLoading] = useState(false)
//     const context = useContext(Context)
//     const loadingCart = new Array(4).fill(null)


//     const fetchData = async() =>{
        
//         const response = await fetch(SummaryApi.addToCartProductView.url,{
//             method : SummaryApi.addToCartProductView.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//         })
       

//         const responseData = await response.json()

//         if(responseData.success){
//             setData(responseData.data)
//         }


//     }

//     const handleLoading = async() =>{
//         await fetchData()
//     }

//     useEffect(()=>{
//         setLoading(true)
//         handleLoading()
//          setLoading(false)
//     },[])


//     const increaseQty = async(id,qty) =>{
//         const response = await fetch(SummaryApi.updateCartProduct.url,{
//             method : SummaryApi.updateCartProduct.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//             body : JSON.stringify(
//                 {   
//                     _id : id,
//                     quantity : qty + 1
//                 }
//             )
//         })

//         const responseData = await response.json()


//         if(responseData.success){
//             fetchData()
//         }
//     }


//     const decraseQty = async(id,qty) =>{
//        if(qty >= 2){
//             const response = await fetch(SummaryApi.updateCartProduct.url,{
//                 method : SummaryApi.updateCartProduct.method,
//                 credentials : 'include',
//                 headers : {
//                     "content-type" : 'application/json'
//                 },
//                 body : JSON.stringify(
//                     {   
//                         _id : id,
//                         quantity : qty - 1
//                     }
//                 )
//             })

//             const responseData = await response.json()


//             if(responseData.success){
//                 fetchData()
//             }
//         }
//     }

//     const deleteCartProduct = async(id)=>{
//         const response = await fetch(SummaryApi.deleteCartProduct.url,{
//             method : SummaryApi.deleteCartProduct.method,
//             credentials : 'include',
//             headers : {
//                 "content-type" : 'application/json'
//             },
//             body : JSON.stringify(
//                 {   
//                     _id : id,
//                 }
//             )
//         })

//         const responseData = await response.json()

//         if(responseData.success){
//             fetchData()
//             context.fetchUserAddToCart()
//         }
//     }

//     const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
//     const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)
//   return (
//     <div className='container mx-auto'>
        
//         <div className='text-center text-lg my-3'>
//             {
//                 data.length === 0 && !loading && (
//                     <p className='bg-white py-5'>No Data</p>
//                 )
//             }
//         </div>

//         <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
//                 {/***view product */}
//                 <div className='w-full max-w-3xl'>
//                     {
//                         loading ? (
//                             loadingCart?.map((el,index) => {
//                                 return(
//                                     <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
//                                     </div>
//                                 )
//                             })
                             
//                         ) : (
//                           data.map((product,index)=>{
//                            return(
//                             <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]'>
//                                 <div className='w-32 h-32 bg-slate-200'>
//                                     <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
//                                 </div>
//                                 <div className='px-4 py-2 relative'>
//                                     {/**delete product */}
//                                     <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-green-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
//                                         <MdDelete/>
//                                     </div>

//                                     <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
//                                     <p className='capitalize text-slate-500'>{product?.productId.category}</p>
//                                     <div className='flex items-center justify-between'>
//                                             <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
//                                             <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
//                                     </div>
//                                     <div className='flex items-center gap-3 mt-1'>
//                                         <button className='border border-red-600 text-red-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decraseQty(product?._id,product?.quantity)}>-</button>
//                                         <span>{product?.quantity}</span>
//                                         <button className='border border-red-600 text-red-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
//                                     </div>
//                                 </div>    
//                             </div>
//                            )
//                           })
//                         )
//                     }
//                 </div>


//                 {/***summary  */}
//                 <div className='mt-5 lg:mt-0 w-full max-w-sm'>
//                         {
//                             loading ? (
//                             <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
//                             </div>
//                             ) : (
//                                 <div className='h-36 bg-white'>
//                                     <h2 className='text-white bg-green-600 px-4 py-1'>Summary</h2>
//                                     <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                                         <p>Quantity</p>
//                                         <p>{totalQty}</p>
//                                     </div>

//                                     <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
//                                         <p>Total Price</p>
//                                         <p>{displayINRCurrency(totalPrice)}</p>    
//                                     </div>

//                                     <button className='bg-blue-600 p-2 text-white w-full mt-2'>Payment</button>

//                                 </div>
//                             )
//                         }
//                 </div>
//         </div>
//     </div>
//   )
// }

// export default Cart

// import React, { useContext, useEffect, useState } from "react";
// import SummaryApi from "../common";
// import Context from "../context";
// import displayINRCurrency from "../helpers/displayCurrency";
// import { MdDelete } from "react-icons/md";
// import { useSelector } from 'react-redux';
// const Cart = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");
//   const user = useSelector((state) => state?.user?.user);

//   const context = useContext(Context);
//   const loadingCart = new Array(4).fill(null);

//   const fetchData = async () => {
//     const response = await fetch(SummaryApi.addToCartProductView.url, {
//       method: SummaryApi.addToCartProductView.method,
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//     });

//     const responseData = await response.json();

//     if (responseData.success) {
//       setData(responseData.data);
//     }
//   };

//   useEffect(() => {
//     const loadCart = async () => {
//       setLoading(true);
//       await fetchData();
//       setLoading(false);
//     };
//     loadCart();
//   }, []);

//   const increaseQty = async (id, qty) => {
//     const response = await fetch(SummaryApi.updateCartProduct.url, {
//       method: SummaryApi.updateCartProduct.method,
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         _id: id,
//         quantity: qty + 1,
//       }),
//     });

//     const responseData = await response.json();

//     if (responseData.success) {
//       fetchData();
//     }
//   };

//   const decreaseQty = async (id, qty) => {
//     if (qty >= 2) {
//       const response = await fetch(SummaryApi.updateCartProduct.url, {
//         method: SummaryApi.updateCartProduct.method,
//         credentials: "include",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({
//           _id: id,
//           quantity: qty - 1,
//         }),
//       });

//       const responseData = await response.json();

//       if (responseData.success) {
//         fetchData();
//       }
//     }
//   };

//   const deleteCartProduct = async (id) => {
//     const response = await fetch(SummaryApi.deleteCartProduct.url, {
//       method: SummaryApi.deleteCartProduct.method,
//       credentials: "include",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         _id: id,
//       }),
//     });

//     const responseData = await response.json();

//     if (responseData.success) {
//       fetchData();
//       context.fetchUserAddToCart();
//     }
//   };

//   const totalQty = data.reduce(
//     (previousValue, currentValue) => previousValue + currentValue.quantity,
//     0
//   );

//   const totalPrice = data.reduce(
//     (previousValue, currentValue) =>
//       previousValue + currentValue.quantity * currentValue?.productId?.sellingPrice,
//     0
//   );

//   const handlePayment = () => {
//     if (totalQty === 0 || totalPrice === 0) {
//       setPopupMessage("Cart is empty or value is ₹0. Please add items to proceed!");
//       setShowPopup(true);
//       return;
//     }

//     if (!paymentMethod) {
//       setPopupMessage("Please select a payment method!");
//       setShowPopup(true);
//       return;
//     }

//     setPaymentLoading(true);
//     setPaymentSuccess(false);

//     setTimeout(() => {
//       setPaymentLoading(false);
//       setPaymentSuccess(true);
//       setPopupMessage(`Payment of ${displayINRCurrency(totalPrice)} via ${paymentMethod} was successful!`);
//       setShowPopup(true);
//       setData([]);
//       context.fetchUserAddToCart();
//     }, 2000);
//   };

//   const closePopup = () => {
//     setShowPopup(false);
//     setPaymentMethod("");
//   };

//   return (
//     <div className="container mx-auto">
//       <div className="text-center text-lg my-3">
//         {data.length === 0 && !loading && <p className="bg-white py-5">No Data</p>}
//       </div>

//       <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
//         {/* Product List */}
//         <div className="w-full max-w-3xl">
//           {loading ? (
//             loadingCart.map((_, index) => (
//               <div
//                 key={`loading-${index}`}
//                 className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
//               ></div>
//             ))
//           ) : (
//             data.map((product) => (
//               <div
//                 key={product?._id}
//                 className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
//               >
//                 <div className="w-32 h-32 bg-slate-200">
//                   <img
//                     src={product?.productId?.productImage[0]}
//                     className="w-full h-full object-scale-down mix-blend-multiply"
//                     alt={product?.productId?.productName}
//                   />
//                 </div>
//                 <div className="px-4 py-2 relative">
//                   <div
//                     className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-green-600 hover:text-white cursor-pointer"
//                     onClick={() => deleteCartProduct(product?._id)}
//                   >
//                     <MdDelete />
//                   </div>

//                   <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
//                     {product?.productId?.productName}
//                   </h2>
//                   <p className="capitalize text-slate-500">{product?.productId.category}</p>
//                   <div className="flex items-center justify-between">
//                     <p className="text-red-600 font-medium text-lg">
//                       {displayINRCurrency(product?.productId?.sellingPrice)}
//                     </p>
//                     <p className="text-slate-600 font-semibold text-lg">
//                       {displayINRCurrency(
//                         product?.productId?.sellingPrice * product?.quantity
//                       )}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-3 mt-1">
//                     <button
//                       className="border border-red-600 text-red-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
//                       onClick={() => decreaseQty(product?._id, product?.quantity)}
//                     >
//                       -
//                     </button>
//                     <span>{product?.quantity}</span>
//                     <button
//                       className="border border-red-600 text-red-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
//                       onClick={() => increaseQty(product?._id, product?.quantity)}
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Summary Section */}
//         <div className="mt-5 lg:mt-0 w-full max-w-sm">
//           {loading ? (
//             <div className="h-16 bg-slate-200 border border-slate-300 animate-pulse"></div>
//           ) : (
//             <div className="h-auto bg-white">
//               <h2 className="text-white bg-green-600 px-4 py-1">Summary</h2>
//               <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
//                 <p>Quantity</p>
//                 <p>{totalQty}</p>
//               </div>

//               <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
//                 <p>Total Price</p>
//                 <p>{displayINRCurrency(totalPrice)}</p>
//               </div>
            

//               {/* Payment Method Selection */}
//               <div className="px-4 my-3">
//                 <h3 className="font-medium">Select Payment Method</h3>
//                 <div className="flex flex-col gap-2">
//                   <label>
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="Credit Card"
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       checked={paymentMethod === "Credit Card"}
//                     />
//                     Credit Card
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="Debit Card"
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       checked={paymentMethod === "Debit Card"}
//                     />
//                     Debit Card
//                   </label>
//                   <label>
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="UPI"
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       checked={paymentMethod === "UPI"}
//                     />
//                     UPI
//                   </label>
//                 </div>
//               </div>

//               <button
//                 className="bg-blue-600 p-2 text-white w-full mt-2"
//                 onClick={handlePayment}
//                 disabled={paymentLoading}
//               >
//                 {paymentLoading ? "Processing..." : "Pay"}
//               </button>

//               {paymentSuccess && (
//                 <p className="text-green-600 text-center mt-2">Payment Successful!</p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Popup */}
//       {showPopup && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded shadow-lg text-center">
//             <h2 className="text-lg font-bold">{popupMessage}</h2>
//             <button
//               className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
//               onClick={closePopup}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;






import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const user = useSelector((state) => state?.user?.user);

  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    };
    loadCart();
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );

  const totalPrice = data.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.quantity * currentValue?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {
    if (totalQty === 0 || totalPrice === 0) {
      setPopupMessage("Cart is empty or value is ₹0. Please add items to proceed!");
      setShowPopup(true);
      return;
    }
  
    if (!paymentMethod) {
      setPopupMessage("Please select a payment method!");
      setShowPopup(true);
      return;
    }
  
    setPaymentLoading(true);
    setPaymentSuccess(false);
  
    try {
      // Simulate the payment process (dummy success)
      const dummyPaymentSuccess = true;  // This simulates a successful payment, replace it with actual logic as needed
  
      if (dummyPaymentSuccess) {
        // If payment is successful, call the backend to delete cart items
        const response = await fetch("http://localhost:8080/api/get-farmer-product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,  // Pass the user ID to clear their cart
          }),
        });
  
        const responseData = await response.json();
        if (responseData.success) {
          setPaymentSuccess(true);
          setPopupMessage(`Payment of ${displayINRCurrency(totalPrice)} via ${paymentMethod} was successful!`);
          setShowPopup(true);
          setData([]); // Clear the cart items on the frontend
          context.fetchUserAddToCart(); // Fetch updated cart data
        } else {
          setPopupMessage("Error clearing cart: " + responseData.message);
          setShowPopup(true);
        }
      } else {
        setPopupMessage("Payment failed, please try again.");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setPopupMessage("Error during payment, please try again.");
      setShowPopup(true);
    } finally {
      setPaymentLoading(false);
    }
  };
  
  
  const closePopup = () => {
    setShowPopup(false);
    setPaymentMethod("");
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && <p className="bg-white py-5">No Data</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* Product List */}
        <div className="w-full max-w-3xl">
          {loading ? (
            loadingCart.map((_, index) => (
              <div
                key={`loading-${index}`}
                className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
              ></div>
            ))
          ) : (
            data.map((product) => (
              <div
                key={product?._id}
                className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
              >
                <div className="w-32 h-32 bg-slate-200">
                  <img
                    src={product?.productId?.productImage[0]}
                    className="w-full h-full object-scale-down mix-blend-multiply"
                    alt={product?.productId?.productName}
                  />
                </div>
                <div className="px-4 py-2 relative">
                  <div
                    className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-green-600 hover:text-white cursor-pointer"
                    onClick={() => deleteCartProduct(product?._id)}
                  >
                    <MdDelete />
                  </div>

                  <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                    {product?.productId?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">{product?.productId.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-red-600 font-medium text-lg">
                      {displayINRCurrency(product?.productId?.sellingPrice)}
                    </p>
                    <p className="text-slate-600 font-semibold text-lg">
                      {displayINRCurrency(
                        product?.productId?.sellingPrice * product?.quantity
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      className="border border-red-600 text-red-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                      onClick={() => decreaseQty(product?._id, product?.quantity)}
                    >
                      -
                    </button>
                    <span>{product?.quantity}</span>
                    <button
                      className="border border-red-600 text-red-600 hover:bg-green-600 hover:text-white w-6 h-6 flex justify-center items-center rounded"
                      onClick={() => increaseQty(product?._id, product?.quantity)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Section */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-16 bg-slate-200 border border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-auto bg-white">
              <h2 className="text-white bg-green-600 px-4 py-1">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Quantity</p>
                <p>{totalQty}</p>
              </div>

              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                <p>Total Price</p>
                <p>{displayINRCurrency(totalPrice)}</p>
              </div>
            

              {/* Payment Method Selection */}
              <div className="px-4 my-3">
                <h3 className="font-medium">Select Payment Method</h3>
                <div className="flex flex-col gap-2">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit Card"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      checked={paymentMethod === "Credit Card"}
                    />
                    Credit Card
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Debit Card"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      checked={paymentMethod === "Debit Card"}
                    />
                    Debit Card
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      checked={paymentMethod === "UPI"}
                    />
                    UPI
                  </label>
                </div>
              </div>

              <button
                className="bg-blue-600 p-2 text-white w-full mt-2"
                onClick={handlePayment}
                disabled={paymentLoading}
              >
                {paymentLoading ? "Processing..." : "Pay"}
              </button>

              {paymentSuccess && (
                <p className="text-green-600 text-center mt-2">Payment Successful!</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg text-center">
            <h2 className="text-lg font-bold">{popupMessage}</h2>
            <button
              className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;




