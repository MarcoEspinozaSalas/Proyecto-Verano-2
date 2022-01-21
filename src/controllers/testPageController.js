let handleHelloWorld = async (req, res) => {
    return res.render("test.ejs",{
        user: req.user,
        categoriasName: '',
        categoriasID: ''
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};
