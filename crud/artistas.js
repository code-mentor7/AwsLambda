'use strict';

const mysql = require('serverless-mysql')({
    config: {
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE,
        port: process.env.RDS_PORT
    }
  })

const header =  {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}




module.exports.findAll = async (event, context) => {

  context.callbackWaitsForEmptyEventLoop = false;

  var perpage = event.queryStringParameters &&  mysql.escape(event.queryStringParameters.perpage) ? mysql.escape(event.queryStringParameters.perpage) : 10;
  var page = event.queryStringParameters && mysql.escape(event.queryStringParameters.page)? mysql.escape(event.queryStringParameters.page) : 1; 
 
  let totalArtist;
  let error;
  //  let cantidadRegistros = 
     await mysql.query("SELECT count(*) total FROM artistas" )     
    .then(function(rows){
      // Logs out a list of hobbits
      totalArtist = JSON.parse(JSON.stringify(rows))[0].total;
  }).catch(function(err) {   
    console.error(err);

    error = err.errno;
  })

  await mysql.end();

  if (error){
    return {
      statusCode: 500, 
      body: JSON.stringify(error      
        )
    };
  }


  let artistas;

  let query = "SELECT * FROM artistas ";
    query = query + " limit " + (page - 1) + ", " + perpage;

    

     await mysql.query(query)
     .then(function(rows){
      // Logs out a list of hobbits
      artistas =  JSON.parse(JSON.stringify(rows));
      //totalArtist = JSON.parse(JSON.stringify(rows))[0].total;
  }).catch(function(err) {   
    console.error(err);
    error = err.errno;
  
  
  })
;


    await mysql.end();

    return {
      statusCode: 200, 
      body: JSON.stringify({
        data : artistas, 
          pagination: {
              records_per_page: perpage,
              current_page: page,
              total_pages: Math.ceil(totalArtist / perpage),
              totalRows: totalArtist
                }
          }
        
        )
    };


  
   /*
    const sql = 'SELECT * FROM artistas ';


    const query = Util.promisify(connection.query).bind(connection);
    var artistas = await query(sql );
    

    for(let i = 0; i < artistas.length; i++)
    {
      if (artistas[i].idgenero){
        const query = Util.promisify(connection.query).bind(connection);
        artistas[i].genero = await query("select id, descripcion from genero where id =" + artistas[i].idGenero);
      }
    }
*/
  /*  return {
      statusCode: 200, 
      body: JSON.stringify(artistas)
    };*/

    
};




// Recupera un Registro. Pasa el dato, en el parametro.
module.exports.findOne = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    let query = "SELECT * FROM artistas WHERE id = ? ";
  
    let artista
     await mysql.query(query,[event.pathParameters.artista] )
     .then(function(rows){
      // Logs out a list of hobbits
      artista =  JSON.parse(JSON.stringify(rows));
      //totalArtist = JSON.parse(JSON.stringify(rows))[0].total;
  }).catch(function(err) {   
    console.error(err);
    error = err.errno;
  
  
  });
    await mysql.end();

    return {
      statusCode: 200, 
      body: JSON.stringify({
        data : artista    
          })
    };


  };

// Crea un Nuevo Registro.
module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  const body = JSON.parse(event['body'])
  console.log(body);
  const sql = 'INSERT INTO artistas SET username = ?, email = ?';
  
  connection.query(sql, [body.username, body.email], (error, result) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          res: `Todo insertado correctamente con id ${result.insertId}`
        })
      })
    }
  })
};
// Eliminacion de Usuario.
module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = 'DELETE FROM artistas WHERE id = ?';
  connection.query(sql, [event.pathParameters.usuario], (error, result) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          res: `Todo eliminado correctamente`
        })
      })
    }
  })
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const body = JSON.parse(event['body'])

 
  const sql = 'UPDATE usuarios1 SET username = ?, email = ? WHERE id = ?';
  connection.query(sql, [body.username, body.email, event.pathParameters.usuario], (error, result) => {
    if (error) {
      callback({
        statusCode: 500,
        body: JSON.stringify(error)
      })
    } else {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          res: `Todo actualizado correctamente`
        })
      })
    }
  })
};