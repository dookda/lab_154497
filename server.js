const express = require('express');
const app = express();
const pg = require('pg');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// create a pool
const pool = new pg.Pool({
    user: "sakdahomhuan",
    password: "1234",
    host: "localhost",
    database: "engridsdb",
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

app.get('/api/v1/data/:sta_code', (req, res) => {
    const sta_code = req.params.sta_code;
    const sql = 'SELECT * FROM iot WHERE sta_code = $1';
    pool.query(sql, [sta_code], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(200).json(result.rows);
    });
});

app.post('/api/v1/data', (req, res) => {
    const { sta_code, sta_name, hum, temp } = req.body;
    console.log(req.body);

    const sql = 'INSERT INTO iot (sta_code, sta_name, pm25, temp) VALUES ($1, $2, $3, $4)';
    pool.query(sql, [sta_code, sta_name, hum, temp], (error, result) => {
        if (error) {
            throw error;
        }
        res.status(201).json({ status: `Station added with ID: ${sta_code}` });
    });
});

app.listen(3000, () => {
    console.log('http://localhost:3000');
});


