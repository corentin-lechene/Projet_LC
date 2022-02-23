module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
        mail: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        }

    });
    return Company;
};