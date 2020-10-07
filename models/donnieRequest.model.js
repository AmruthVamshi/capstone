module.exports = (sequelize, Sequelize) => {
    const DonnieRequest = sequelize.define('donnie_requests', {
      requestDescription: {
        type: Sequelize.TEXT,
        required:true
      },
      childDescription: {
        type: Sequelize.TEXT
      },
      schoolName: {
        type: Sequelize.STRING,
        required:true
      },
      schoolLocation: {
        type: Sequelize.TEXT,
        required:true
      },
      picture:{
        type:Sequelize.STRING
      }
    });
    return DonnieRequest;
}