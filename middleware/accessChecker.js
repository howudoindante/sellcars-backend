const jwt = require("jsonwebtoken");

module.exports = function(acceptableTokenRole){
    return function (req,res,next) {
        try{
         const [type,token] = req.headers.authorization.split(" ");
         if(!token) return res.status(400).json({message:"You're not authorized"});
         const {role} = jwt.verify(token,process.env.SECRET_KEY);
     
         if(!role) return res.status(400).json({message:"Invalid token"});
         let isUserHaveRights = false;
         if(role===acceptableTokenRole){
             isUserHaveRights = true;
         }
         if(!isUserHaveRights) return res.status(403).json({message:"You're not have privilleges"});
         next();
        }
        catch(err){
             res.status(401).json({ message: "Not authorized" });
        }
     }
}