let handleHelloWorld = async (req, res) => {
    return res.render("homepage.ejs",{
        user: req.user,
        categoriasName: '',
        categoriasID: ''
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};
