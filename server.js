const express=require('express')
const body_parser=require('body-parser')
const pool=require('./database')
const app=express()
app.use(express.static(__dirname))
app.use(body_parser.json())
app.set('view engine','ejs')
app.use(body_parser.urlencoded({extended:true}))
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
})
app.post('/',function(req,res){
    var fname=req.body.fname;
    var lname=req.body.lname;
    var phone=req.body.phone;
    var mail=req.body.mail;
    var degree=req.body.degree;
    var course=req.body.course;
    var sql="INSERT INTO studentdetails(fname,lname,phone,mail,degree,course) VALUES(?,?,?,?,?,?);"
    pool.query(sql,[fname,lname,phone,mail,degree,course],function(err,result){
        if(err) throw err
        res.redirect('/frontend')
    })
})
    app.get('/frontend',function(req,res){
        var sql="SELECT * FROM studentdetails;"
        pool.query(sql,function(err,result){
            if(err) throw err
            res.render(__dirname+'/frontend',{studentdetails:result})
        })
    })
app.listen(4000)