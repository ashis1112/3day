const getdb=require('../database/database').getdb
const bcrypt=require('bcryptjs')
const crypto=require('crypto')
// const {validationResult}=require('express-validator')
exports.getuser=(req, res, next)=>{
    res.status(200).json('get success')
}

exports.postuser=(req,res)=>{}