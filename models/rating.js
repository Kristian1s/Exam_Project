module.exports = (sequelize, Sequelize) => {
    const Rating = sequelize.define('Rating', {
        Rating: Sequelize.DataTypes.DECIMAL(10,1)
    },{
        timestamps: false
    });
    Rating.associate = function(models) {
        Rating.hasMany(models.Movie);
    };
    return Rating
}   
