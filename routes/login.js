const express = require("express");
const connect = require("../Connect_db");
const router = express.Router();

const users = connect.loadFromJsonFile("users");

router.post("/authenticate",(req, res) => {
   let email = req.body.email;
   let password = req.body.password;
   user = users.users.find(u => u.email == email);
   try {
    if(user != undefined){   // criando a sessao
        if(password == user.password){
            req.session.user = {
                id: user.id,
                email: user.email
            }
            res.json(req.session.user);
        }else{
            res.send("Senha incorreta").status(400);
        }
    } 
   } catch (error) {
    res.status(404).send(error);
   }
});

router.get("/logout",(req, res)=>{
    try {
        req.session.user = undefined;
        res.status(200);
    } catch (error) {
        res.status(404).send(error)
    }

});


module.exports = router;
