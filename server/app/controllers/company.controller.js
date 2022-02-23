const db = require("../models");
const Company = db.companies;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.mail) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a Company
    const company = {
        mail: req.body.mail,
        name: req.body.name,
        phone: req.body.phone
    };
    // Save Tutorial in the database
    Company.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Company.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};