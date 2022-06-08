const express=require("express")
const mysql=require("mysql")
const bodyparser=require("body-parser")
const app=express()
const encoder=bodyparser.urlencoded()
app.use(bodyparser.json())
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"project"
})
con.connect(function(error){
    if(error)
    throw error;
    else{
        console.log("Database connected")
    }
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/admission.html")
})

app.get("/view",(req,res)=>{
    res.sendFile(__dirname+"/admission.html")
})


app.get("/cse",(req,res)=>{
    res.sendFile(__dirname+"/cse.html")
})


app.post("/admission",encoder,(req,res)=>{
    console.log("Hii")
    var firstname = req.body.t1;
    var lastname = req.body.t2;
    var fathername= req.body.t3;
    var sslc = req.body.t4;
    console.log(sslc)
    var hsc = req.body.t5;  
    var gender = req.body.t6;
    var email = req.body.t7;
    var number = req.body.t8;
    var sql = `INSERT INTO admission (firstname, lastname, fathername,sslc, hsc, gender,email,phonenumber) VALUES(${con.escape(firstname)},${con.escape(lastname)},${con.escape(fathername)},${con.escape(sslc)},${con.escape(hsc)},${con.escape(gender)},${con.escape(email)},${con.escape(number)})`
    con.query(sql,function(error,result){
        if(error)
        throw error;
        console.log(result)
        res.redirect("/cse")
    })
    // console.log("Hoo")
})
app.post("/cse",encoder,(req,res)=>{
    console.log("Hii")
    var name = req.body.t1;
    
    var birthday= req.body.t3;
    
    
    var depts = req.body.t7;
    var interest=req.body.t8;
    var sql = `INSERT INTO dept (name, birthday,depts,interest) VALUES(${con.escape(name)},${con.escape(birthday)},${con.escape(depts)},${con.escape(interest)})`
    con.query(sql,function(error,result){
        if(error)
        throw error;
        console.log(result)
        res.redirect("/deptdis")
    })
    // console.log("Hoo")
})
app.post("/admission",encoder,(req,res)=>{
    console.log("Hii")
    var firstname = req.body.t1;
    var lastname = req.body.t2;
    var fathername= req.body.t3;
    var sslc = req.body.t4;
    
    var hsc = req.body.t5;  
    var gender = req.body.t6;
    var email = req.body.t7;
    var number = req.body.t8;
    var sql = `INSERT INTO admission (firstname, lastname, fathername,sslc, hsc, gender,email,phonenumber) VALUES(${con.escape(firstname)},${con.escape(lastname)},${con.escape(fathername)},${con.escape(sslc)},${con.escape(hsc)},${con.escape(gender)},${con.escape(email)},${con.escape(number)})`
    con.query(sql,function(error,result){
        if(error)
        throw error;
        console.log(result)
        res.redirect(result)
    })
    // console.log("Hoo")
})


app.post("/search",(req,res)=>{
    var z1 = req.body.t1
    var z2 = req.body.t2
    var sql = "select * from admission where firstname="+con.escape(z1);
    con.query(sql,function(err,result){
        console.log(result);
        if (err) throw err;
        if(result.length>0)
        {
            console.log(result.length)
            res.json(result);
            console.log("Record selected");   
        }
        else{
            res.send("No events found");
        }
        res.end();
    })
})


app.post("/searDept",(req,res)=>{
    var z1 = req.body.t1
    var z2 = req.body.t2
    var z3 = req.body.t3
    var sql = "select * from dept where name="+con.escape(z1);
    var sql = "select * from dept where birthday="+con.escape(z2);
    con.query(sql,function(err,result){
        console.log(result);
        console.log("Hiii")
        if (err) throw err;
        if(result.length>0)
        {
            console.log(result.length)
            res.json(result);
            console.log("Record selected");   
        }
        else{
            res.send("No events found");
        }
        res.end();
    })
})

app.get("/sear",(req,res)=>{
    res.sendFile(__dirname+"/search.html")
})


app.get("/dis",(req,res)=>{
    res.sendFile(__dirname+"/display.html")
})


app.get("/deptdis",(req,res)=>{
    res.sendFile(__dirname+"/disdept.html")
})


app.get("/deptsearch",(req,res)=>{
    res.sendFile(__dirname+"/searDept.html")
})



app.get("/display",(req,res)=>{
    var sql="select * from admission"
    console.log("hi")
    con.query(sql,(error,result)=>
    {
        console.log(result)
        res.json(result)
    })
})
app.get("/disp",(req,res)=>{
    res.sendFile(__dirname+"/disdept.html")
})

app.get("/disdept",(req,res)=>{
    var sql="select * from dept"
    console.log("hi")
    con.query(sql,(error,result)=>
    {
        console.log(result)
        res.json(result)
    })
})


app.listen(8000,function(){
    console.log("Server created")
    
})