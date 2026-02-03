const express = require('express');
const port = 8000;
const app = express();

let allnum = [];

let id = 1;

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.render('view', {
        allnum,
    });
});

app.get('/viewdeta', (req, res) => {
    res.render('add');
});

app.post('/addnum', (req, res) => {
    const task = req.body;

    task.Id = id;
    id++;

    allnum.push(task);
    res.redirect('/');
});

app.get('/deletenum', (req, res) => {
    console.log(req.query);

    const Userid = req.query.Id;

    allnum = allnum.filter((task) => task.Id != Userid);

    res.redirect('/');
});

app.get("/editPage", (req, res) => {
    console.log(req.query);
    const task = allnum.find((task) => task.Id == req.query.Id);
    if (!task) {
        return res.redirect('/');
    }
    return res.render('edit', {
        task
    });
});

app.post('/edittask', (req, res) => {
    console.log(req.body);
    allnum = allnum.map((task) => {
        if (task.Id == req.body.Id) {
            return req.body;
        }
        else {
            return task;
        }
    })
    return res.redirect('/');
});

app.listen(port, (err) => {
    if (err) {
        console.log("Server Not Found 😞 😞 😞", err);
        return false;
    }
    console.log("Server IS started 😎 😎 😎 😎");
});