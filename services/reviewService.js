class ReviewService{
    constructor(db){
        this.client = db.sequelize; 
        this.Review = db.Review;
        this.User = db.User;
        this.Movie = db.Movie;
    }
    async getAll() {
        return this.Review.findAll({});
      }
    
      async create(review, rating, movieId, userId) {
        return this.Review.create({
            ReviewText: review,
            UserRating: rating,
            MovieId: movieId,
            UserId: userId
        });
      }
    
      async findWithUserId(userId) {
        return this.Review.findAll({
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


      async findWithMovieId(movieId) {
        return this.Review.findOne({
          where: {
            MovieId: movieId
          },
          include:[
            {
                model: this.User
            }
          ]
        });
      }
      async destroyReviews(userId) {
        return this.Review.destroy({
            where: {
                UserId: userId
            }
        });
      }

    }
    
module.exports = ReviewService;