const express = require("express");
const connect = require("../Connect_db");
const router = express.Router();

let products = connect.loadFromJsonFile('products'); // carregando do json banco de dados falso

// Rota para obter todos os produtos
router.get("/", (req, res) => {
    res.status(200).json(products);
});

// Rota para obter um produto específico
router.get("/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(400);
    } else {
        const id = parseInt(req.params.id);
        const product = products.products.find(p => p.id === id);
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.sendStatus(404);
        }
    }
});

// Rota para criar um novo produto
router.post("/", (req, res) => {
    const { id, name } = req.body; // Adicione 'id' aqui

    if (isNaN(id)) {
        return res.sendStatus(400);
    } else {
        products.products.push({ id, name });
        connect.safeInJsonFile(products, 'products');
        return res.sendStatus(200);
    }
});

// Rota para deletar um produto
router.delete("/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(400);
    } else {
        const id = parseInt(req.params.id);
        const index = products.products.findIndex(p => p.id === id);

        if (index === -1) {
            return res.sendStatus(404);
        } else {
            products.products.splice(index, 1);
            connect.safeInJsonFile(products, 'products');
            return res.sendStatus(200);
        }
    }
});

// Rota para atualizar um produto
router.put("/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        return res.sendStatus(400);
    } else {
        const id = parseInt(req.params.id);
        const product = products.products.find(p => p.id === id);
        if (product) {
            const { name } = req.body;
            if (name) {
                product.name = name;
                connect.safeInJsonFile(products, 'products');
                return res.sendStatus(200);
            }
        } else {
            return res.sendStatus(404);
        }
    }
});

module.exports = router;
