//import mysql from 'mysql2';

// const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nguyennanganh', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});



let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('da thanh cong');
    } catch (error) {
        console.error('ko thanh cong: ', error);
    }
}

module.exports = connectDB;
