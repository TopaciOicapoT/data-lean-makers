const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT ?? 3000;


app.use(cors());
app.use(express.json());
app.use(require('./src/routes/form.route.js'))

app.listen(port, () => {
    console.log(`Servidor API escuchando en http://localhost:${port}`);
});
