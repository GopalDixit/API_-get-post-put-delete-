const express = require('express')
const dbConnect = require('./mongodb')
const mongodb = require('mongodb')
const app = express();

app.use(express.json()) // we use this to get data from postman(request lete hai bahar se)

app.get('/',async function(req,resp){
    let data =await dbConnect()
    data =await data.find().toArray()
    resp.send(data)
})

app.post('/',async function(req,resp){
    // console.log(req.body) // "req.body" se Hamare pass postman se data aaya

    // Now connect karo mongodb ko us data se jo postman se aya
    let data = await dbConnect()
    let result = await data.insert(req.body)
    resp.send(result)
})

app.put('/',async function(req,resp){
    let data = await dbConnect();
    let result = await data.updateOne(
        {name :"V-8"},
        {$set:req.body}
    )
    // resp.send({name:"Gopal"})
})

//********* */
// id nahi "_id" likha jata h
// or sirf id nam ni objectId nam hota hai jo hame mongodb se uthana pdhega
app.delete("/:id",async function(req,resp){
    let data = await dbConnect()
    let result = await data.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
    resp.send(result)
})
app.listen(5600)