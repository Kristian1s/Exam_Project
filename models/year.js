module.exports = (sequelize, Sequelize) => {
    const Year = sequelize.define('Year', {
        Year: Sequelize.DataTypes.INTEGER
    },{
        timestamps: false
    });
    Year.associate = function(models) {
        Year.hasMany(models.Movie);
      
    };
    return Year
}   
