const express = require('express');
require('./config/db.config');

const app = express();
const PORT = 8000;

// view engine
app.set('view engine', 'ejs');

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/', require('./routes/index'));

// server
app.listen(PORT, (err) => {
    if (err) {
        console.log("❌ Server not started", err);
        return;
    }
    console.log(`✅ Server started on port ${PORT}`);
});
