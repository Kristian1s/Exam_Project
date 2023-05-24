const { Op } = require("sequelize");
class RatingService{
    constructor(db){
        this.client = db.sequelize; 
        this.user = db.user;
        this.Rating = db.Rating;
    }
    async getAll() {
        return this.Rating.findAll({});
      }
    
      async create(rating) {
        return this.Rating.create({
            Rating: rating,
        });
      }
    
      async find(rating) {
        return this.Rating.findOne({
          where: {
            Rating: rating
          }
        });
      }

      async findStartsWith(rating) {
        return this.Rating.findOne({
          where: {
            Rating: {
              [Op.startsWith]: rating.toString()
            }
          }
        });
      }
    }
    
module.exports = RatingService;