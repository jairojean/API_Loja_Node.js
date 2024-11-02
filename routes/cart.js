const express = require("express");
const connect = require("../Connect_db");
const router = express.Router();

let itemsCart = [];

router.get("/ListItemsCart", (req, res) => {
    itemsCart = connect.loadFromJsonFile("ItemsCart");
    res.status(200).json(itemsCart);
});
router.get("/orderlist", (req, res) => {
    itemsCart = connect.loadFromJsonFile("order-list");
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
        const index = itemsCart.findIndex(item => item.id === id); 

        if (index === -1) {
            return res.sendStatus(404); 
        } else {
            
            itemsCart.splice(index, 1); 
            
            connect.safeInJsonFile(itemsCart, 'ItemsCart');
            return res.sendStatus(200); 
        }
    }
});

router.post("/finishBuy", (req, res) => {
    const buy = req.body;
    try {
        data = connect.loadFromJsonFile("order-list");
        
       
        data.vendas.push(buy);
        connect.safeInJsonFile(data, "order-list");

        connect.safeInJsonFile([], "ItemsCart");

        return res.status(200).json({ message: "Compra finalizada com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar a compra:", error);
        return res.status(500).json({ message: "Erro ao finalizar a compra." });
    }
});

module.exports = router;
