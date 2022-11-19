const UserProfileModels = require("../models/UserProfileModels");
let jwt = require("jsonwebtoken");

exports.CreateProfile = (req, res) => {
  let reqBody = req.body;
  UserProfileModels.create(reqBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};

exports.UserLogin = (req, res) => {
  let reqBody = req.body;
  let UserName = req.body["UserName"];
  let PassWord = req.body["PassWord"];

  UserProfileModels.find(
    { UserName: UserName, PassWord: PassWord },
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "Fail", data: err });
      } else {
        if (data.length > 0) {
          //Create Auth Token
          let PayLoad = {
            exp: Math.floor(Date.now() / 1000) + 2 * 60 * 60,
            data: data[0],
          };
          let token = jwt.sign(PayLoad, "Admin6543");

          res
            .status(200)
            .json({ status: "Success", token: token, data: data[0] });
        } else {
          res.status(401).json({ status: "Unauthorized" });
        }
      }
    }
  );
};

exports.SelectProfile = (req, res) => {
  let UserName = req.headers["username"];

  UserProfileModels.find({ UserName: UserName }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};

exports.UpdateProfile = (req,res)=>{
  let UserName = req.headers['username'];
  let reqBody = req.body;

  UserProfileModels.updateOne({UserName:UserName},{$set:reqBody},{upsert:true},(err,data)=>{
      if(err){
          res.status(400).json({status:"Fail",data:err});
      }
      else {
          res.status(200).json({status:"Success",data:data});
      }
  });

};