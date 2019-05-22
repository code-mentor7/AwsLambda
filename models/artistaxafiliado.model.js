module.exports = (sequelize, Sequelize) => {
    const Artistaxafiliado = sequelize.define('artistaxafiliado', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        artistasId: {
            type: Sequelize.INTEGER,
        },
        afiliadoId: {
            type: Sequelize.INTEGER,
        },
    }, {
        timestamps: false
    });

    return Artistaxafiliado;
};
