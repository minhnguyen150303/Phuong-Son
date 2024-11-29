import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from '../src/config/connectDB';
import path from "path";
import mysql from 'mysql2';
require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

import session from 'express-session';

// Cấu hình express-session
app.use(session({
    secret: 'your-secret-key',  // Chìa khóa bảo mật cho session
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Nếu bạn sử dụng HTTPS, set secure: true
}));


viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 8080;  //Port === undefined => Port = 6060






// const mysql = require('mysql');

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


app.get('/login', function (request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/dangnhap.html'));
});


app.post('/auth', function (request, response) {
    const email = request.body.email;
    const password = request.body.password;

    if (email && password) {
        connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results) {
            if (error) throw error;

            if (results.length > 0) {
                const hashedPassword = results[0].password;
                const userId = results[0].id; // Lấy id của người dùng từ kết quả truy vấn

                // So sánh mật khẩu
                bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        request.session.loggedin = true;
                        request.session.email = email;
                        request.session.userId = userId; // Lưu ID người dùng vào session

                        // Chuyển hướng tới trang có ID người dùng
                        response.redirect(`/get-crud?id=${userId}`);
                    } else {
                        return res.redirect('/login');

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