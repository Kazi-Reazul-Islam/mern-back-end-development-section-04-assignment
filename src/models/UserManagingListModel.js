const mongoose = require('mongoose');
const DataSchema = mongoose.Schema({

    UserName:{type:String},
    Subject:{type:String},
    Description:{type:String},
    Status:{type:String,default:"New"},
    CreateDate:{type:Date,default: Date.now},
    UpdateDate:{type:Date}

},{versionKey:false})

const UserManagingListModel = mongoose.model("user-managing-lists",DataSchema);

module.exports = UserManagingListModel;