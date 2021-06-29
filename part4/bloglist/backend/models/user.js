const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    min: 3,
  },
  name: String,
  passwordHash:{
    type: String,
    required: true,
  },
  blogs: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
  ]
});


userSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    // hashed password should not be revealed
    delete returnedObject.passwordHash;
  }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);