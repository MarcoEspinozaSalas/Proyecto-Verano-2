//Imports
import { validationResult } from "express-validator";
import { database } from "../configs/DBConnection";
import searchFunctionsService from "../services/searchFunctionsService"
import categoryService from "./../services/categoryService";
//Render page search functions
let getPageSearchFunctions = (req, res) => {
    extractUsers().then((val) => {

        extractFunctionsUsers().then((result) => {

            extractCategoriesbyId().then(val2 =>{

                extractCategories().then((result2) => {
                    return res.render("searchFunctions.ejs", {
                        errors: req.flash("errors"),
                        results: req.flash("results"),
                        user: req.user,
                        users: val,
                        functions: result,
                        categoriesName: result2,
                        categoriesID: val2
                    });
    
                })
            })

        });

    })
};

//Extraer los usuarios
let extractUsers= async (req, res) => {
    try {
        let a =  await searchFunctionsService.getUsers();
        return a;
      
    } catch (err) {
        req.flash("errors", err);
    }
};

//Extraer las funciones de los usuarios
let extractFunctionsUsers= async (req, res) => {
    try {
        let a =  await searchFunctionsService.getfunctionsUsers();
        return a;
      
    } catch (err) {
        req.flash("errors", err);
    }
};
//Extraer las id de las categorias
let extractCategoriesbyId = async (req, res) => {
    try {
       let a =  await categoryService.extractCategoriesID();
        return a;
      
    } catch (err) {
        req.flash("errors", err);
   
    }
};
//Extraer las categorias
let extractCategories = async (req, res) => {
    try {
       let a =  await categoryService.extractCategories();
        return a;
      
    } catch (err) {
        req.flash("errors", err);
   
    }
};

//Export functions
module.exports = {
    getPageSearchFunctions : getPageSearchFunctions,
    extractFunctionsUsers : extractFunctionsUsers
}