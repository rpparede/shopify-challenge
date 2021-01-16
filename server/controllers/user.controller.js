const db = require("../models");
//const User = db.user;
const Post = db.post;
//const Role = db.role;

exports.allAccess = (req, res) => {
    Post.findAll({
        raw: true
    })
        .then(posts => {
            /*posts.JSON();
            let userPosts = { "posts": [] }
            for (let i = 0; i < posts.length; i++) {
                userPosts["posts"].push(posts[i].dataValues);
            }*/
            console.log(typeof (posts))
            console.log(posts)
            res.status(200).send({ "posts": posts });
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

};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

const cloudinary = require('cloudinary')
const path = require("path");

exports.userPost = (req, res) => {

    console.log("STORE POST control")

    const image = req.files.picture
    const uploadPath = path.resolve("uploads/", image.name)
    image.mv(uploadPath, (error) => {
        if (error) {
            console.log("**ERROR  MOVING FILE TO PATH**")
            console.log(error)
        }
        cloudinary.v2.uploader.upload(uploadPath, (error, result) => {

            if (error) {
                console.log("**ERROR  POSTING TO CLOUDINARY**")
                console.log(error)
                return res.redirect('/')
            }
            console.log("*****")
            console.log(req.body)
            console.log(result.secure_url)
            Post.create({
                title: req.body.title,
                url: result.secure_url,
                userId: req.userId
            })
                .then(post => {

                    res.send(JSON.stringify(post));
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).send({ message: err.message });
                });

            //console.log("**ERROR STORING POST**")
            //console.log(result.secure_url)



        });

    })

    //res.status(200).send("Moderator Content.");
};

exports.deletePost = (req, res) => {
    Post.destroy({
        where: {
            id: req.params.postId
        }
    }).then(() => {
        res.status(200).send({});
    });

};