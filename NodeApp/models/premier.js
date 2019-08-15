const mongoose = require('mongoose');

mongoose.connect("mongodb://CIS550:00000000a@ds159100.mlab.com:59100/soccer");

const Schema = mongoose.Schema;


const PremierSchema = new Schema({
  PremierName: String,
  teams: [{name:String, champions:Number}]
});


module.exports = mongoose.model('Premier', PremierSchema);

