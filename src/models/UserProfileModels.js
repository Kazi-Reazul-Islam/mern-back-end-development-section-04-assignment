const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    FirstName: { type: String },
    LastName: { type: String },
    EmailAddress: { type: String },
    MobileNumber: { type: String, unique: true },
    Occupation: { type: String },
    City: { type: String },
    InternetSpeed:{type:String},
    UserName: { type: String, unique: true },
    PassWord: { type: String },
    OldPassWord:{type:String}
  },
  { versionKey: false }
);

const UserProfileModels = mongoose.model("profiles", DataSchema);

module.exports = UserProfileModels;
