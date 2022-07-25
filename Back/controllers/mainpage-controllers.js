const Post = require('../models/post-model');
const User = require('../models/user-model');
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require('fs')


module.exports.readPost = (req, res) => {
    Post.find() 
        .then(Post => res.status(200).json(Post))
        .catch(error => res.status(400).json({ error }));
    };


module.exports.createPost = async (req, res) => {
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

module.exports.updatePost = (req, res) => {
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

module.exports.deletePost = (req, res) => {
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
            // Si l'utilisateur n'a pas encore aimé ou non une sauce
            if (postArg.usersLiked.indexOf(userId) == -1) {
                // Si l'utilisateur aime la sauce
                if (like === 1) {
                    postArg.usersLiked.push(userId);
                    postArg.likes += like;

                } else return res.status(400).json({ message: 'You cant Unlike twice' })
            }
            // Si l'utilisateur veut annuler son "like"
            if (postArg.usersLiked.indexOf(userId) != -1 && like == 0) {
                const likesIndex = postArg.usersLiked.findIndex(user => user === userId);
                postArg.usersLiked.splice(likesIndex, 1);
                postArg.likes -= 1;
            }

            postArg.save();
            res.status(201).json({ message: 'Like / Unlike updated' });
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