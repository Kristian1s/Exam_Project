class MovieService{
    constructor(db){
        this.client = db.sequelize; 
        this.user = db.user;
        this.Movie = db.Movie;
        this.Actor = db.Actor;
        this.MovieActor = db.MovieActor;
    }
    async getAll() {
        return this.Movie.findAll({});
      }
    
      async create(Title, Plot, Runtime, Poster) {
        return this.Movie.create({
            Title: Title,
            Plot: Plot,
            Runtime: Runtime,
            Poster: Poster,
        });
      }
    
      async find(movie) {
        return this.Movie.findOne({
          where: {
            Title: movie
          },
          include: [
            {model: this.Actor,
            through: this.MovieActor}
          ]
        });
      }
    }
    
module.exports = MovieService;