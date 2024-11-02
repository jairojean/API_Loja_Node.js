const express = require("express");
const connect = require("../Connect_db");
const router = express.Router();

let itemsCart = [];

router.get("/ListItemsCart", (req, res) => {
    itemsCart = connect.loadFromJsonFile("ItemsCart");
    res.status(200).json(itemsCart);
});

router.post("/addItemsCart", (req, res) => {
    const { id, name, quantity } = req.body;
    itemsCart = connect.loadFromJsonFile("ItemsCart");
    if (isNaN(id)) {
        return res.sendStatus(400);
    } else {
        if (itemsCart.some(data => data.id == id)) {
            console.log("ja esta cadastrado");
            return res.status(409).send("Este produto já está cadastrado.");
        } else {
            itemsCart.push({ id, name, quantity });
            connect.safeInJsonFile(itemsCart, "ItemsCart");
            return res.sendStatus(200);
        }
    }
});

router.put("/updateItem/:id", (req, res) => {
    console.log(req.params.id)
    if (isNaN(req.params.id)) {
        return res.sendStatus(400);
    } else {
        const id = parseInt(req.params.id);
        const item = itemsCart.find(p => p.id === id);
        if (item) {
            const { quantity } = req.body;
            if (quantity) {
                item.quantity = quantity;
                connect.safeInJsonFile(itemsCart, 'ItemsCart');
                return res.sendStatus(200);
            }
        } else {
            return res.sendStatus(404);
        }
    }
});

router.delete("/deleteItem/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(400);
    } else {
        const id = parseInt(req.params.id);
        const index = itemsCart.findIndex(item => item.id === id); // Usar findIndex

        if (index === -1) {
            return res.sendStatus(404); // Item não encontrado
        } else {
            console.log(itemsCart);
            itemsCart.splice(index, 1); // Deletar o item pelo índice
            console.log(itemsCart);
            connect.safeInJsonFile(itemsCart, 'ItemsCart');
            return res.sendStatus(200); // Deletado com sucesso
        }
    }
});




module.exports = router;
