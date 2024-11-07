const express = require("express");
const connect = require("../Connect_db");
const router = express.Router();

let itemsCart = [];

router.get("/listUsers", (req, res) => {
   users = connect.loadFromJsonFile("users");
    res.status(200).json(users);
});

router.post("/addUser", (req, res) => {
    const { id, email, password } = req.body;
    users = connect.loadFromJsonFile("users");
    if (isNaN(id)) {
        return res.sendStatus(400);
    } else {
        if (users.users.some(data => data.email == email)) {
            console.log("email ja esta cadastrado");
            return res.status(409).send("Este email já está cadastrado.");
        } else {
            users.users.push({ id,email, password });
            connect.safeInJsonFile(users, "users");
            return res.sendStatus(200);
        }
    }
});

module.exports = router;
