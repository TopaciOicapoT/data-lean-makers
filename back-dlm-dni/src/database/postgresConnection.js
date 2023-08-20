const { Client, Pool } = require('pg');
const connectionData = {
    host: 'dataleanmakers.com.es',
    database: 'pg_pruebadlm',
    user: 'dlm',
    password: 'dlm2023$',
    port: 7432,
};
const pool = new Pool(connectionData);
module.exports = pool;