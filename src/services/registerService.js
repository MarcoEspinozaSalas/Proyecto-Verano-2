const sql = require('mssql');
const conn = require('../configs/DBConnection');

const routePool = new sql.ConnectionPool(conn);
import bcrypt from "bcryptjs";
//Create new user
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        // check email is exist or not
        let isEmailExist = await checkExistEmail(data.email);
        if (isEmailExist) {
            reject(`This email "${data.email}" has already exist. Please choose an other email`);
        } else {
            // hash password
            let salt = bcrypt.genSaltSync(10);
            let userItem = {
                fullname: data.fullname,
                email: data.email,
                password: bcrypt.hashSync(data.password, salt),
            };

            //create a new account
            routePool.connect().then(pool => {
                return pool.request()
                .query(`INSERT INTO users values(\'${userItem.fullname}\',\'${userItem.email}\',\'${userItem.password}\')`)
              }).then(val => {
                routePool.close();
                if (val.rowsAffected[0] > 0) {
                    resolve("Create a new user successful");
                }else{
                    reject(false)
                }
              }).catch(err => {
                reject(err);
              });
        }
    });
};
//Verificar que el email no exista
let checkExistEmail = (email) => {
    return new Promise( (resolve, reject) => {
        try {
            routePool.connect().then(pool => {
                return pool.request()
                .query(`SELECT * FROM users WHERE email = '${email}'`)
              }).then(val => {
                routePool.close();
                if (val.recordset.length === 0) {
                    resolve(false)
                }else if (val.recordset.length !== 0){
                    resolve(true)
                }else{
                    resolve(false)
                }
              }).catch(err => {
                reject(err);
              });
        } catch (err) {
            reject(err);
        }
    });
};

//Export functions
module.exports = {
    createNewUser: createNewUser
};
