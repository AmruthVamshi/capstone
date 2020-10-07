const { Donor } = require('../models');
// Retrieve all Donors from the database.

    exports.findAll = (req, res) => {
      
      const username = req.query.username;
      var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;
    
      Donor.findAll({ where: condition })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Donors."
          });
        });
    };
  


// Find a single Donor with an id
exports.findOne = (req, res) => {

    const id = req.user.id;
    Donor.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Donor with id=" + id
        });
      });
    
};

// Update a Donor by the id in the request
  exports.update = (req, res) => {
    const id = req.user.id;
    Donor.update(req.body, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Donor was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Donor with id=${id}. Maybe Donor was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Donor with id=" + id
      });
    });
};
  


// Delete a Donor with the specified id in the request
exports.delete = (req, res) => {
    const id = req.user.id;

    Donor.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Donor was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Donor with id=${id}. Maybe Donor was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Donor with id=" + id
        });
      });
  
};

// Delete all Donors from the database.
exports.deleteAll = (req, res) => {
    Donor.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Donors were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Donors."
          });
        });
  
};

