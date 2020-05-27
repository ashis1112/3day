var express = require('express');
var router = express.Router();
// const Users=require('../model/user')
const {getuser,postuser,getlogin,postlogin}=require('../controlle/users')
// const {check,body}=require('express-validator')
/* GET users listing. */
router.get('/users',getuser);

router.post('/users',postuser)

router.get('/login',getlogin)

router.post('/login',postlogin)

module.exports = router;
