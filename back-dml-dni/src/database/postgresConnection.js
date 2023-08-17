const { Client, Pool } = require('pg');


const connectionData = {
    user: 'postgres',
    host: 'localhost',
    database: 'MYDB',
    password: 'postgres',
    port: 54321,
};

const pool = new Pool(connectionData);
module.exports = pool;