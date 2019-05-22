const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.RDS_DATABASE,
    process.env.RDS_USERNAME,
    process.env.RDS_PASSWORD,
    {
        host: process.env.RDS_HOSTNAME,
        dialect: 'mysql',
        operatorsAliases: false
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.artistas = require('../models/artistas.model')(sequelize, Sequelize);
db.paises = require('../models/paises.model')(sequelize, Sequelize);
db.afiliado = require('../models/afiliado.model')(sequelize, Sequelize);
db.artistaxafiliado = require('../models/artistaxafiliado.model')(sequelize, Sequelize);

//Join Related tables with foreignKey
db.artistas.belongsTo(db.paises, {as: 'pais', foreignKey: 'paiseId' });
db.artistas.belongsToMany(db.afiliado, {through: db.artistaxafiliado, foreignKey: 'artistasId', otherKey: 'afiliadoId'});
db.afiliado.belongsToMany(db.artistas, {through: db.artistaxafiliado, foreignKey: 'afiliadoId', otherKey: 'artistasId'});

db.sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0', null, {raw: true})
    .then(function(results) {
        db.sequelize.sync().then(() =>{
            console.log('Drop and Resync with { force: false }');
        });
    });

module.exports = db;
