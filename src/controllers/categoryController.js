//Imports
import categoryService from "./../services/categoryService";
import { validationResult } from "express-validator";
//Render page with variables
let getPageCategory = (req, res) => {
    return res.render("category.ejs", {
        errors: req.flash("errors"),
        results: req.flash("results"),
        user: req.user,
        categoriasName: '',
        categoriasID: ''
    
    });
};
//Crear categoria
let createNewCategory = async (req, res) => {
    //validate required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/category");
    }

    //create a new user
    let newCategory = {
        nameCategory: req.body.nameCategory
    };
    try {
        await categoryService.creatNewCategory(newCategory);
        req.flash("results", "Create a new Category successful");
        return res.redirect("/category");
    } catch (err) {
        req.flash("errors", err);
        return res.redirect("/category");
    }
};
//Export funciones
module.exports = {
    getPageCategory: getPageCategory,
    createNewCategory: createNewCategory,
    
};