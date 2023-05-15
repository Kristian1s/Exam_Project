module.exports = (sequelize, Sequelize) => {
    const Watchlist = sequelize.define('Watchlist', {
    },{
        timestamps: false
    });
    Watchlist.associate = function(models) {
        Watchlist.belongsTo(models.User);
        Watchlist.belongsTo(models.Movie);
      
    };
    return Watchlist
}   
