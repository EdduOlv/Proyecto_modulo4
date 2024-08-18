const express = require("express");
const app = express();
const bookingRoutes = require('./routes/bookingRoutes');


require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api", bookingRoutes)

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto ' + port);
})