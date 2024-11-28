import express from "express";
import APIController from '../controllers/APIController'

let router = express.Router();

let initAPIRoute = (app) => {
    router.get('/users', APIController.getAllUsers);
    router.post('/create-user', APIController.createNewUser);



    return app.use("/api/v1/", router);
}

module.exports = initAPIRoute;