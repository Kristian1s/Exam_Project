class YearService{
    constructor(db){
        this.client = db.sequelize; 
        this.user = db.user;
        this.Year = db.Year
    }
    async getAll() {
        return this.Year.findAll({});
      }
    
      async create(year) {
        return this.Year.create({
            Year: year,
        });
      }
    
      async find(year) {
        return this.Year.findOne({
          where: {
            Year: year
          }
        });
      }
    }
    
module.exports = YearService;