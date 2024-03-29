const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true, 
        validate: {
            validator: function (v) {
                return /^[A-z0-9éèôöîïûùü' -/]{4,20}$/.test(v);
            },
        },},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    picture: { type: String },
    bio: { type: String, max: 300 },
    isAdmin:Boolean
    },
    {
        timestamps: true,
    });

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema); 