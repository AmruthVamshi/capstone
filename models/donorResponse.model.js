module.exports = (sequelize, Sequelize) => {
    const DonorResponse = sequelize.define('donor_responses', {
      itemName: {
        type: Sequelize.STRING,
        required:true
      },
      itemDescription: {
        type: Sequelize.TEXT,
        required:true
      },
      picture: {
        type: Sequelize.STRING
      }
    });
    return DonorResponse;
  }