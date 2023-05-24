class MovieService{
    constructor(db){
        this.client = db.sequelize; 
        this.user = db.user;
        this.Movie = db.Movie;
        this.Actor = db.Actor;
        this.MovieActor = db.MovieActor;
        this.Genre = db.Genre;
        this.MovieGenre = db.MovieGenre;
        
    }
    async getAll() {
        return this.Movie.findAll({
          where:{},
          include: [
            {
              model: this.Actor,
            through: this.MovieActor
          },{
              model: this.Genre,
            through: this.MovieGenre
          }
          ]
        });
      }
    
      async create(Title, Plot, Runtime, Poster, directorId, yearId, ratingId) {
        return this.Movie.create({
            Title: Title,
            Plot: Plot,
            Runtime: Runtime,
            Poster: Poster,
            DirectorId: directorId,
            YearId: yearId,
            RatingId: ratingId,

        });
      }
      async findOne(movie) {
        return this.Movie.findOne({
          where: {
            Title: movie
          }
        })
      }

      async find(movie) {
        return this.Movie.findOne({
          where: {
            Title: movie
          },
          include: [
            {model: this.Actor,
            through: this.MovieActor},

            {model: this.Genre,
            through: this.MovieGenre}
          ]
        });
      }


    }
    
module.exports = MovieService;