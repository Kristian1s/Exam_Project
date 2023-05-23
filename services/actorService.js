class ActorService{
    constructor(db){
        this.client = db.sequelize; 
        this.user = db.user;
        this.Actor = db.Actor;
    }
    async getAll() {
        return this.Actor.findAll({});
      }
    
      async create(name) {
        return this.Actor.create({
            Name: name,
        });
      }
    
      async find(name) {
        return this.Actor.findOne({
          where: {
            Name: name
          }
        });
      }
    }
    
module.exports = ActorService;