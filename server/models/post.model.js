module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("posts", {
        /*user_id: {
            type: Sequelize.INTEGER,
            foreignKey: true
        },*/
        title: {
            type: Sequelize.STRING
        },
        url: {
            type: Sequelize.STRING
        }
    });

    return Post;
};