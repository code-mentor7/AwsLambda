module.exports = (sequelize, Sequelize) => {
    const Afiliado = sequelize.define('afiliado', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombres: {
            type: Sequelize.STRING,
            allowNull: false
        },
        posicion: {
            type: Sequelize.STRING
        },
        afiliado: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefono: {
            type: Sequelize.STRING
        },
        paiseId: {
            type: Sequelize.INTEGER
        },
        afiliadocol: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return Afiliado;
};
