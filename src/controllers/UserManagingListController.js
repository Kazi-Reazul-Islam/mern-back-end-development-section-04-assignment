const UserManagingListModel = require("../models/UserManagingListModel");
const UserProfileModels = require("../models/UserProfileModels");

exports.CreateUserManagingList = (req, res) => {
    let Subject = req.body['Subject'];
    let Description = req.body['Description'];
    let UserName = req.headers["username"];

    let Status = "New";
    let CreateDate = Date.now();
    let UpdateDate = Date.now();

    let PostBody = {
        UserName:UserName,
        Subject:Subject,
        Description:Description,
        Status:Status,
        CreateDate:CreateDate,
        UpdateDate:UpdateDate
    }

    UserManagingListModel.create(PostBody, (err, data) => {
        if (err) {
            res.status(400).json({ status: "Fail", data: err });
        } else {
            res.status(200).json({ status: "Success", data: data });
        }
    });
};

exports.ReadUserManagingList = (req, res) => {
    let UserName = req.headers["username"];

    UserManagingListModel.find({ UserName: UserName }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "Fail", data: err });
        } else {
            res.status(200).json({ status: "Success", data: data });
        }
    });
};


exports.UpdateUserManagingList = (req,res)=>{
    let Subject = req.body['Subject'];
    let Description = req.body['Description'];
    let _id = req.body['_id'];
    let UpdateDate = Date.now();

    let PostBody = {
        Subject:Subject,
        Description:Description,
        _id:_id,
        UpdateDate:UpdateDate
    }

    UserManagingListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true},(err,data)=>{
        if (err) {
            res.status(400).json({ status: "Fail", data: err });
        } else {
            res.status(200).json({ status: "Success", data: data });
        }
    })
};

exports.DeleteUserManagingList = (req,res)=>{
    let _id = req.body['_id'];

    UserManagingListModel.remove({_id:_id},(err,data)=>{
        if (err) {
            res.status(400).json({ status: "Fail", data: err });
        } else {
            res.status(200).json({ status: "Success", data: data });
        }
    })
};

exports.UpdateUserManagingListStatus = (req,res)=>{
    let _id = req.body['_id'];
    let Status = req.body['Status']
    let UpdateDate = Date.now();

    let PostBody = {
        _id:_id,
        Status:Status,
        UpdateDate:UpdateDate
    }

    UserManagingListModel.updateOne({_id:_id},{$set:PostBody},{upsert:true},(err,data)=>{
        if (err) {
            res.status(400).json({ status: "Fail", data: err });
        } else {
            res.status(200).json({ status: "Success", data: data });
        }
    })
};

exports.SearchUserManagingListByStatus = (req, res) => {
    let UserName = req.headers["username"];
    let Status = req.body["Status"]

    UserManagingListModel.find({ UserName: UserName, Status:Status }, (err, data) => {
        if (err) {
            res.status(400).json({ status: "Fail", data: err });
        } else {
            res.status(200).json({ status: "Success", data: data });
        }
    });
};

exports.FilterUserManagingListByDate = (req,res)=>{
    let UserName = req.headers['username'];
    let FormDate = req.body['FormDate'];
    let ToDate = req.body['ToDate'];

    UserManagingListModel.find({UserName:UserName,CreateDate:{$gte:new Date(FormDate),$lte:new Date(ToDate)}},(err,data)=>{
        if(err){
            res.status(400).json({status:"Fail",data:err});
        }
        else {
            res.status(200).json({status:"Success",data:data});
        }
    });

};
