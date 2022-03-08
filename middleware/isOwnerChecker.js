const jwt = require("jsonwebtoken");
const Advertisement = require("../models/Advertisement");
const User = require("../models/User");
module.exports = async function(req,res,next){
    try{
        const advert = await Advertisement.findOne({ _id: req.params.id });
        const [type, token] = req.headers.authorization.split(' ');
        if(!token) return res.status(400).json({message:"You're not authorized"});
        const {id} = jwt.verify(token,process.env.SECRET_KEY);
        if(!id) return res.status(400).json({message:"Invalid token"});
        const tokenOwner = await User.findOne({_id:id});
        if(advert.author === tokenOwner.username) next();
        else {
            return res.status(400).json({message:"You're have no rights to make this action"});
        }
    }
    catch(e){
        console.log(e);
        res.status(401).json({ message: "Something did wrong" });

    }
}