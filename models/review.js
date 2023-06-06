module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define('Review', {
        ReviewText:  Sequelize.DataTypes.STRING,
        UserRating:  Sequelize.DataTypes.INTEGER
    },{
        timestamps: false
    });
    Review.associate = function(models) {
        Review.belongsTo(models.User);
        Review.belongsTo(models.Movie);
      
    };
    return Review
}   
