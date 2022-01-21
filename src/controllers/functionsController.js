import functionsService from "./../services/functionsService";
import { validationResult } from "express-validator";

import categoryService from "./../services/categoryService";
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
    console.log("hola numero 5");

    //create a new user
    let newFunction = {
        name: req.body.name,
        description: req.body.description,
        code: req.body.code,
        idUser: req.body.idUser,
        idCategory: req.body.idCategory
    };
    try {
        await functionsService.creatNewFunction(newFunction);
        req.flash("results", "Create a new function successful");
        return res.redirect("/functions");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/functions");
    }
};
let extractCategories = async (req, res) => {
    try {
       let a =  await categoryService.extractCategories();
        return a;
      
    } catch (err) {
        req.flash("errors", err);
   
    }
};
let extractCategoriesbyId = async (req, res) => {
    try {
       let a =  await categoryService.extractCategoriesID();
        return a;
      
    } catch (err) {
        req.flash("errors", err);
   
    }
};

module.exports = {
    getPageFunctions : getPageFunctions,
    createNewFunction:createNewFunction,
}