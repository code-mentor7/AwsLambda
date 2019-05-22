module.exports = (sequelize, Sequelize) => {
    const Artistas = sequelize.define('artistas', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_chartmetrics: {
            type: Sequelize.INTEGER,
        },
        nombres: {
            type: Sequelize.STRING
        },
        idSpotify: {
            type: Sequelize.STRING
        },
        instagram: {
            type: Sequelize.STRING
        },
        facebook: {
            type: Sequelize.STRING
        },
        label: {
            type: Sequelize.STRING
        },
        canalYoutube: {
            type: Sequelize.STRING
        },
        paiseId: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });

    return Artistas;
};
