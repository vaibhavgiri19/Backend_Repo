const express = require('express')
const app = express()
const port = 3000
const users =[]
app.post('/user',(req,res)=>{
    const user = req.body
    users.push(user)
    res.json({
        message:"Sucessfully submitted",
        data:user

    })
})

app.get('/users',(req,res)=>{

     res.json({
        message:"Sucessfully Retrived",
        data:users

    })

})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

