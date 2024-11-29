
import db from '../../../models/index';
//import { Promise, where } from 'sequelize';



let createNewPost = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.Post.create({
                id: data.id,
                title: data.title,
                content: data.content,
                adminId: data.adminId,
                type: data.type,
            })
            resolve('Đã thêm')
        } catch (e) {
            reject(e);
        }
    })
}


let getAllPost = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let posts = await db.Post.findAll({
                raw: true,
            });
            resolve(posts)
        } catch (e) {
            reject(e)
        }
    })
}

let getPostInfobyId = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await db.Post.findOne({
                where: { id: postId },
                raw: true,
            })
            if (post) {
                resolve(post)
            }
            else {
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}


let updatePostData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await db.Post.findOne({
                where: { id: data.id }
            })
            if (post) {
                post.title = data.title;
                post.content = data.content;
                post.adminId = data.adminId;
                post.type = data.type;
                await post.save();
                let allPosts = await db.Post.findAll();
                resolve(allPosts);
            } else {
                resolve();
            }
        } catch (e) {
            console.log(e);
        }
    })
}

let deletePostById = (postId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let post = await db.Post.findOne({
                where: { id: postId }
            })
            if (post) {
                await post.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    createNewPost: createNewPost,
    getAllPost: getAllPost,
    getPostInfobyId: getPostInfobyId,
    updatePostData: updatePostData,
    deletePostById: deletePostById,
}