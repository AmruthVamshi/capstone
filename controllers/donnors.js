// Create and Save a new donnors
exports.create = (req, res) => {
    exports.create = (req, res) => {
        // Validate request
        if (!req.body.title) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
          return;
        }
      
        // Create a donnors
        const donnors = {
          title: req.body.title,
          description: req.body.description,
          published: req.body.published ? req.body.published : false
        };
      
        // Save donnors in the database
        donnors.create(donnors)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the donnors."
            });
          });
      };
  
};

// Retrieve all donnorss from the database.

    exports.findAll = (req, res) => {
        const title = req.query.title;
        var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
      
        donnors.findAll({ where: condition })
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving donnorss."
            });
          });
      };
  


// Find a single donnors with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    donnors.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving donnors with id=" + id
        });
      });
    
  
};

// Update a donnors by the id in the request
    exports.update = (req, res) => {
  const id = req.params.id;

  donnors.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "donnors was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update donnors with id=${id}. Maybe donnors was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating donnors with id=" + id
      });
    });
};
  


// Delete a donnors with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    donnors.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "donnors was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete donnors with id=${id}. Maybe donnors was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete donnors with id=" + id
        });
      });
  
};

// Delete all donnorss from the database.
exports.deleteAll = (req, res) => {
    donnors.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} donnorss were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all donnorss."
          });
        });
  
};

