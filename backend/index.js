const express = require('express');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
    {
        id: 1,
        name: "Curso React",
        description: "Aprender React desde cero",
        price: 50000,
        url: "",
        state: true
    }
];

app.get('/products', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products WHERE state = true');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.post('/products', async (req, res) => {
    const { name, description, price, url } = req.body;
    const queryText = 'INSERT INTO products(name, description, price, url, state) VALUES($1, $2, $3, $4, true) RETURNING *';
   
    try {
        const result = await db.query(queryText, [
            name,
            description,
            price,
            url
        ]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json( {error: "Error al crear producto"});
    }
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, url } = req.body;
    const queryText = 'UPDATE products SET name=$1, description=$2. price=$3, url=$4 WHERE id=$5 RETURNING *';

    try {
        const result = await db.query(queryText, [
            name,
            description,
            price,
            url,
            id
        ]);
        if (result.rows.lenght === 0) return res.status(404).json({ error: "Producto no encontrado" });
        res.json(result.rows[0]):
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar" });
    }
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('UPDATE products SET status = false WHERE id = $1 RETURNING *', [id]);
        if (result.rows.lenght === 0) return res.status(404).json({ error: "Producto no encontrado"});
        res.json({ message: "Producto inhabilitado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al inhabilitar" });
    }
});

app.listen(port, () => {
    console.log(`Servidor conectado a DB y corriendo en puerto ${port}`);
});