module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define('Movie', {
        Title: Sequelize.DataTypes.STRING,
        Plot: Sequelize.DataTypes.STRING,
        Runtime: Sequelize.DataTypes.INTEGER,
        Poster: Sequelize.DataTypes.STRING,
    },{
        timestamps: false
    });
    Movie.associate = function(models) {
       Movie.belongsTo(models.Director);
       Movie.belongsToMany(models.Actor, { through: 'MovieActor',timestamps: false} );
       Movie.belongsToMany(models.Genre,{ through: 'MovieGenre',timestamps: false} );
       Movie.hasMany(models.Watchlist);
       Movie.belongsTo(models.Year);
       Movie.belongsTo(models.Rating);
    };
    return Movie
}   
