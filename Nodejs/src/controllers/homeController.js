import db from '../../../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('trangchu.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

let getCRUD = (req, res) => {
    return res.render('manage-user.ejs');
}



let displayLichsu = (req, res) => {
    return res.render('lichsu.ejs');
}

let displayChuongtrinh = (req, res) => {
    return res.render('chuongtrinh.ejs');
}

let displayThanhtich = (req, res) => {
    return res.render('thanhtich.ejs');
}

let displayCocau = (req, res) => {
    return res.render('cocau.ejs');
}

let displayTuyensinh = (req, res) => {
    return res.render('tuyensinh.ejs');
}

let displayLienhe = (req, res) => {
    return res.render('lienhe.ejs');
}


let displayDangnhap = (req, res) => {
    return res.render('dangnhap.ejs');
}




let getUser = (req, res) => {
    return res.render('');
}

let postCrud = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    return res.send('da them thanh cong');

    // let data = await CRUDService.getAllUser();
    // return res.render('dsuser.ejs', {
    //     dataTable: data
    // });
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('dsuser.ejs', {
        dataTable: data
    });
}


let GetEditCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log(userId)
    if (userId) {
        let userData = await CRUDService.getUserInfobyId(userId);

        return res.render('edit-crud.ejs', {
            user: userData,
        });
    } else {
        return res.send('ko thanh cong');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('dsuser.ejs', {
        dataTable: allUsers
    });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        //return res.send('da xoa');
        let data = await CRUDService.getAllUser();
        return res.render('dsuser.ejs', {
            dataTable: data
        });
    } else {
        return res.send('ko tim thay');
    }
}


module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    displayGetCRUD: displayGetCRUD,
    displayLichsu: displayLichsu,
    displayChuongtrinh: displayChuongtrinh,
    displayThanhtich: displayThanhtich,
    displayCocau: displayCocau,
    displayTuyensinh: displayTuyensinh,
    displayLienhe: displayLienhe,
    displayDangnhap: displayDangnhap,
    getUser: getUser,
    postCrud: postCrud,
    GetEditCRUD: GetEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}