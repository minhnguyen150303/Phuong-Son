import db from '../../../models/index';
import CRUDService from '../services/CRUDService';
import postService from '../services/postService';


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        let data2 = await postService.getAllPost();
        return res.render('trangchu.ejs', {
            data: JSON.stringify(data),
            dataTable: data2
        });
    } catch (e) {
        console.log(e);
    }
}

let getID = async (req, res) => {
    try {
        let userId = req.session.userId; // Lấy id từ session
        res.render('dieuhuong.ejs', {
            userId: userId, // Truyền userId sang EJS
        });
    } catch (e) {
        console.log(e);
    }
};

let getLogin = async (req, res) => {
    try {
        // Kiểm tra xem userId có tồn tại trong session không
        let userId = req.session.userId;
        if (!userId) {
            return res.redirect('/login');  // Nếu không có userId, chuyển hướng về trang đăng nhập
        }

        // Truy vấn thông tin người dùng từ cơ sở dữ liệu
        let data = await db.User.findOne({ where: { id: userId } });
        let data2 = await postService.getAllPost();

        return res.render('dangxuat.ejs', {
            data: JSON.stringify(data),
            dataTable: data2,
            userId: userId  // Truyền userId vào view
        });
    } catch (e) {
        console.log(e);
        return res.redirect('/login');  // Nếu có lỗi, chuyển hướng về trang đăng nhập
    }
};




// let getCRUD = (req, res) => {
//     return res.render('manage-user.ejs');
// }
let getCRUD = async (req, res) => {
    try {
        let userId = req.session.userId || req.query.id; // Lấy userId từ session hoặc query
        let data = await CRUDService.getAllUser();
        return res.render('manage-user.ejs', {
            dataTable: data,
            userId: userId, // Truyền userId vào view
        });
    } catch (e) {
        console.log(e);
    }
};

let getPost = async (req, res) => {
    try {
        let userId = req.session.userId || req.query.id; // Lấy userId từ session hoặc query
        let data = await CRUDService.getAllUser();
        return res.render('themPost.ejs', {
            dataTable: data,
            userId: userId, // Truyền userId vào view
        });
    } catch (e) {
        console.log(e);
    }
};




let displayLichsu = (req, res) => {
    return res.render('lichsu.ejs');
}

let displayLichsu2 = (req, res) => {
    let userId = req.session.userId || req.query.id;
    return res.render('lichsu2.ejs', {
        userId: userId, // Truyền userId vào view
    });
}

// let displayChuongtrinh = (req, res) => {
//     return res.render('chuongtrinh.ejs');
// }

// let displayThanhtich = (req, res) => {
//     return res.render('thanhtich.ejs');
// }

let displayCocau = (req, res) => {
    return res.render('cocau.ejs');
}

let displayCocau2 = (req, res) => {
    let userId = req.session.userId || req.query.id;
    return res.render('cocau2.ejs', {
        userId: userId,
    });
}

// let displayTuyensinh = (req, res) => {
//     return res.render('tuyensinh.ejs');
// }

let displayLienhe = (req, res) => {
    return res.render('lienhe.ejs');
}

let displayLienhe2 = (req, res) => {
    let userId = req.session.userId || req.query.id;
    return res.render('lienhe2.ejs', {
        userId: userId, // Truyền userId vào view
    });
}


let displayDangnhap = (req, res) => {
    return res.render('dangnhap.ejs');
}




let getUser = (req, res) => {
    return res.render('');
}


let postCrud = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    let userId = req.session.userId || req.query.id; // Lấy userId từ session hoặc query
    // Kiểm tra xem userId có hợp lệ không
    if (!userId) {
        return res.send('Không tìm thấy userId!');
    }

    return res.render('dathemcrud.ejs', {
        userId: userId, // Truyền userId vào view
    });

}

let postPost = async (req, res) => {
    let message = await postService.createNewPost(req.body);
    let userId = req.session.userId || req.query.id; // Lấy userId từ session hoặc query
    // Kiểm tra xem userId có hợp lệ không
    if (!userId) {
        return res.send('Không tìm thấy userId!');
    }

    return res.render('dathempost.ejs', {
        userId: userId, // Truyền userId vào view
    });

}

let displayGetCRUD = async (req, res) => {
    try {
        let userId = req.session.userId || req.query.id; // Lấy userId từ session hoặc query
        let data = await CRUDService.getAllUser();
        return res.render('dsuser.ejs', {
            dataTable: data,
            userId: userId, // Truyền userId sang view
        });
    } catch (e) {
        console.log(e);
    }
};

let displayGetPost = async (req, res) => {
    let userId = req.session.userId || req.query.id; // Lấy userId từ session hoặc query
    if (!userId) {
        return res.send('Bạn cần phải đăng nhập!'); // Kiểm tra nếu userId không tồn tại
    }
    let data = await postService.getAllPost(); // Lấy tất cả bài viết
    return res.render('dspost.ejs', {
        dataTable: data,
        userId: userId, // Truyền userId vào view
    });
}



