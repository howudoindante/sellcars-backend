const jwt = require('jsonwebtoken');
const AdStatus = require('../../models/AdStatus');
const Advertisement = require('../../models/Advertisement');
const User = require('../../models/User');

class AdControlled {
  async removeAdvertById(req, res) {
    // #swagger.description = 'Delete advert by id'
    
    try{
        await Advertisement.deleteOne({_id:req.params.id});
        return res.json({ message: "Succesfully updated!" });
    }
    catch(e){
      console.log(e);
      return res.status(400).json({ message: 'Something did wrong' });
    }
  }
  async updateAdvertById(req, res) {
    // #swagger.description = 'Update advert by id'
    try{
        const {title,description,image,price,status} = req.body;
        const options = {
          title,description,image,price
        }
        if (status) {
          const newStatus = await AdStatus.findOne({value:status});
          options["status"] = newStatus.value;
        };
        await Advertisement.updateOne({_id:req.params.id},{$set:options});
        return res.json({ message: "Succesfully updated!" });
    }
    catch(e){
      console.log(e);
      return res.status(400).json({ message: 'Something did wrong' });
    }
  }
  async getAdvertById(req, res) {
    // #swagger.description = 'Get advert by id'

    try {
      const advert = await Advertisement.findOne({ _id: req.params.id });
      
      if (!advert) res.status(404);
      if(req.headers.authorization){
        const [type, token] = req.headers.authorization.split(' ');
        if(!token) return res.json({ ad: advert });
        const {id} = jwt.verify(token,process.env.SECRET_KEY);
        if(!id) return res.json({ ad: advert });
        const tokenOwner = await User.findOne({_id:id});
        if(advert.author === tokenOwner.username){
          return res.json({ ad: advert , isowner:true });
        }
      }
      return res.json({ ad: advert });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Something did wrong' });
    }
  }
  async getAdvertByQuery(req, res) {
    // #swagger.description = 'Get advert by query'

    try {
      const options = {
        price: {
          $gte: req.query.fromPrice || 0,
          $lte: req.query.toPrice || Infinity,
        },
        title: { $regex: req.query.title || /.*/, $options: "i" },
        author: { $regex: req.query.author || /.*/, $options: "i" },
      };
      
      const results = await Advertisement.find(options).skip(req.query.skip || 0).limit(req.query.limit || Infinity);
      const resultsCount = await Advertisement.countDocuments(options);
      return res.json({ ad: results,count:resultsCount });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Something did wrong' });
    }
  }
  async createAdvert(req, res) {
    // #swagger.description = 'Create advert by id'

    try {
      const [type, token] = req.headers.authorization.split(' ');
      const { title, description, image, price } = req.body;
      if (!(title && description && image && price))
        return res
          .status(400)
          .json({ message: 'Some required fields is not recieved' });
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      const author = await User.findOne({ _id: id });
      const status = await AdStatus.findOne({ value: 'В продаже' });
      const advert = new Advertisement({
        title,
        description,
        image,
        author: author.username,
        price,
        status: status.value,
      });
      await advert.save();
      return res.status(200).json({ message: 'Success' });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Something did wrong' });
    }
  }
}
module.exports = new AdControlled();
