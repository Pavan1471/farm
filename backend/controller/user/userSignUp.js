const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');


// async function userSignUpController(req,res){
//     try{
//         const { email, password, name,location} = req.body

//         const user = await userModel.findOne({email})

//         console.log("user",user)

//         if(user){
//             throw new Error("Already user exits.")
//         }

//         if(!email){
//            throw new Error("Please provide email")
//         }
//         if(!password){
//             throw new Error("Please provide password")
//         }
//         if(!name){
//             throw new Error("Please provide name")
//         }
//         if(!location){
//             throw new Error("Please provide location")
//         }

//         const salt = bcrypt.genSaltSync(10);
//         const hashPassword = await bcrypt.hashSync(password, salt);

//         if(!hashPassword){
//             throw new Error("Something is wrong")
//         }

//         const payload = {
//             ...req.body,
//             role : "GENERAL",
//             password : hashPassword
//         }

//         const userData = new userModel(payload)
//         const saveUser = await userData.save()

//         res.status(201).json({
//             data : saveUser,
//             success : true,
//             error : false,
//             message : "User created Successfully!"
//         })


//     }catch(err){
//         res.json({
//             message : err.message || err  ,
//             error : true,
//             success : false,
//         })
//     }
// }


async function userSignUpController(req, res) {
    try {
      const { email, password, name, location, role } = req.body;
  
      const user = await userModel.findOne({ email });
  
      if (user) {
        throw new Error("User already exists.");
      }
  
      if (!email || !password || !name || !location || !role) {
        throw new Error("All fields are required.");
      }
  
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      const payload = {
        email,
        password: hashPassword,
        name,
        location,
        role, // Save the selected role
      };
  
      const newUser = new userModel(payload);
      const saveUser = await newUser.save();
  
      res.status(201).json({
        data: saveUser,
        success: true,
        error: false,
        message: "User created successfully!",
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || "Something went wrong",
        error: true,
        success: false,
      });
    }
  }
  

module.exports = userSignUpController