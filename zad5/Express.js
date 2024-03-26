const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

app.set('views', path.join(__dirname, 'zad5'));
app.set('view engine', 'html');  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    const date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); 
    console.log(`Request ${req.method} on path ${req.url} ${date}`);
    next();
});
let students = [];
let nextId = 1;

app.get("/students", (req, res) => {
    res.json(students);
});


app.post("/students", (req, res) => {
    const { firstName, lastName, major } = req.body;
    const student = { id: nextId++, firstName, lastName, major };
    students.push(student);
    res.status(201).json(student);
});

app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(student => student.id === id);

    if (index !== -1) {
        students.splice(index, 1);
        res.status(200).json({ message: "Student deleted" });
    } else {
        res.status(404).json({ message: "Student not found" });
    }
});

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