import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from '../src/config/connectDB';
import path from "path";
import initAPIRoute from './route/API';
import mysql from 'mysql2';
require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))



viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 8080;  //Port === undefined => Port = 6060
initAPIRoute(app);





// const mysql = require('mysql');
const session = require('express-session');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'nguyennanganh'
// });
import bcrypt from 'bcryptjs';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nguyennanganh'
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/login', function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/dangnhap.html'));
});

// http://localhost:3000/auth
app.post('/auth', function (request, response) {
    const email = request.body.email;
    const password = request.body.password;

    if (email && password) {
        connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results) {
            if (error) throw error;

            if (results.length > 0) {
                const hashedPassword = results[0].password;

                // So sánh mật khẩu
                bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        request.session.loggedin = true;
                        request.session.email = email;
                        response.redirect('/get-crud');
                    } else {
                        response.send('Incorrect password!');
                    }
                });
            } else {
                response.send('Email not found!');
            }
        });
    } else {
        response.send('Please enter email and password!');
    }
});




app.get('/get-crud', function (request, response) {

    if (request.session.loggedin) {

        response.send('Welcome back, ' + request.session.email + '!');
    } else {
        // Not logged in
        response.send('Please login to view this page!');
    }
    response.end();
});








app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is running on the port: " + port);
})