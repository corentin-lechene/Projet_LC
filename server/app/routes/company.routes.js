module.exports = app => {
    const companies = require("../controllers/company.controller");
    var router = require("express").Router();
    router.post("/", companies.create);
    router.get("/:id", companies.findOne);
    app.use('/api/companies', router);
};