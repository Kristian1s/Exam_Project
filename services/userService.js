class UserService{
    constructor(db){
        this.client = db.sequelize; 
        this.User = db.User;
    }
   
    
      async create(username, nickname, avatar, age, bio) {
        return this.User.create({
            UserName: username,
            Nickname: nickname,
            Avatar: avatar,
            Age: age,
            Bio: bio
        });
      }
    
      async find(username) {
        return this.User.findOne({
          where: {
            Username: username
          }
        });
      }

    }
    
module.exports = UserService;