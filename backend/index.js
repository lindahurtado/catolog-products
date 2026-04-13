const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/products', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM products WHERE state = true ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

app.post('/products', async (req, res) => {
    const { name, description, price, url, state } = req.body;
    const queryText = 'INSERT INTO products(name, description, price, url, state) VALUES($1, $2, $3, $4, $5) RETURNING *';
   
    try {
        const result = await db.query(queryText, [
            name,
            description,
            price,
            url,
            state !== undefined ? state : true
        ]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json( {error: "Error al crear producto"});
    }
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, url, state } = req.body;
    const queryText = 'UPDATE products SET name=$1, description=$2, price=$3, url=$4, state=$5 WHERE id=$6 RETURNING *';

    try {
        const result = await db.query(queryText, [
            name,
            description,
            price,
            url,
            state,
            id
        ]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar" });
    }
});

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('UPDATE products SET state = false WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Producto no encontrado"});
        res.json({ message: "Producto inhabilitado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al inhabilitar" });
    }
});

app.listen(port, () => {
    console.log(`Servidor conectado a DB y corriendo en puerto ${port}`);
});