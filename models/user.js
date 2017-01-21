var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/myblog');



var userSchema = new mongoose.Schema({
  user_id: {
      type: String,
      required: true
  },
  user_pwd: {
    type: String,
    required: true
  },
  // timestamps
  created_at: Date,
  updated_at: Date
});

userSchema.pre("save", function(next){
    var user = this;
    bcrypt.hash(this.user_pwd, 10, function(error, hash){
        if(error) return next(error);
        var newPassword = hash;
        user.user_pwd = newPassword;
        return next();
    })

    this.created_at = this.created_at || new Date();
    this.updated_at = new Date();
})

userSchema.statics.authentication = function(){
    return function(user_id, user_pwd, callback){
        User.findOne({user_id:user_id}).exec(function(error, user){
            if(error) return callback(error);
            if(!user){
                var error = new Error("User not found.");
                error.status = 401;
                return callback(error);
            }

            bcrypt.compare(user_pwd, user.user_pwd, function(error, result){
                if(error) return callback(error);
                if(result){
                    return callback(null, user);
                }
                else {
                    var error = new Error('username, password does not match.');
                    error.status =401;
                    return callback(error);
                }
            })
        })
    }
}


var User = mongoose.model("User", userSchema);

module.exports = User;
