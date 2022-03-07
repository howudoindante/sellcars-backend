const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    role: { type: String, ref: 'Role' },
  },
  { collection: 'users' }
);
const User = new mongoose.model('User', UserSchema);
module.exports = User;
