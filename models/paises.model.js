module.exports = (sequelize, Sequelize) => {
    const Paises = sequelize.define('paises', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        iso: {
            type: Sequelize.STRING
        },
        nombre: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Paises;
};
