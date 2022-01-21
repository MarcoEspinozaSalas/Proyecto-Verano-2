import { validationResult } from "express-validator";
import { database } from "../configs/DBConnection";

let getPageSearchFunctions = (req, res) => {
    return res.render("searchFunctions.ejs", {
        errors: req.flash("errors"),
        results: req.flash("results"),
        user: req.user
    });
};



module.exports = {
    getPageSearchFunctions : getPageSearchFunctions
}