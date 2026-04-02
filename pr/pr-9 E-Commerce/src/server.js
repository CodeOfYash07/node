require('dotenv').config();
const express = require('express');
require('./config/db.config');
const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded());
app.use(express.json());

app.use('/api', require('./routes'));

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server Is Not Stared ", err);
        return false;
    }
    console.log(`Server Is Started At Port ${PORT}`);
});