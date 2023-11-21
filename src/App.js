const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const { SessionRoute, UserRoute, HouseRoute } = require('./routes');

//Conexão com banco de dados
mongoose.connect(process.env.MONGO);

const app = express();

//URLs que podem acessar sua API
app.use(cors());
app.use(express.json());
app.use(SessionRoute);
app.use(UserRoute);
app.use(HouseRoute);

app.listen(process.env.PORT || 3333, () => {
    console.log(`Server Start in Port ${process.env.PORT || 3333}`)
});