'use strict';
const db = require('../config/db.config');
const Artistas = db.artistas;
const Afiliado = db.afiliado;

module.exports.findAll = async (event, context) => {

    let artistas = await Artistas.findAll({
        include: [{
            model: Afiliado,
            through: {
                attributes: []
            }
        }]
    }).map(el => el.get({ plain: true })).then(res => {
        return res;
    }).catch(err => console.log('error', err));

    return {
        statusCode: 200,
        body: JSON.stringify({
            data : artistas
        })
    };

};
