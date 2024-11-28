import db from '../../../models/index';


let getAllUsers = async (req, res) => {
    const [row, fileds] = await db.execute('SELECT * FROM users');
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewUser = async (req, res) => {
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllUsers, createNewUser
}