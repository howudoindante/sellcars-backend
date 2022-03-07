const jwt = require('jsonwebtoken');
const AdStatus = require('../../models/AdStatus');
const Advertisement = require('../../models/Advertisement');
const User = require('../../models/User');

class AdControlled {
  async getAdvertById(req, res) {
    try {
      const results = await Advertisement.findOne({_id:"6225d0a01db2c8194a560236"});
      return res.json({ ad: results });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Something did wrong' });
    }
  }
  async getAdvertByQuery(req, res) {
    try {
      const options = {
        price: {
          $gte: req.query.fromPrice || 0,
          $lte: req.query.toPrice || Infinity,
        },
        title: { $regex: req.query.title || /.*/ , $options: "i" },
        author:{ $regex: req.query.author || /.*/ , $options: "i" },
      };
      
      const results = await Advertisement.find(options).skip(req.query.skip || 0 ).limit(req.query.limit || Infinity);
      return res.json({ ad: results });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Something did wrong' });
    }
  }
  async createAdvert(req, res) {
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
      console.log('Created');
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'Something did wrong' });
    }
  }
}
module.exports = new AdControlled();
