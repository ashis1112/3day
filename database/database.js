const mongodb=require('mongodb')
const Mongoclient=mongodb.MongoClient

let db

function  mongoconnect(params) {
    Mongoclient.connect("mongodb+srv://noder:nodejs@cluster0-1wmiy.mongodb.net/ojtwebhibe1?retryWrites=true&w=majority")
    .then(data=>{
        db=data.db
        console.log('database connect')
    })
    .catch(err=>{
        console.log(err)
    })
}

function getdb(params) {
    if(db){
        return db
    }
    throw 'no database found'
}

exports.mongoconnect=mongoconnect
exports.getdb=getdb