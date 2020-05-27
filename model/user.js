
class User{
    constructor(name,email,password){
        this.name=name,
        this.email=email,
        this.password=password
    }
    register(){
        let db=getdb()
        return  db.collection('user').insertOne(this)
        .then(result=>{
          console.log(result)
        })
        .catch(err=>{
          console.log(err)
        })
      }
}
module.exports=User