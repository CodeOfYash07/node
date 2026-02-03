const express = require('express');

const port = 6555;

const app = express();

let id = 1;
app.set("view engine", "ejs");
app.use(express.urlencoded());
let allnum = [];

app.get('/', (req, res) => {
    res.render('view', { allnum });
});

app.get('/addnumPage', (req, res) => {
    res.render('add');
});

app.post('/addnum', (req, res) => {
    const num = req.body;

    num.id = id;
    id++;
    allnum.push(num);
    res.redirect('/');
});

app.get('/deletenum', (req, res) => {
    console.log(req.query);

    const Userid = req.query.id;

    allnum = allnum.filter((num) => num.id != Userid);

    res.redirect('/');
});

app.get("/editPage", (req, res) => {
    console.log(req.query);
    const num = allnum.find((num) => num.id == req.query.id);
    if (!num) {
        return res.redirect('/');
    }
    return res.render('edit', {
        num
    });
});

app.post('/editnum', (req, res) => {
    console.log(req.body);
    alltask = allnum.map((num) => {
        if (num.id == req.body.id) {
            return req.body;
        }
        else {
            return num;
        }
    })
    return res.redirect('/');
});
app.listen(port, (err) => {
    if (err) {
        console.log("Error starting server:", err);
        return false;
    }
    console.log("Server started 😎");
});
