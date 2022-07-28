const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true, 
        validate: {
            validator: function (v) {
                return /^[A-z0-9éèôöîïûùü' -/]{2,20}$/.test(v);
            },
        },},
    email: { type: String, required: true, unique: true, 
        validate: {
            validator: function(v) {
                return /^[a-z0-9.-_]+[@]{1}[a-z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(v);
            },
        } },
    password: { type: String, required: true },
    picture: { type: String },
    bio: { type: String, max: 500 },

});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); 