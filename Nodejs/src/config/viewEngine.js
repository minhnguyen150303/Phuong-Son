import express from "express";

let configViewEngine = (app) => {
    app.use(express.static('./Nodejs/src/public'));
    app.set("view engine", "ejs");
    app.set("views", "./Nodejs/src/views")
}

module.exports = configViewEngine;