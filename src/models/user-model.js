const { Schema, model, default: mongoose } = require("mongoose");
const usersSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
 fullname:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Fullname',
  required:true
 }
});

const fullnameSchema = new Schema ({
  fullname: {
    type: String,
    required:true,
    minlength:3,
    maxlength:200,
  },
  phone:{
    type:Number,
    required:true,
    minlength:9,
    maxlength:12

  }
});


usersSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.__v;
  delete obj._id;
  delete obj.password;
  return obj;
};

const Fullname = model('Fullname',fullnameSchema);
module.exports = Fullname;
module.exports.User= model("User", usersSchema);
