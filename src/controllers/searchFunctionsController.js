import { validationResult } from "express-validator";
import { database } from "../configs/DBConnection";
import searchFunctionsService from "../services/searchFunctionsService"
import categoryService from "./../services/categoryService";

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


let extractUsers= async (req, res) => {
    try {
        let a =  await searchFunctionsService.getUsers();
        return a;
      
    } catch (err) {
        req.flash("errors", err);
    }
};


let extractFunctionsUsers= async (req, res) => {
    try {
        let a =  await searchFunctionsService.getfunctionsUsers();
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

let extractCategories = async (req, res) => {
    try {
       let a =  await categoryService.extractCategories();
        return a;
      
    } catch (err) {
        req.flash("errors", err);
   
    }
};


module.exports = {
    getPageSearchFunctions : getPageSearchFunctions,
    extractFunctionsUsers : extractFunctionsUsers
}