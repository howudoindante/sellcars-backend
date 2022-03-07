const mongoose = require("mongoose");
const RoleSchema = new mongoose.Schema({
    name: {type:String,unique:true,default:"user"}
},{collection:"roles"});
const Role = new mongoose.model("Role",RoleSchema);
module.exports = Role;