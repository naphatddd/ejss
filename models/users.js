const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true, trim: true, minlength: 3 },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const user = mongoose.model("User", schema);
module.exports = user;

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });

  module.exports.getUserById = async (id, callback) => {
    await user.findById(id, callback);
  };
  module.exports.getUserByName = async (name, callback) => {
    const query = {
      name: name,
    };
    await user.findOne(query, callback);
  };
};
