const sql = require('mssql');
const conn = require('../configs/DBConnection');

const routePool = new sql.ConnectionPool(conn);

let getUsers = () =>{
    return new Promise( async(resolve, reject)=>{
        routePool.connect().then(pool =>{
            return pool.request()
            .query(`SELECT * FROM users`)
        }).then(val =>{
            routePool.close();
            
            let listaUsers = [];
            for (const x in val.recordset) {
               //console.log(val.recordset[x].idCategory);
               listaUsers.push(val.recordset[x])
            }
            
            resolve(listaUsers)


        }).catch(err =>{
            reject(err);
        });

    });
};

let getfunctionsUsersByID = (idFunction) =>{
    return new Promise( async(resolve, reject)=>{
        routePool.connect().then(pool =>{
            return pool.request()
            .query(`SELECT * FROM functions WHERE idFunction = ${idFunction}`)
        }).then(val =>{
            routePool.close();
            
            let listaFunctions = [];
            for (const x in val.recordset) {
               listaFunctions.push(val.recordset[x])
            }
            
            resolve(listaFunctions)


        }).catch(err =>{
            reject(err);
        });

    });
};

let getfunctionsUsers = () =>{
    return new Promise( async(resolve, reject)=>{
        routePool.connect().then(pool =>{
            return pool.request()
            .query(`SELECT * FROM functions`)
        }).then(val =>{
            routePool.close();
            
            let listaFunctions = [];
            for (const x in val.recordset) {
               listaFunctions.push(val.recordset[x])
            }
            
            resolve(listaFunctions)


        }).catch(err =>{
            reject(err);
        });

    });
};

module.exports = {
    getUsers : getUsers,
    getfunctionsUsers: getfunctionsUsers,
    getfunctionsUsersByID: getfunctionsUsersByID
}