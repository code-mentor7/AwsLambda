'use strict';
const db = require('../config/db.config');
const Artistas = db.artistas;
const Afiliado = db.afiliado;
const Paises = db.paises;

module.exports.findAll = async (event, context) => {

    let artistas = await Artistas.findAll({
        attributes: {
            exclude: ['paiseId']
        },
        include: [
            {
                model: Afiliado,
                through: {
                    attributes: []
                },
            },
            {
                model: Paises,
                as: 'pais'
            }
        ]
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
