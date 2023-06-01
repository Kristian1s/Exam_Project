class MovieService{
    constructor(db){
        this.client = db.sequelize; 
        this.user = db.user;
        this.Movie = db.Movie;
        this.Actor = db.Actor;
        this.MovieActor = db.MovieActor;
        this.Genre = db.Genre;
        this.MovieGenre = db.MovieGenre;
        this.Director = db.Director;
        this.Year = db.Year;
        this.Rating =db.Rating;
    }
    async getAll() {
        return this.Movie.findAll({
          where:{},
          include: [
            {
              model: this.Year
            },{
              model: this.Actor,
            through: this.MovieActor
          },{
              model: this.Genre,
            through: this.MovieGenre
          },{
            model: this.Director,
          },{
            model: this.Rating
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
            {
              model: this.Year
            },{
              model: this.Actor,
            through: this.MovieActor
          },{
              model: this.Genre,
            through: this.MovieGenre
          },{
            model: this.Director,
          },{
            model: this.Rating
          }
          ]
        });
      }


    }
    
module.exports = MovieService;