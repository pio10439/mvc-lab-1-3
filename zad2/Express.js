const express = require("express");
const path = require('path');
const app = express();

const bodyParser = require('body-parser');

const PORT = 3000;

app.set('views', path.join(__dirname,'zad2'));

app.use(bodyParser.urlencoded({ extended: true }));

let students = [];

app.get("/home", (req, res) => {
    res.send(
        `<html>
            <head>
                <title>Home</title>
            </head>
            <body>
                <p>HOME</p>
            </body>
        </html>`);
});
app.get("/student", (req, res) => {
    res.send(
        `<html>
            <head>
                <title>Student</title>
            </head>
            <body>
                <form action="/student" method="post">
                    <label for="firstName">Imię:</label>
                    <input type="text" id="firstName" name="firstName"><br>
                    <label for="lastName">Nazwisko:</label>
                    <input type="text" id="lastName" name="lastName"><br>
                    <label for="major">Kierunek:</label>
                    <input type="text" id="major" name="major"><br>
                    <input type="submit" value="Dodaj studenta">
                </form>
            </body>
        </html>`);
});
app.post("/student", (req, res) => {
    const { firstName, lastName, major } = req.body;
    students.push({ firstName, lastName, major });
    res.send(
        `<html>
            <head>
                <title>Add-Student</title>
            </head>
            <body>
                <p>Hello, ${firstName} ${lastName} on ${major} studies!</p>
            </body>
        </html>`);
});


app.get("/users", (req, res) => {
    let userList = '<ul>';
    students.forEach(student => {
        userList += `<li><p>${student.firstName} ${student.lastName} - ${student.major}</p></li>`;
    });
    userList += '</ul>';

    res.send(
        `<html>
            <head>
                <title>Users</title>
            </head>
            <body>
                ${userList}
            </body>
        </html>`);
});

app.listen(PORT, () => {
    console.log(`Dziala`);
});