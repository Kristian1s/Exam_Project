class DirectorService{
    constructor(db){
        this.client = db.sequelize; 
        this.user = db.user;
        this.Director = db.Director
    }
    async getAll() {
        return this.Director.findAll({});
      }
    
      async create(name) {
        return this.Director.create({
            Name: name,
        });
      }
    
      async find(name) {
        return this.Director.findOne({
          where: {
            Name: name
          }
        });
      }
    }
    
module.exports = DirectorService;