const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors())
const port =3000;
// mongoose connection;

mongoose.connect("mongodb://localhost:27017/aptechdata5");
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', function() {
     console.log('Connected successfully to MongoDB');
   });


// mongo scheama
const datascheama = {
   name:String,
   email:String,
   id:Number
};



const modeldata = mongoose.model("news",datascheama);



//post method
app.post("/post",async(req,res)=>{
    console.log("inside post function");
    const data = new modeldata({
        name:req.body.name,
        email:req.body.email,
        id:req.body.id});
      
        const val = await data.save();
        res.json(val);
    
    })

//get method

app.get("/data",async(request,response)=>{

    const data = await modeldata.find();
    response.json(data);
      
  })

// put api

app.put("/update/:id",async(req,res)=>{
     
    let updateid =req.params.id;
    let updatename =req.body.name;
    let updateemail =req.body.email;

    if (updatename !== undefined && updateemail !== undefined) {
        // Both name and email are provided, update both fields
        const updatedData = await modeldata.updateOne({ id: updateid }, { $set: { name: updatename, email: updateemail } });
        res.json(updatedData);
    } else {
        // Either name or email or both are missing in the request body
        res.status(400).json({ error: "Both name and email must be provided to update." });
    }
   
})
// delete api
app.delete('/delete/:id', async (req, res)=> {
    var updateid = req.params.id;
    const result = await modeldata.deleteOne({id:updateid})
     res.send(result);
})




app.listen(port,()=>{
    console.log(  `welcome aboard! App listening at http://localhost:${port}`);
})
