const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const serverPort = 3333;

const app = express();

mongoose.connect('mongodb+srv://pao:redbull123@cluster0-xqdub.mongodb.net/devRadar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.set('useCreateIndex', true);
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(serverPort);