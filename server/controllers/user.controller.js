const db = require("../models");
const User = db.user;
const Post = db.post;
//const Role = db.role;
const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: posts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, posts, totalPages, currentPage };
};
exports.allAccess = (req, res) => {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);
    Post.findAndCountAll({
        limit,
        offset,
        raw: true, include: { model: User, attributes: ['username', 'email'] }
    })
        .then(posts => {
            const response = getPagingData(posts, page, limit);
            console.log("*******")
            console.log(response)
            res.status(200).send(response);//({ "posts": posts });
        }
        ).catch(err => console.log(err));
    //res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    const { page, size } = req.query;
    console.log("REQ QUERY")
    console.log(req.query)
    const { limit, offset } = getPagination(page, size);
    Post.findAndCountAll({
        limit,
        offset,
        where: {
            userId: req.userId
        }
    }).then(posts => {
        /*let userPosts = { "posts": [] }
        for (let i = 0; i < posts.length; i++) {
            userPosts["posts"].push(posts[i].dataValues);
        }
        res.status(200).send(userPosts);*/
        console.log("woo")
        console.log(posts)
        const response = getPagingData(posts, page, limit);
        console.log("*******")
        console.log(response)
        res.status(200).send(response);//({ "posts": posts });
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
                userId: req.userId,
                price: parseInt(req.body.price)
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

exports.editPost = (req, res) => {
    Post.update(
        {
            title: req.body.title,
            price: req.body.price
        },
        { returning: true, where: { id: req.params.postId } }
    ).then(([rowsUpdate, [updatedPost]]) => {
        res.status(200).send(updatedPost);
    });

};