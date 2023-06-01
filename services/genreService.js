class GenreService{
    constructor(db){
        this.client = db.sequelize; 
        this.user = db.user;
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