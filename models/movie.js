module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define('Movie', {
        Title: Sequelize.DataTypes.STRING,
        Plot: Sequelize.DataTypes.STRING,
        Runtime: Sequelize.DataTypes.INTEGER,
        Poster: Sequelize.DataTypes.STRING,
        Rating: Sequelize.DataTypes.FLOAT,
    },{
        timestamps: false
    });
    Movie.associate = function(models) {
       Movie.belongsTo(models.Director);
       Movie.belongsToMany(models.Actor, { through: 'MovieActor',timestamps: false} );
       Movie.belongsTo(models.Genre); 
       Movie.hasMany(models.Watchlist); 
    };
    return Movie
}   
