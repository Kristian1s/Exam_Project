module.exports = (sequelize, Sequelize) => {
    const Director = sequelize.define('Director', {
        Name: Sequelize.DataTypes.STRING,
    },{
        timestamps: false
    });
    Director.associate = function(models) {
        Director.hasMany(models.Movie);
      
    };
    return Director
}   
