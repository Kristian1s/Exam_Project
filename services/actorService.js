class ActorService{
    constructor(db){
        this.client = db.sequelize; 
        this.user = db.user;
        this.Actor = db.Actor;
        this.MovieActor = db.MovieActor;
    }
    async getAll() {
        return this.Actor.findAll({

        });
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

      async insertMovieActor(actorId, movieId){
        return this.MovieActor.create({
          ActorId: actorId,
          MovieId: movieId
        })
      }

      async findInstance(movieId){
        return this.MovieActor.findOne({
          where: {
            MovieId: movieId
          }
        })
      }
    }
    
module.exports = ActorService;