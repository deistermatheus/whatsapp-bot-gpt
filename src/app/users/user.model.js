const UserSchema = require("./user.schema");

module.exports = (connection) => connection.model("user", UserSchema);
