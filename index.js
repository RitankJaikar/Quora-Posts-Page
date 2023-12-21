const express=require("express");
const app=express();
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const path=require("path");
const mysql = require('mysql2');

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

const port=8080;
app.listen(port,()=>{
    console.log("listening to port: 8080");
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'DB1',
    password: 'Jaikar123'
});


app.get("/posts",(req,res)=>{   //main page
    let q="SELECT * FROM posts;";
    try{
        connection.query(q,
            (err, posts)=> {
                if(err)     throw err;
                res.render("index.ejs",{posts});
            }
        );
    }
    catch(err){
        console.log(err);
        res.send("some error occurred");
    }
});

app.get("/posts/new",(req,res)=>{   //create new post page
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{  //to create new post
    let {username,content}=req.body;  
    let id=uuidv4();
    let newPost=[[id,username,content]];
    let q="INSERT INTO posts VALUES ?;";
    try{
        connection.query(q, [newPost],
            (err, result)=> {
                if(err)     throw err;
                res.redirect("/posts");
            }
        );
    }
    catch(err){
        console.log(err);
        res.send("some error occurred");
    }
});

app.get("/posts/:id",(req,res)=>{   //to see post in detail
    let {id}=req.params;
    let q=`SELECT * FROM posts WHERE id='${id}';`;
    try{
        connection.query(q,
            (err, result)=> {
                if(err)     throw err;
                let post=result[0]
                res.render("show.ejs", {post});
            }
        );
    }
    catch(err){
        console.log(err);
        res.send("some error occurred");
    }
});

app.get("/posts/:id/edit",(req,res)=>{  //edit post page
    let {id}=req.params;
    let q=`SELECT * FROM posts WHERE id='${id}';`;
    try{
        connection.query(q,
            (err, result)=> {
                if(err)     throw err;
                let post=result[0];
                res.render("edit.ejs",{post});
            }
        );
    }
    catch(err){
        console.log(err);
        res.send("some error occurred");
    }
});

app.patch("/posts/:id",(req,res)=>{     //to update/edit content of specific post 
    let {id}=req.params;
    let newContent=req.body.content;
    let q=`UPDATE posts SET content='${newContent}' WHERE id='${id}';`;
    try{
        connection.query(q,
            (err, result)=> {
                if(err)     throw err;
                res.redirect("/posts");
            }
        );
    }
    catch(err){
        console.log(err);
        res.send("some error occurred");
    }
});

app.delete("/posts/:id",(req,res)=>{    //to delete a post
    let {id}=req.params;
    let q=`DELETE FROM posts WHERE id='${id}';`;
    try{
        connection.query(q,
            (err, result)=> {
                if(err)     throw err;
                res.redirect("/posts");
            }
        );
    }
    catch(err){
        console.log(err);
        res.send("some error occurred");
    }
});