const sql = require('mssql');
const conn = require('../configs/DBConnection');

const routePool = new sql.ConnectionPool(conn);

let creatNewFunction = (data) =>{
    return new Promise( async(resolve, reject)=>{
        let newName = await checkfunctionName(data.code);
        let codeIsOk = await checkfunctionCode(data.code);
        if (!codeIsOk) {
            reject(`This function has erros in the code. Please rewrite it.`);
        } else {
            let functions = {
                name: newName,
                description: data.description,
                code: data.code,
                idUser: data.idUser,
                idCategory: data.idCategory
            };
            routePool.connect().then(pool =>{
                return pool.request()
                .query(`INSERT INTO functions values(\'${functions.name}\',\'${functions.description}\',\'${functions.code}\',\'${functions.idUser}\',\'${functions.idCategory}\')`)
            }).then(val =>{
                routePool.close();
                if(val.rowsAffected[0]> 0){
                    resolve("Function succesfully created");
                }else{
                    reject(false);
                }
            }).catch(err =>{
                reject(err);
            });
        }
            
        
    });
};

let checkfunctionName = (name) => {
    return new Promise((resolve, reject)=>{
        try {
            if(eval(`(${name}).name`).length === 0){
                let numero = Math.random() * (1000 - 1) + 1;
                let nameFunction = 'Funcion';
                name =  nameFunction.concat('',(Math.round(numero)).toString());
                resolve(name);
            }else{
                resolve(eval(`(${name}).name`));
            }
        } catch (error) {
            resolve(false);
        }
    });
};

let checkfunctionCode= (code) => {
    return new Promise((resolve, reject)=>{
        try {
            eval(`(${code})`);
            resolve(true);
           
        } catch (error) {
            resolve(false);
        }
    });
};






module.exports = {
    creatNewFunction : creatNewFunction
}