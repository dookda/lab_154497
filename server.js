const express = require('express');
const app = express();
const pg = require('pg');

// create a pool
const pool = new pg.Pool({
    user: "sakdahomhuan",
    password: "1234",
    host: "localhost",
    database: "engrids",
    port: 5432
})

app.use('/', express.static('www'));

// create get api
app.get('/api', (req, res) => {
    res.status(200).json({
        faname: 'John',
        laname: 'Wick',
        id: 123456789,
        status: 'success'
    })
});

app.get('/api/v1/data', (req, res) => {
    const sql = 'SELECT * FROM iot';
    pool.query(sql, (error, result) => {
        if (error) {
            throw error;
        }
        // console.log(result.rows);
        res.status(200).json(result.rows);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});