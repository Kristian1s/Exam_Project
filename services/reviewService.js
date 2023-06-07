const { Op } = require("sequelize");
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



      async  findRecentReviews() {
        return this.Review.findAll({
          where: {},
          order: [['id', 'DESC']],
          limit: 3,
          include:[
            {
            model: this.User
          },
          {
            model: this.Movie
          }
        ]
        });
      }

      async findHighReview() {
        return this.Review.findAll({
          where: {
            UserRating: {
              [Op.gt]: 7
            }
          },
          include: [
            {
              model: this.User
            },
            {
              model: this.Movie
            }
          ]
        });
      }
    }
    
    
module.exports = ReviewService;