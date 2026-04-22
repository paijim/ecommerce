const express = require('express');
const { Pool } = require('pg');


const app = express();

app.use(express.json());

const pool = new Pool({
  user: 'user_admin',
  host: 'db',
  database: 'techstore_db',
  password: 'mypassword123',
  port: 5432,
});

// Fonctions d'initialisation (ton ancien code adapté)
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        stock INTEGER DEFAULT 0
      );
    `);
    
    const checkProduct = await pool.query('SELECT * FROM products LIMIT 1');
    if (checkProduct.rows.length === 0) {
      await pool.query(`
        INSERT INTO products (name, description, price, stock)
        VALUES ('Clavier Mécanique RGB', 'Un super clavier pour coder en React', 89.99, 15)
      `);
      console.log("Produit de test ajouté !");
    }
    console.log("Base de données prête.");
  } catch (err) {
    console.error("Erreur init DB:", err);
  }
}

// Lancer l'initialisation
initDB();

// Route pour React
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Serveur Backend allumé sur http://localhost:5000");
});

// Route pour ajouter un nouveau produit
app.post('/api/products', async (req, res) => {
  const { name, description, price, stock } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'ajout" });
  }
});