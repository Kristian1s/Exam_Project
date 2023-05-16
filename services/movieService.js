class MovieService{
    constructor(db){
        this.client = db.sequelize; 
        this.user = db.user;
    }

    
}