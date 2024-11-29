import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/crud', homeController.getCRUD);
    router.get('/post', homeController.getPost);
    router.get('/lichsu', homeController.displayLichsu);
    router.get('/lichsu2', homeController.displayLichsu2);
    // router.get('/chuongtrinh', homeController.displayChuongtrinh);
    router.get('/thanhtich', homeController.getTest3);
    router.get('/thanhtich2', homeController.getTest32);
    router.get('/cocau', homeController.displayCocau);
    router.get('/cocau2', homeController.displayCocau2);
    router.get('/tuyensinh', homeController.getTest2);
    router.get('/tuyensinh2', homeController.getTest22);
    router.get('/lienhe', homeController.displayLienhe);
    router.get('/lienhe2', homeController.displayLienhe2);
    router.get('/dangnhap', homeController.displayDangnhap);
    router.get('/user', homeController.getLogin);
    router.get('/manage-user', homeController.getUser);
    router.post('/post-crud', homeController.postCrud);
    router.post('/post-post', homeController.postPost);

    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/get-post', homeController.displayGetPost);
    router.get('/edit-crud', homeController.GetEditCRUD);
    router.get('/edit-post', homeController.GetEditPost);
    router.post('/put-crud', homeController.putCRUD);
    router.post('/put-post', homeController.putPost);
    router.get('/delete-crud', homeController.deleteCRUD);
    router.get('/delete-post', homeController.deletePost);
    router.get('/get-chitiet', homeController.getChiTiet);
    router.get('/test', homeController.getTest);
    router.get('/test2', homeController.getChuongTrinh2);




    return app.use("/", router);
}

module.exports = initWebRoutes; 