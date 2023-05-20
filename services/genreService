class GenreService{
    constructor(db){
        this.client = db.sequelize; 
        this.user = db.user;
        this.Genre = db.Genre
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
    }
    
module.exports = GenreService;