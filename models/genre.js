module.exports = (sequelize, Sequelize) => {
    const Genre = sequelize.define('Genre', {
        Name: Sequelize.DataTypes.STRING,
    },{
        timestamps: false
    });
    Genre.associate = function(models) {
        Genre.belongsToMany(models.Movie, { through: 'MovieGenre',timestamps: false} );
      
    };
    return Genre
}   
