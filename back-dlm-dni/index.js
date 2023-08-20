const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 3000;
// List of clients who can access this service.
const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]
// We verify if the client is in the list of clients with permission. If not, we reject it.
app.use(cors(
    {
        origin: function (origin, callback) {
            if (!origin || whiteList.includes(origin)) {
                return callback(null, origin)
            }
            return callback(
                `Unauthorized CORS error origin: ${origin} error.`
            )
        },
    }));
app.use(express.json());
app.use(require('./src/routes/form.route.js'))
app.listen(port, () => {
    console.log(`Server listen http://localhost:${port}`);
});
