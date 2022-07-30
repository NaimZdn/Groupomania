const Post = require('../models/post-model');
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs')

exports.readPost = (req, res) => {
    Post.find() 
        .then(Post => res.status(200).json(Post))
        .catch(error => res.status(400).json({ error }));
};

exports.getUsersPosts = (req, res) => {
    Post.find ({userId: req.params.id})
    .then(Post => res.status(200).json(Post))
    .catch(error => res.status(400).json({ error }));
};


exports.createPost = async (req, res) => {
    const newPost = new Post({
        userId: req.body.userId,
        message: req.body.message,
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likers: [],
        comments: [],
        likes: 0,

    });
    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err)
    };

};

exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    if (req.file) {
        Post.findOne({ _id: req.params.id })
            .then((PostArg) => {
                const filename = PostArg.picture.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) throw error;
                });
            })
            .catch(error => res.status(404).json({ error }));
    };

    const updatedRecord = {
        message: req.body.message,
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    };
    
    delete updatedRecord.userId
    Post.updateOne({ _id: req.params.id }, { ...updatedRecord, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Le post a bien été modifié' }))
        .catch(error => res.status(400).json({ error }));

};

exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

        Post.findOne({ _id: req.params.id })
            .then((PostArg) => {
                const filename = PostArg.picture.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    PostArg.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Le post a bien été supprimé ' }))
                    .catch(error => res.status(400).json({ error }));
                });
            })
            .catch(error => res.status(404).json({ error }));

};

exports.likePost = (req, res) => {
    const { like, userId } = req.body
    let postId = req.params.id

    Post.findOne({ _id: postId })
        .then(postArg => {
            if (!postArg.usersLiked.includes(userId) && like === 1 ) {           
                Post.updateOne({_id : req.params.id},
                    {
                        $inc: {likes: 1},
                        $push: {usersLiked: userId}
                    })
                    .then (() => res.status(201).json({message : 'Le post a bien été liké '}))
                    .catch(error => res.status(400).json({ error }));
            } else if (like >= 1 ) {
                res.status(400).json({ error : "Vous ne pouvez pas liké plusieurs fois un même post" }) 
            }

            if (postArg.usersLiked.includes(userId) && like === 0 ) {
                
                Post.updateOne({_id : req.params.id},
                    {
                        $inc: {likes: -1},
                        $pull: {usersLiked: userId}
                    })
                    .then (() => res.status(201).json({message : 'Votre like a bien été retiré '}))
                    .catch(error => res.status(400).json({ error }));
            } else if (like <= 0 ) {
                res.status(400).json({ error : "Vous ne pouvez pas liké plusieurs fois un même post" }) 
            }

        })
        .catch(error => res.status(500).json({ error }));
};

exports.addComment = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return Post.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenter: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err)
            }
        );

    } catch (err) {
        return res.status(400).send(err);

    };
};


exports.editComment = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return Post.findById(req.params.id, (err, docs) => {
            const theComment = docs.comments.find((comment) =>
                comment._id.equals(req.body.commentId)
            );

            if (!theComment) return res.status(404).send("Comment not found");
            theComment.text = req.body.text;

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs);
                return res.status(500).send(err);
            });
        });
    } catch (err) {
        return res.status(400).send(err);
    }
};

exports.deleteComment = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return Post.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err)
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
}; 