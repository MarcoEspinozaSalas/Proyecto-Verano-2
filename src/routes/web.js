import express from "express";
import homePageController from "../controllers/homePageController";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import testPageController from "../controllers/testPageController";
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";

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


    //Test
    router.get("/test", loginController.checkLoggedIn, testPageController.handleHelloWorld);



    return app.use("/", router);

};
module.exports = initWebRoutes;
