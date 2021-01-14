const db = require("../models");
const User = db.user;
const Post = db.post;
const Role = db.role;

exports.allAccess = (req, res) => {
    Post.findAll({
    }).then(posts => {
        let userPosts = { "posts": [] }
        for (let i = 0; i < posts.length; i++) {
            userPosts["posts"].push(posts[i].dataValues);
        }
        res.status(200).send(userPosts);
    }
    );
    //res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    Post.findAll({
        where: {
            userId: req.userId
        }
    }).then(posts => {
        let userPosts = { "posts": [] }
        for (let i = 0; i < posts.length; i++) {
            userPosts["posts"].push(posts[i].dataValues);
        }
        res.status(200).send(userPosts);
    }
    );


    /*User.findOne({
        where: {
            id: req.userId
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var userPosts = { "posts": [] };
            user.getPosts().then(posts => {
                for (let i = 0; i < posts.length; i++) {
                    userPosts["posts"].push(posts[i].dataValues);
                }
                res.status(200).send(userPosts);
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });*/

};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};