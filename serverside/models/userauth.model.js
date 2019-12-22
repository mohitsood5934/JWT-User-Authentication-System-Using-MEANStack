var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

var loginSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    email:{
        type:String,
        required:true
    },
   password:{
        
        type:String,
        required:true

   }

});
var jwtUser = mongoose.model('jwtUser',loginSchema);
module.exports=jwtUser;
