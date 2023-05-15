module.exports = (sequelize, Sequelize) => {
    const Genre = sequelize.define('Genre', {
        Name: Sequelize.DataTypes.STRING,
    },{
        timestamps: false
    });
    Genre.associate = function(models) {
        Genre.hasMany(models.Movie);
      
    };
    return Genre
}   
