const { User, Fullname } = require("../models/user-model");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { validate, validateFullname } = require("../validators/user-validator");
const hashPassword = require("../hash/hash");
const validatePassword = require("../validators/password-validator");
router.post("/", async (req, res) => {
  try {
    const { err } = validate(req.body);
    const { error } = validatePassword(req.body.password);
    if (err) {
      return res.status(400).send("Invalid username or password");
    }
    if (error) {
      return res.status(400).send("Invalid username or password");
    }
    let user = await User.find({
      username: req.body.username,
      email: req.body.email,
    });
    if (user > 0) {
      return res.status(400).send({ message: "User already exist" });
    } else {
      user = new User(_.pick(req.body, ["username", "email", "password"]));
      user.password = hashPassword(user.password);
      await user.save();
      return res.status(201).send("User almost created successfully");
    }
  } catch (error) {
    error.statusCode = 404;
    console.error(error);
  };
});
// router.post("/repassword", async (req, res) => {
//   try {
//     const { error } = validateFullname(req.body);
//     if (error) {
//       return res.status(400).send("Invalid fullname or phone");
//     }
//     let newData = await Fullname.find({phone:req.body.phone});
//     if (newData > 0) {
//       return res.status(400).send({ message: "This phone already exist" });
//     }
//     // const {name, email, password} = await User.find();
//     // const {err} = validate({name, email, password});
//     // if(err){
//     //   return res.status(400).send({ message: "This phone already exist" });
//     // }
//     newData = new Fullname(_.pick(req.body, ["fullname", "phone"]));
//     await newData.save();
//     return res.status(201).send("User  created successfully");
//   } catch (error) {
//     error.statusCode = 404;
//     console.error(error);
//   }
// });

module.exports = router;
