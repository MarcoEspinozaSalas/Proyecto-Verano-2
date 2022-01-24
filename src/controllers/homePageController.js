
//Render de homepage
let handleHelloWorld = async (req, res) => {
    return res.render("homepage.ejs",{
        user: req.user,
        categoriasName: '',
        categoriasID: ''
    });
};
//Exportar el render
module.exports = {
    handleHelloWorld: handleHelloWorld,
};
