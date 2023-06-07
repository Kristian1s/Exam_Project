class GenreService{
    constructor(db){
        this.client = db.sequelize; 
        this.Movie = db.Movie;
        this.Genre = db.Genre;
        this.MovieGenre = db.MovieGenre;
    }
    async getAll() {
        return this.Genre.findAll({});
      }
    
      async create(genre) {
        return this.Genre.create({
            Name: genre,
        });
      }
    
      async find(genre) {
        return this.Genre.findOne({
          where: {
            Name: genre
          }
        });
      }
    
      async insertMovieGenre(genreId, movieId){
        return this.MovieGenre.create({
            GenreId: genreId,
            MovieId: movieId
          
        });
      }

      async findInstance(movieId){
        return this.MovieGenre.findOne({
          where: {
            MovieId: movieId
          }
        })
      }

      async findMoviesWithGenreId(genreId){
        return this.MovieGenre.findAll({
          where: {
            GenreId: genreId
          },
          include: [
            {
            model: this.Movie
          }
          ]
        })
      }

      async existingRelationship(genreId, movieId){
        return this.MovieGenre.findOne({
          where: {
            GenreId: genreId,
            MovieId: movieId
          }
        })
      }
    }
    
module.exports = GenreService;