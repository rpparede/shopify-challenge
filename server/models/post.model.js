module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        }
    });

    return Post;
};