let GetEditCRUD = async (req, res) => {
    let userId = req.session.userId || req.query.id; // Lấy userId từ session hoặc query
    let userIdEdit = req.query.id; // ID của người dùng cần chỉnh sửa

    if (userIdEdit) {
        let userData = await CRUDService.getUserInfobyId(userIdEdit);

        return res.render('edit-crud.ejs', {
            user: userData,
            userId: userId, // Truyền userId sang view
        });
    } else {
        return res.send('Không thành công!');
    }
};


let GetEditPost = async (req, res) => {
    let userId = req.session.userId || req.query.id; // Lấy userId từ session hoặc query
    let postId = req.query.id; // ID của người dùng cần chỉnh sửa

    if (postId) {
        let postData = await postService.getPostInfobyId(postId);

        return res.render('edit-post.ejs', {
            post: postData,
            userId: userId, // Truyền userId sang view
        });
    } else {
        return res.send('Không thành công!');
    }
};


let putCRUD = async (req, res) => {
    let data = req.body;
    let userId = req.session.userId;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('dsuser.ejs', {
        dataTable: allUsers,
        userId: userId,
    });
}

let putPost = async (req, res) => {
    let data = req.body;
    let userId = req.session.userId;
    let allPosts = await postService.updatePostData(data);
    return res.render('dspost.ejs', {
        dataTable: allPosts,
        userId: userId,
    });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let userId = req.session.userId;  // Lấy userId từ session
        if (!userId) {
            return res.send('Không tìm thấy userId trong session!');
        }

        // Xóa người dùng theo id
        await CRUDService.deleteUserById(id);

        // Lấy lại danh sách người dùng sau khi xóa
        let data = await CRUDService.getAllUser();

        // Render lại danh sách người dùng
        return res.render('dsuser.ejs', {
            dataTable: data,
            userId: userId,  // Truyền userId vào view
        });
    } else {
        return res.send('Không tìm thấy User!');
    }
}


let deletePost = async (req, res) => {
    let id = req.query.id;
    if (id) {
        let userId = req.session.userId;  // Lấy userId từ session
        if (!userId) {
            return res.send('Không tìm thấy userId trong session!');
        }

        // Xóa người dùng theo id
        await postService.deletePostById(id);

        // Lấy lại danh sách người dùng sau khi xóa
        let data = await postService.getAllPost();

        // Render lại danh sách người dùng
        return res.render('dspost.ejs', {
            dataTable: data,
            userId: userId,  // Truyền userId vào view
        });
    } else {
        return res.send('Không tìm thấy User!');
    }
}


let getChiTiet = async (req, res) => {
    let postId = req.query.id;
    console.log(postId)
    if (postId) {
        let postData = await postService.getPostInfobyId(postId);

        return res.render('chitiet.ejs', {
            post: postData,
        });
    } else {
        return res.send('ko thanh cong');
    }
}


let getTest = async (req, res) => {
    let data = await postService.getAllPost();
    return res.render('test.ejs', {
        dataTable: data
    });
}

let getChuongTrinh2 = async (req, res) => {
    let userId = req.session.userId || req.query.id;
    let data = await postService.getAllPost();
    return res.render('test2.ejs', {
        dataTable: data,
        userId: userId,
    });
}

let getTest2 = async (req, res) => {
    let data = await postService.getAllPost();
    return res.render('tuyensinh.ejs', {
        dataTable: data
    });
}

let getTest22 = async (req, res) => {
    let userId = req.session.userId || req.query.id;
    let data = await postService.getAllPost();
    return res.render('tuyensinh2.ejs', {
        dataTable: data,
        userId: userId,
    });
}

let getTest3 = async (req, res) => {
    let data = await postService.getAllPost();
    return res.render('thanhtich.ejs', {
        dataTable: data
    });
}
let getTest32 = async (req, res) => {
    let userId = req.session.userId || req.query.id;
    let data = await postService.getAllPost();
    return res.render('thanhtich2.ejs', {
        dataTable: data,
        userId: userId,
    });
}



module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    getPost: getPost,
    displayGetCRUD: displayGetCRUD,
    displayGetPost: displayGetPost,
    displayLichsu: displayLichsu,
    // displayChuongtrinh: displayChuongtrinh,
    // displayThanhtich: displayThanhtich,
    displayCocau: displayCocau,
    // displayTuyensinh: displayTuyensinh,
    displayLienhe: displayLienhe,
    displayDangnhap: displayDangnhap,
    getUser: getUser,
    postCrud: postCrud,
    postPost: postPost,
    GetEditCRUD: GetEditCRUD,
    GetEditPost: GetEditPost,
    putCRUD: putCRUD,
    putPost: putPost,
    deleteCRUD: deleteCRUD,
    deletePost: deletePost,
    getChiTiet: getChiTiet,
    getTest: getTest,
    getTest2: getTest2,
    getTest3: getTest3,
    //getTest0: getTest0,
    getLogin: getLogin,
    getID: getID,

    displayLienhe2: displayLienhe2,
    displayLichsu2: displayLichsu2,
    getTest32: getTest32,
    displayCocau2: displayCocau2,
    getTest22: getTest22,
    getChuongTrinh2: getChuongTrinh2,




}