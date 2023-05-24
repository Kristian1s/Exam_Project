module.exports = (sequelize, Sequelize) => {
    const MovieGenre = sequelize.define('MovieGenre', {
    
    },{
        timestamps: false
    });
    MovieGenre.associate = function(models) {
        MovieGenre.belongsTo(models.Movie);
    };
	return MovieGenre
}