module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define('Review', {
        ReviewText:  Sequelize.DataTypes.STRING,
        UserRating:  Sequelize.DataTypes.DECIMAL(10,1)
    },{
        timestamps: false
    });
    Review.associate = function(models) {
        Review.belongsTo(models.User);
        Review.belongsTo(models.Movie);
      
    };
    return Review
}   
