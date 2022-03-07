const mongoose = require('mongoose');
const AdStatusSchema = new mongoose.Schema({
    value:{type:String,unique:true,default:"Продается"}
},{collection:"adStatus"})
const AdStatus = new mongoose.model("AdStatus",AdStatusSchema);
module.exports = AdStatus;
