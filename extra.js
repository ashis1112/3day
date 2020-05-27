const getdb=require('../database/database').getdb
const bcrypt=require('bcryptjs')
const crypto=require('crypto')
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
    })
})
}
    