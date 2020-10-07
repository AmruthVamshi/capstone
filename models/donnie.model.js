module.exports = (sequelize, Sequelize) => {
    const Donnie = sequelize.define('donnies', {
      username: {
        type: Sequelize.STRING,
        required:true
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        required:true
      },
      address:{
        type:Sequelize.TEXT
      }
    });
    return Donnie;
  }