const sql = require('mssql');
const conn = require('../configs/DBConnection');

const routePool = new sql.ConnectionPool(conn);

//Create new category
let creatNewCategory = (data) =>{
        return new Promise( async(resolve, reject)=>{
            let categoryExist = await checkCategoryExist(data.nameCategory);
            if(categoryExist){
                reject(`This category "${data.nameCategory}" has already exist. Please choose an other name.`);
            }else{

                let category = {
                    nameCategory: data.nameCategory
                };

                routePool.connect().then(pool =>{
                    return pool.request()
                    .query(`INSERT INTO category values(\'${category.nameCategory}\')`)
                }).then(val =>{
                    routePool.close();
                    if(val.rowsAffected[0]> 0){
                        resolve("Category succesfully created");
                    }else{
                        reject(false)
                    }
                }).catch(err =>{
                    reject(err);
                });
            }
        });
};
//Verificar si existe la categoria
let checkCategoryExist = (nameCategory) => {
    return new Promise((resolve, reject)=>{
        try {
            routePool.connect().then(pool=> {
                return pool.request()
                .query(`SELECT * FROM category WHERE nameCategory = '${nameCategory}'`)
            }).then(val =>{
                routePool.close();
                if(val.recordset.length ===0){
                    resolve(false);
                }else if(val.recordset.length !==0){
                    resolve(true);
                }else{
                    resolve(false);
                }
            }).catch(err =>{
                reject(err);
            });
        } catch (error) {
            reject(error);
        }
    });
};
//Extraer la categoría
let extractCategories = ()=>{
    return new Promise((resolve,reject)=>{
        try {
            routePool.connect().then(pool=>{
               return pool.request()
                .query(`Select * FROM category`)
            }).then(val=>{
                routePool.close();
                let listaCategorias = [];
                for (const x in val.recordset) {
                   //console.log(val.recordset[x].nameCategory);
                   listaCategorias.push(val.recordset[x].nameCategory)
                }
                
                resolve(listaCategorias)
            })
        } catch (error) {
            reject(error);
        }
    })
}
//Extraer categoria id's
let extractCategoriesID = ()=>{
    return new Promise((resolve,reject)=>{
        try {
            routePool.connect().then(pool=>{
               return pool.request()
                .query(`Select * FROM category`)
            }).then(val=>{
                routePool.close();
                let listaCategorias = [];
                for (const x in val.recordset) {
                   //console.log(val.recordset[x].idCategory);
                   listaCategorias.push(val.recordset[x].idCategory)
                }
                
                resolve(listaCategorias)
            })
        } catch (error) {
            reject(error);
        }
    })
}
//Export functions
module.exports = {
    creatNewCategory : creatNewCategory,
    extractCategories: extractCategories,
    extractCategoriesID:extractCategoriesID
}