module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
    },{
        timestamps: false
    });
    User.associate = function(models) {
        User.hasOne(models.Watchlist);
      
    };
    return User
}   
