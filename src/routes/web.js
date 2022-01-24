//Imports
import express from "express";
import homePageController from "../controllers/homePageController";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
import categoryController from "../controllers/categoryController";
import functionsController from "../controllers/functionsController";
import searchFunctionController from "../controllers/searchFunctionsController"
import searchFunctionsService from "../services/searchFunctionsService"
const axios = require('axios');

// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    //Homepage
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);

    //Login
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));
    router.post("/logout", loginController.postLogOut);

    //Register
    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);


    //category
    router.get("/category", loginController.checkLoggedIn, categoryController.getPageCategory);
    //router.get("/getCategories", loginController.checkLoggedIn, categoryController.extractCategories);
    router.post("/category", loginController.checkLoggedIn,categoryController.createNewCategory);
    
    //Functions
    router.get("/functions", loginController.checkLoggedIn, functionsController.getPageFunctions);
    router.get("/exportFunctions", function (req, res, next) {
        searchFunctionsService.getfunctionsUsersByID(req.query.idFunction).then((result) => {
            if (result.length != 0) {
                (result[0].code) = (result[0].code).replace(/&#39;/g, '\'').replace(/&#34;/g, '"');
                return res.status(200).json(result);
            }else{
                return res.status(200).json({message: `No se encontró la función con el id: ${req.query.idFunction}`});
            }

        }).catch((err) => {
            return next(err);
        });;
    });
    
    router.post("/functions", loginController.checkLoggedIn,functionsController.createNewFunction);


    router.get("/searchFunctions", loginController.checkLoggedIn, searchFunctionController.getPageSearchFunctions);

    router.get("/showCode", function (req, res, next) {

        if (req.query.functions != undefined && req.query.functions != 'functios...') {
            axios.get(`http://hilite.me/api`,{ params: { code: req.query.functions, lexer: 'javascript' } })
            .then((result) => {
                return res.render("showCode.ejs", {
                    code: result.data
                });
                
            }).catch((err) => {
                console.log(err);
            });
        }else if (req.query.functions2 != undefined && req.query.functions2 != 'functios...') {
            axios.get(`http://hilite.me/api`,{ params: { code: req.query.functions2, lexer: 'javascript' } })
            .then((result) => {
                return res.render("showCode.ejs", {
                    code: result.data
                });
                
            }).catch((err) => {
                console.log(err);
            });
        }else if (req.query.functions3 != undefined && req.query.functions3 != 'functios...') {
            axios.get(`http://hilite.me/api`,{ params: { code: req.query.functions3, lexer: 'javascript' } })
            .then((result) => {
                return res.render("showCode.ejs", {
                    code: result.data
                });
                
            }).catch((err) => {
                console.log(err);
            });
        }
        
    })

    return app.use("/", router);
};
module.exports = initWebRoutes;
