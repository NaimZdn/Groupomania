const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    message: { type: String, trim: true, maxLength: 300, minLength: 2 },
    picture: { type: String },
    likes: {type: Number},
    usersLiked: { type: [String] },
    comments: [  
        {
            type: new mongoose.Schema(
                {
                    userId: String,
                    pseudo: String,
                    comment: String,

                }, 
                {timestamps: true}
            ),
            required: true 
        }
    ]
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post', postSchema); 