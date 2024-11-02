const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const shoppingCartRoutes = require('./routes/cart');
const productsRoutes = require('./routes/products');

// Definindo a rota produto
app.use('/app/products', productsRoutes);
app.use('/app/cart', shoppingCartRoutes);

app.listen(4567, () => {
    console.log("App rodando.");
});
