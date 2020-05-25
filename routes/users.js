var express = require('express');
var router = express.Router();
const Users=require('../model/user')

/* GET users listing. */
router.get('/users',(req, res, next)=>{
  res.status(200).json('get success')
});

router.post('/users',(req,res)=>{
  const {name,email,password}=req.body
  const user=new Users(name,email,password)
  user.register()
  .then(value=>{
    console.log(value)
  })
  .catch(err=>{
    console.log(err)
  })
  
})

module.exports = router;
