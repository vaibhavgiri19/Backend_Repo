const express = require('express')
const app = express()
const port = 4000
app.get('/home',(req,res)=>{
    res.send("Hello World ,THis is my about page")
})
app.get('/about',(req,res)=>{
    res.send("Hello World ,THis is my about page")
})
app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})