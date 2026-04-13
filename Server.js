const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'omochi_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// API simpan kritik/saran
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Error');
        }
        res.send('Data berhasil disimpan');
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));