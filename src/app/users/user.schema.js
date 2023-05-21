const { mongooseDriver } = require("../../drivers/database/mongodb");
const { Schema } = mongooseDriver;

const UserSchema = new Schema({
  phone: String,
  isAdmin: Boolean,
});

module.exports = UserSchema;
