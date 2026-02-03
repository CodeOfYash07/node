const express = require('express');
const path = require("path"); // ✅ REQUIRED
require('./config/db.config');

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", require("./routes/index.routes"));

app.listen(PORT, () => {
    console.log("Server started on port", PORT);
});
