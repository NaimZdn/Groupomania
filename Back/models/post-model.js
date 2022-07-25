const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, trim: true, maxlenght: 300 },
    picture: { type: String },
    likes: {type: Number},
    usersLiked: { type: [String] },
    comments: {
        type: [
            {
                commenterId: String,
                commenterPseudo: String,
                text: String,
                timestamp: Number,

            },
        ],
        required: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post', postSchema); 