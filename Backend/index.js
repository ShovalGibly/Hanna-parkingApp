const express = require('express');
require('dotenv').config();
const db = require('./db');
const routes = require('./routes');
const dbTest = require('./Tests/dbTest');

const app = express();
app.use(express.json());
app.use(routes);

const port = process.env.SERVER_PORT || 3000;

app.listen(port, async () => {
    await db.connect();
    await dbTest();
    console.log(`server open at http://localhost:${port}`);
})