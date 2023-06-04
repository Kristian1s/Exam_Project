module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        Nickname: Sequelize.DataTypes.STRING,
        Avatar: Sequelize.DataTypes.STRING,
        Age : Sequelize.DataTypes.INTEGER,
        Bio : Sequelize.DataTypes.STRING,
    },{
        timestamps: false
    });
    User.associate = function(models) {
        User.hasOne(models.Watchlist);
        User.hasMany(models.Review);
    };
    return User
}   
