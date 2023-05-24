module.exports = (sequelize, Sequelize) => {
    const MovieActor = sequelize.define('MovieActor', {
    
    },{
        timestamps: false
    });
    MovieActor.associate = function(models) {
        MovieActor.belongsTo(models.Movie);
    };
	return MovieActor
}