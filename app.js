const express = require("express");
const app = express();
const cors = require('cors');
const session = require("express-session");

app.use(session({
    secret:"jairojean",cookie:{maxAge: 3000000}
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const loginRoutes = require('./routes/login');
const shoppingCartRoutes = require('./routes/cart');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');


// Definindo a rota produto
app.use('/app/login', loginRoutes);
app.use('/app/products', productsRoutes);
app.use('/app/cart', shoppingCartRoutes);
app.use('/app/users', usersRoutes);

app.listen(4567, () => {
    console.log("App rodando.");
});
