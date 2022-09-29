const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const userRoute = require("./routes/user");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

//create new user
app.use("/api/singUp", userRoute);

// create new user part 2
// //forgot password
// app.use("/api/singUp/forgotPassword");

// //check code
// app.use("/api/singUp/checkCode");

// //new password
// app.use("/api/singUp/newPassword");

const port = process.env.PORT || 3000;

app.listen(port,async () => {
 try {
  mongoose
  .connect(
    "mongodb+srv://bek:bekzodbek01@cluster0.yyitjcn.mongodb.net/toplik-auth",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`connecting to authentication`);
  }).catch((error)=>{
    console.error(error);
    process.exit(1);
  })
  console.log('Connected...' + port);
 } catch (error) {
  console.error(error);
 }
});
