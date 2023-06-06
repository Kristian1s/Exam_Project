class WatchlistService{
    constructor(db){
        this.client = db.sequelize; 
        this.Watchlist = db.Watchlist;
        this.User = db.User;
        this.Movie = db.Movie;
    }
    async getAll() {
        return this.Watchlist.findAll({});
      }
    
      async create(movieId, userId) {
        return this.Watchlist.create({
            MovieId: movieId,
            UserId: userId
        });
      }
    
      async findWithUserId(userId) {
        return this.Watchlist.findAll({
          where: {
            UserId: userId
          },
          include: [
            {
            model: this.Movie
        },{
            model: this.User

        }
          ]
        });
      }


      async findWithMovieeId(movieId) {
        return this.Watchlist.findOne({
          where: {
            MovieId: movieId
          }
        });
      }

      async destroyWatchlist(userId) {
        return this.Watchlist.destroy({
          where: {
            UserId: userId
          }
        });
      }
    }
    
module.exports = WatchlistService;