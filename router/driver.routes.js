const { Router } = require("express");
const {
  register,
} = require("../controller/driver.ctr");


const DriverRouter = Router();


DriverRouter.post("/register", register);




module.exports = DriverRouter;
