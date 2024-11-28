import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.get('/lichsu', homeController.displayLichsu);
    router.get('/chuongtrinh', homeController.displayChuongtrinh);
    router.get('/thanhtich', homeController.displayThanhtich);
    router.get('/cocau', homeController.displayCocau);
    router.get('/tuyensinh', homeController.displayTuyensinh);
    router.get('/lienhe', homeController.displayLienhe);
    router.get('/dangnhap', homeController.displayDangnhap);
    router.get('/manage-user', homeController.getUser);
    router.post('/post-crud', homeController.postCrud);
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.GetEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);


    router.post('/api/login', userController.handleLogin)
    return app.use("/", router);
}

module.exports = initWebRoutes; 