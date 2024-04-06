const User = require("../models/userSchema.js");
const catchAsyncErrors = require("../middlewares/catchAsyncError.js");
const {ErrorHandler} = require("../middlewares/error.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone, role } = req.body;

    if (!name || !email || !phone || !req.body.password || !role) {
        return next(new ErrorHandler("Please fill all the required fields!!"));
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email already registered!"));
    }

    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt)

    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        role,
    });

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE});
    const {password, ...info} = user._doc;
    res.cookie("token", token).status(200).json("User Registered in Successfully")
});

const login = catchAsyncErrors(async (req, res, next) => {
    const { email, role } = req.body;
    if (!email || !req.body.password || !role) {
      return next(new ErrorHandler("Please provide email ,password and role."));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }

    const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
    }

    if (user.role !== role) {
      return next(
        new ErrorHandler(`User with provided email and ${role} not found!`, 404)
      );
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRE});
    const {password, ...info} = user._doc;
    res.cookie("token", token).status(200).json("User Logged in Successfully")
  });

const logout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie('token',{sameSite:"none", secure:true}).status(200).json("User Logged out Successfully")
});

const getUser = catchAsyncErrors((req, res, next) => {
    const user = req.user;
    const {password, ...info} = user._doc;
    res.status(200).json({
      success: true,
      info,
    });
  });

module.exports = {
    register,
    login,
    logout,
    getUser
}