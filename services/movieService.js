class MovieService{
    constructor(db){
        this.client = db.sequelize; 
        this.user = db.user;
        this.Movie = db.Movie
    }
    async getAll() {
        return this.Movie.findAll({});
      }
    
      async create(Title, Plot, Runtime, Poster, Rating) {
        return this.Movie.create({
            Title: Title,
            Plot: Plot,
            Runtime: Runtime,
            Poster: Poster,
            Rating: Rating
        });
      }
    
      async find(movie) {
        return this.Movie.findOne({
          where: {
            Title: movie
          }
        });
      }
    }
    
module.exports = MovieService;