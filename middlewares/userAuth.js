function userAuth(req, res, next) {
  
    if (req.session.user != undefined) {
       
        next();
    } else {
        console.log("Usuario nao esta logado");
        res.send("Erro ao tentar acessar");
    }
}

module.exports = userAuth;
