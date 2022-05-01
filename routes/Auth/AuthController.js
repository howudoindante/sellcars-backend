const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Role = require('../../models/Role');
const User = require('../../models/User');
class AuthController {
  
  async login(req, res) {
    // #swagger.description = 'Login'
    /* #swagger.responses[200] = {
        description: 'Returns token',
    } */
    try {
      const { username, password } = req.body;
      const account = await User.findOne({username});

      if(!account){
        return res.status(400).json({message:`We can't find account with this credentials`});
      }

      const comparePass = bcrypt.compareSync(password,account.password);
      if(!comparePass){
        return res.status(400).json({message:`Wrong password!!!!!!`});
      }
      const token = AuthController._tokenize({id:account._id,role:account.role});
      return res.status(200).json({token});
    } catch (err) {
        console.log(err);
    }
  }
  async register(req, res) {
    // #swagger.description = 'Register '
    const {username,password} = req.body;
    const existingAccount = await User.findOne({username});
    if(existingAccount){
      return res.status(400).json({message:`User with nickname ${username} already exists`});
    }
    const userRole = await Role.findOne({name:"user"});
    const hashPassword = bcrypt.hashSync(password,5);
    const newUser = new User({username,password:hashPassword,role:userRole.name});
    await newUser.save();
    return res.status(200).json({message:`Successfully registerd`});
  }
}
AuthController._tokenize = function (payload) {
    
    return jwt.sign(payload, process.env.SECRET_KEY);
}
module.exports = new AuthController();
