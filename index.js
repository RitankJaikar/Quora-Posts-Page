const express=require("express");
const app=express();

const { v4: uuidv4 } = require('uuid');     //used to create unique id
//e.g. uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

var methodOverride = require('method-override');    //used to override POST request to PUT, PATCH, etc.

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));    //finds _method in query string and override accodingly

const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

const port=8080;
app.listen(port,()=>{
    console.log("listening to port: 8080");
});

let posts=[     //store all data of every user, and new users also
    {
        id:uuidv4(),    //unique id for every user
        username:"Raj",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username:"Swati",
        content:"Hardwork is key to success"
    },
    {
        id:uuidv4(),
        username:"Sushant",
        content:"Inner happiness is true happiness"
    },
    {
        id:uuidv4(),
        username:"Richa",
        content:"Today, I got my first internship"
    }
];

app.get("/posts",(req,res)=>{   //main page
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{   //create new post
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{  //POST request, to create new post
    let {username,content}=req.body;    //username and content of new post
    let id=uuidv4();    //creating id for new post
    posts.push({id,username,content});     //adds new post with username and content
    res.redirect("/posts");     //redirects to /post route
});

app.get("/posts/:id",(req,res)=>{   //to see post in detail
    let {id}=req.params;            //page is redirected to the user's post on the bais of id
    let post=posts.find((p)=> id===p.id);   //find post for exact id in posts array 
    res.render("show.ejs", {post});
});
                                        //try with hoppscotch
app.patch("/posts/:id",(req,res)=>{     //to update/edit content of specific post using patch  
    let {id}=req.params;    //storing id
    let newContent=req.body.content;    //storing new/updated content
    let post=posts.find((p)=> id===p.id);   //finding post for exact id in posts array
    post.content=newContent;    //updating content
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{  //to edit the post content
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});    //renders edit page to edit post content
});

app.delete("/posts/:id",(req,res)=>{    //to delete a post
    let {id}=req.params;
    posts=posts.filter((p)=> id!==p.id);    //post with :id is filtered out
    res.redirect("/posts");
});