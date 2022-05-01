const mongoose = require('mongoose');
//TODO: Add car additional info like a engine type etc 
const AdvertisementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true , min:0  },
  description: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, ref: 'User' },
  status: {type:String, ref: "AdStatus"}
},{collection:"advertisement"});
const Advertisement = new mongoose.model("Advertisement",AdvertisementSchema);
module.exports = Advertisement;