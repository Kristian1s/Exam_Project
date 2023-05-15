module.exports = (sequelize, Sequelize) => {
    const Actor = sequelize.define('Actor', {
        Name: Sequelize.DataTypes.STRING,
    },{
        timestamps: false
    });
    Actor.associate = function(models) {
        Actor.belongsToMany(models.Movie , { through: 'MovieActor',timestamps: false} );
       
    };
    return Actor
}   
