let handleHelloWorld = async (req, res) => {
    return res.render("test.ejs",{
        user: req.user
    });
};

module.exports = {
    handleHelloWorld: handleHelloWorld,
};
