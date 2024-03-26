const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

app.set('views', path.join(__dirname, 'zad4'));
app.set('view engine', 'html');  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); 
    console.log(`Request ${req.method} on path ${req.url} ${date}`);
    next();
});

let students = [];

app.get("/home", (req, res) => {
    res.render('home');
});

app.get("/student", (req, res) => {
    res.render('student');
});

app.post("/student", (req, res) => {
    const { firstName, lastName, major } = req.body;
    students.push({ firstName, lastName, major });
    res.render('add-student', { firstName, lastName, major });
});

app.get("/users", (req, res) => {
    let userList = '<ul>';
    students.forEach(student => {
        userList += `<li><p>${student.firstName} ${student.lastName} - ${student.major}</p></li>`;
    });
    userList += '</ul>';

    res.render('users', { userList });
});

app.listen(PORT, () => {
    console.log(`OK`);
});
