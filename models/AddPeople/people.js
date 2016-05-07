var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var people = new Schema({
	name: String,
	surname: String,
	birth: Date,
	sex: String,
	emails: Schema.Types.Mixed,
	user: {username: String, password: String, last_access: Date}, //Schema.Types.Mixed,
	nacionalities: Schema.Types.Mixed,
	introduction: String,
	description: String,
	marital_status: String,
	status: String,
	active: Boolean
});

module.exports =  mongoose.model("people",people);