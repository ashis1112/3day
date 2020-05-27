const getdb=require('../database/database').getdb
const bcrypt=require('bcryptjs')
const crypto=require('crypto')
const { Validator } = require('node-input-validator');
 
// const {validationResult}=require('express-validator')
exports.getuser=(req, res, next)=>{
    res.status(200).json('get success')
}

exports.postuser=(req,res)=>{
  const {name,email,password}=req.body
  const value = new Validator(req.body, {
    email: 'required|email',
    password: 'required'
  });
  value.check().then((matched) => {
    if (!matched) {
      return res.status(422).json({err:value.errors});
    }
    // console.log(req.body)
  });
  // const error=validationResult(req)
  let token
  crypto.randomBytes(32,(err,Buffer)=>{
    if(err){
      console.log(err)
    }
    token=Buffer.toString('hex')
  })
  req.db.collection('user').find({email:email}).toArray()
    .then(data=>{
      data.forEach(e => {
        if(email === e.email ){
            return  res.status(400).json("email exist")
        }else{
        return bcrypt.hash(password,10)
        .then(haspas=>{
            req.db.collection('user').insert({
            name:name,
            email:email,
            password:haspas,
            token:token
          }).then(data=>{
              console.log(data)
              res.status(200).json({msg:'data posted successfully',data:data})
              res.redirect('/users')
            })
            .catch(err=>{
              console.log(err)
            })
        .catch(err=>{
          console.log(err)
        })

      })
    }
}
    
  
// exports.getlogin=(req,res)=>{
//     res.status(200).json("do login")
// }

// exports.postlogin=(req,res)=>{

//     const {email,password,token}=req.body
//     const value = new Validator(req.body, {
//       email: 'required|email',
//       password: 'required'
//     });
//     value.check().then((matched) => {
//       if (!matched) {
//         return res.status(422).json({err:value.errors});
//       }
//     });
//     // const error=validationResult(req)
//     req.db.collection('user').find({email:email}).toArray()
//     .then(data=>{
//       console.log(data)
//       data.forEach(ele => {
//         console.log(ele)
//           if(token != ele.token){
//            return  res.status(400).json("token does not match")
//           }
//           return bcrypt.compare(password,ele.password)
//           .then(result=>{
//             if(!result){
//               res.status(400).json({msg:"password does not match"})
//             }
//             res.status(200).json({msg:'u login',yourname:ele.name})
//             req.getuser=ele
//             return res.redirect('/login')
//           })
//           .catch(err=>{
//             console.log(err)
//           })
//       })
//     }).catch(err=>console.log(err))
    
//   }