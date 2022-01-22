import { validationResult } from "express-validator";
import { database } from "../configs/DBConnection";
import searchFunctionsService from "../services/searchFunctionsService"


let getPageSearchFunctions = (req, res) => {
    extractUsers().then((val) => {

        extractFunctionsUsers().then((result) => {
            
            return res.render("searchFunctions.ejs", {
                errors: req.flash("errors"),
                results: req.flash("results"),
                user: req.user,
                users: val,
                functions: result
            });
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


module.exports = {
    getPageSearchFunctions : getPageSearchFunctions,
    extractFunctionsUsers : extractFunctionsUsers
}