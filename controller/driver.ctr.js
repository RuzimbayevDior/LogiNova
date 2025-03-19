const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const DriverSchema = require("../Schema/deliver.schema");
require("dotenv").config();
const {
  generatAccessToken,
  generateRefreshToken,
} = require("../utils/generate");
const BaseError = require("../utils/error");

const register = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      surname,
      birth_day,
      passport,
      phone,
      driver_license,
      experience,
      password,
      ownership_document,
      car_name,
      car_type,
      car_weight,
      car_capacity,
    } = req.body;
    const findDriver = await DriverSchema.findOne({ phone });

    if (findDriver) {
      throw BaseError.BadRequest("Bu haydovchi avval ro`yxatdan o`tgan");
    }

    const hash = await bcrypt.hash(password, 12);

    const Driver = await DriverSchema.create({
      first_name,
      last_name,
      surname,
      birth_day,
      passport,
      phone,
      driver_license,
      experience,
      password:hash,
      ownership_document,
      car_name,
      car_type,
      car_weight,
      car_capacity,  
      });

    res.json({
      message: "Registered",
    });
  } catch (error) {
    next(error);
  }
};




const login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    const findUser = await DriverSchema.findOne({ phone });

    if (!findUser) {
      throw BaseError.BadRequest("Bunday foydalanuvchi mavjud emas!");
    }

    const checkerPassword = await bcrypt.compare(password, findUser.password);

    if (!checkerPassword) {
      throw BaseError.BadRequest("invalid password");
    }

    if (findUser.is_verify == true) {
      const accesstoken = await generatAccessToken({
        phone: findUser.phone,
        id: findUser._id,
      });
      const refreshtoken = await generateRefreshToken({
        phone: findUser.phone,
        id: findUser._id,

      });

      res.cookie("accesstoken", accesstoken, {
        httpOnly: true,
        maxAge: process.env.COOKIE_ACCESS,
      });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        maxAge: process.env.COOKIE_REFRESH,
      });

      return res.json({
        message: "Successfully",
        token: {
          accesstoken,
        },
      });
    } else {
      throw BaseError.BadRequest("Siz verificatsiyadan o`tmagansiz");
    }
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");

    res.json({
      message: "Successfully logged out",
    });
  } catch (error) {
    throw BaseError.BadRequest("There is an Error");
  }
};

const profil = async (req, res, next) => {
  try {
    const { id } = req.body;
    const driver = await DriverSchema.findOne({ _id: id });

    if (!user) {
      throw BaseError.BadRequest("Bunday haydovchi mavjud emas!");
    }
    res.json({ driver });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  profil,
};
