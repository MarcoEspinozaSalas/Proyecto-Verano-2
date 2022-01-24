//Imports
import functionsService from "./../services/functionsService";
import { validationResult } from "express-validator";
import categoryService from "./../services/categoryService";

//Render page with variables
let getPageFunctions = (req, res) =>{
   
    extractCategories().then(val1 =>{
        extractCategoriesbyId().then(val2 =>{
            return res.render("functions.ejs",{
                errors: req.flash("errors"),
                results: req.flash("results"),
                user : req.user,
                categoriasName: val1,
                categoriasID: val2
            });
        })
       
    })  
    
    
}

//Create new functions
let createNewFunction = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/functions");
    }

    //create a new function
    let newFunction = {
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        idUser: req.body.idUser,
        idCategory: req.body.idCategory
    };
    try {
        if (req.body.idCategory === 'Categories...') {
            req.flash("errors", "Please fill out category");
            return res.redirect("/functions");
        }else{
            await functionsService.creatNewFunction(newFunction);
            req.flash("results", "Create a new function successful");
            return res.redirect("/functions");
        }
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/functions");
    }
};

//Extraer las categorías
let extractCategories = async (req, res) => {
    try {
       let a =  await categoryService.extractCategories();
        return a;
      
    } catch (err) {
        req.flash("errors", err);
   
    }
};

//Extraer el id de las categorias
let extractCategoriesbyId = async (req, res) => {
    try {
       let a =  await categoryService.extractCategoriesID();
        return a;
      
    } catch (err) {
        req.flash("errors", err);
   
    }
};
//Exportar las funciones
module.exports = {
    getPageFunctions : getPageFunctions,
    createNewFunction:createNewFunction,
}