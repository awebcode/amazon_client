
import User from "../Model/UserModel.js";
import bcrypt from "bcrypt"
import sendToken from "../utils/getGwtToken.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from "cloudinary"
import { Product } from "../Model/ProductModel.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler"
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
 export const register = async(req,res,next) => {
   try {
    //  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
    //    folder:"asikur_avatars"
    //  })
         const { name, email, password } = req.body;
          const Exists = await User.findOne({ email })
          if (Exists) {
            return next(new ErrorHandler("User Exists", 401));
          }
         //const hashp=await bcrypt.hash(password,14)
         const user = await User.create({
           name,
           email,
           password,
            //  password:hashp,
          //    avatar: {
          //        public_id: myCloud.public_id,
          //        url:myCloud.secure_url
          //  }
         });
         sendToken(user,201,res)
    // return res.status(201).json({ msg: "User Created",user });
   } catch (error) {
     
     return next(new ErrorHandler(error.message,500));
     
    }
}
export const login = async (req, res,next) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
        //  return next(new ErrorHandler("Please Enter Email & Password", 400));
       
        return next(new ErrorHandler("Please Enter Email & Password", 500));
      }
      const user = await User.findOne({ email }).select("+password")
       if (!user) {
         return next(new ErrorHandler("User Not Found", 500));
       }
      // const hashp = await bcrypt.compare(password,user.password);
    
     const hashp = await user.comparePassword(password.toString());
    
      if (!hashp) {
        return next(new ErrorHandler("Incorrect Password", 500));
      }
       sendToken(user, 200, res);
    //  res.status(200).json({ msg: "User Login Successfully", user });
  } catch (error) {
   return next(new ErrorHandler(error.message, 500));
  }
};
export const userDetails = async (req, res, next) => {
  try {
   
    const user = await User.findById(req.user.id)
    if (!user) {
       return next(new ErrorHandler("User Not Found", 500));
    }
   
    sendToken(user, 200, res);
    //  res.status(200).json({ msg: "User Login Successfully", user });
  } catch (error) {
   return next(new ErrorHandler(error.message,500));
  }
};
// Logout User
export const logout =async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
};
export const allUsers = async (req, res, next) => {
  
  try {
    const userCount = await User.find().countDocuments();
    const users = await User.find().sort("-createdAt")
    res.status(200).json({ msg: `All Users:${userCount}`, users });
} catch (error) {
  return next(new ErrorHandler(error.message,500));
}
};
//update part
// update User Profile
export const updateProfile = async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };


  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
};
export const updateProfilePic = async (req, res, next) => {
  const newUserData = {};

  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "asikur_avatars",
    
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
};
//update ppassword
// update User password
export const updatePassword =async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
};
// Get single user (admin)
export const getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    user,
  });
};
// Delete User --Admin
export const deleteUser =async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400));
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
};
// update User Role -- Admin
export const updateUserRole =async (req, res, next) => {
  try {
    
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
      return next(new ErrorHandler(error.message,500));
  }
};
//
export const updateUser = asyncHandler(async (req, res) => {
  
  const { id: userId } = req.user;
  console.log(req.body)
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updateFields = {};

    if (req.body.name) {
      updateFields.name = req.body.name;
    }
    if (req.body.email) {
      updateFields.email = req.body.email;
    }
    if (req.body.password) {
      updateFields.password = await bcrypt.hash(req.body.password, 12);
    }
    if (req.body.phone) {
      updateFields.phone = req.body.phone;
    }
    if (req.body.avatar) {
      updateFields.avatar = req.body.avatar;
    }

    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateFields, {
      new: true,
    });

    res.status(200).json({ message: "User details updated successfully", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }

});
export const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `
    Hi, Please follow this link to reset your password. This link is valid for the next 10 minutes:
  <a href="${process.env.CLIENT_URL}/reset-password/${token}">Click Here</a>
`;

    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL,
    };
    sendEmail(data);
    res.status(200).json({ success: true, token, message: `Email sent to ${email}` });
  } catch (error) {
    console.log(error)
    throw new Error(error);
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { newpassword } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = newpassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json({ success: true, user, message: "Password Updated Successfully" });
});
