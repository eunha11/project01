const express = require('express')
const app = express()
const port = 5000
const {User} = require("./models/User")
const bodyPaser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/key')

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
.catch(err=> console.log(err))

//바디파서가 서버에 가져올수있게 
//application/x-www-form-urlencoded
app.use(bodyPaser.urlencoded({extended:true}));
//application/json
app.use(bodyPaser.json());

app.get('/', (req, res) => res.send('Hello World!  안녕하세요~~ 2021년 화이팅!! '))
app.post('/register', (req,res)=>{
    //회원가입할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다. 
   
    const user = new User(req.body)

    user.save((err,userInfo)=>{
        if(err) return res.json({success:false, err})
        //console.log(err)
        return res.status(200).json({
            success: true
        })
    })


})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

