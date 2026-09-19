const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

//rendering
app.get('/',(req,res)=>{
    fs.readdir('./files',(err,files)=>{         //console.log(files)
        res.render('script',{files:files})
    })
})


//post route
app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,`${req.body.details}`,(err)=>{             //console.log(req.body.title)
        res.redirect('/')
    })
})


// title,details are refrenced from "name" attribute from input field
//Dynamic route
app.get(`/file/:fileName`,(req,res)=>{
           // console.log(req.params)    res.send(req.params) console.log(data)
    fs.readFile(`./files/${req.params.fileName}`,'utf-8',(err,data)=>{
        res.render('fileDetail',{title:req.params.fileName,data:data})
    })

})

//Edit task
app.get('/file/edit/:fileName',(req,res)=>{
    let fileName = req.params.fileName
    fs.readFile(`./files/${fileName}`,'utf-8',(err,data)=>{
        console.log(data)
        res.render('edit',{fileName:fileName,data:data})
    })

})  

//Edit approved
app.post(`/edit/:fileName`,(req,res)=>{
    const fileName = req.params.fileName
    fs.writeFile(`./files/${fileName}`,req.body.details,(err)=>{
            res.redirect('/')
    })
 
})


app.listen(3000,()=>{
    console.log("running server at 3000")
})