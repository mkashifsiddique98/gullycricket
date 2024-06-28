// * Importing to handle the errors
import asyncHandler from "express-async-handler";
// * Importing Model File
import User from "../models/userModel.js";
// * Importing file that contain JWT Token
import generateToken from "../utils/generateToken.js";

// !========================= (1) ======================================
// * @desc   Auth User & get Token
// * @route  POST /api/users/login
// * @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, id } = req.body;

  const user = await User.findById({ _id: id });
  console.log(user);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!(await user.matchPassword(currentPassword))) {
    res.json({ status: false, message: "Incorrect Old Password!" });
  }

  // Update the user's password and save the changes
  user.password = newPassword;
  await user.save();
  res.json({ status: true, message: "Password changed successfully" });
});

// !=========================================================
// * @desc   Get User Profile
// * @route  GET /api/users/profile
// * @access Private
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = req.user;

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       coins: user.coins,
//       city: user.city,
//       address: user.address,
//       phoneNumber: user.phoneNumber,
//       qualification: user.qualification,
//       profilePicture: user.profilePicture,
//     });
//   } else {
//     res.status(401);
//     throw new Error("User Not Found");
//   }
// });

//! =====================================================================

//*     @desc     Register a new User
// *    @route   POST /api/users/register
// *    @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//! =====================================================================
//*     @desc     Update user profile
// *    @ route   PUT /api/users/profile
// *    @access   Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   const user = req.user;

//   if (user) {
//     user.name = name || user.name;
//     user.email = email || user.email;
//     if (req.body.password) {
//       user.password = password;
//     }
//     user.city = city;
//     user.address = address;
//     user.phoneNumber = phoneNumber;
//     user.qualification = qualification;
//     user.profilePicture = profilePicture;
//     user.coins = coins;

//     if (
//       name &&
//       email &&
//       city &&
//       address &&
//       phoneNumber &&
//       qualification &&
//       profilePicture
//     ) {
//       user.isProfileCompleted = true;
//       user.updateProfileCount = 1 + user.updateProfileCount;
//       // * Updating Points
//       if (user.updateProfileCount > 1) {
//         user.coins = user.coins;
//       } else {
//         user.coins = user.coins + 500;
//       }
//     }

//     const updatedUser = await user.save();
//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id),
//       coins: updatedUser.coins,
//       city: updatedUser.city,
//       address: updatedUser.address,
//       phoneNumber: updatedUser.phoneNumber,
//       qualification: updatedUser.qualification,
//       profilePicture: updatedUser.profilePicture,
//       updateProfileCount: updatedUser.updateProfileCount,
//       isProfileCompleted: updatedUser.isProfileCompleted,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

//! =====================================================================
//* @desc     Get all users
//* @ route   GET /api/users
//* @access   Private/Admin
// const getUsers = asyncHandler(async (req, res) => {
//   const users = await User.find({});
//   res.json(users);
// });

//! =====================================================================
//* @desc     Delete user
//* @ route   DELETE /api/users/:id
//* @access   Private/Admin
// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);
//   if (user) {
//     await user.remove();
//     res.json({ message: "User Removed" });
//   } else {
//     res.status(404);
//     throw new Error("User not Found");
//   }
// });

//! =====================================================================
//* @desc     Get user by ID
//* @ route   GET /api/users/:id
//* @access   Private/Admin
// const getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select("-password");
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404);
//     throw new Error("User not Found");
//   }
// });

//! =====================================================================
//* @desc     Update User
//* @ route   PUT /api/users/:id
//* @access   Private/Admin
// const updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     // user.isAdmin = req.body.isAdmin || user.isAdmin

//     const updatedUser = await user.save();
//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

export { authUser, registerUser, changePassword };
