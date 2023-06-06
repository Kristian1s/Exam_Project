class UserService{
    constructor(db){
        this.client = db.sequelize; 
        this.User = db.User;
    }
   
    
      async create(username, nickname, avatar, age, bio) {
        return this.User.create({
            Username: username,
            Nickname: nickname,
            Avatar: avatar,
            Age: age,
            Bio: bio
        });
      }
      async update(username, nickname, avatar, age, bio) {
        return this.User.update(
          {
            Nickname: nickname,
            Avatar: avatar,
            Age: age,
            Bio: bio
        },
        {
          where: {
            Username: username
          }
        }
        );
      }
    
      async find(username) {
        return this.User.findOne({
          where: {
            Username: username
          }
        });
      }
      
      async deleteProfile(username){
        return this.User.destroy({
          where: {
            Username: username
          }
        })
      }

    }
    
module.exports = UserService;