import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let title=[];
let content=[];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/home",(req,res) => {
    res.render("home.ejs");
})

app.get("/create",(req,res) => {
    res.render("create.ejs")
})

app.post("/home",(req,res) => {
    
 if (req.body['title'] && req.body['title'] !== "" && req.body['content'] && req.body['content'] !== "") {
    
    if(!title.includes(req.body["title"])){
      content.push(req.body["content"])
      title.push(req.body["title"])
  }
  }
    res.render("home.ejs",{carr:content,tarr:title})
})

app.get("/delete", (req, res) => {
    res.render("delete.ejs");
});

app.post("/delete", (req, res) => {
    const id = req.body["id"]; 

    if (id >= 0 && id < title.length) {
  
        title.splice(id, 1)
        content.splice(id, 1);
        res.render("home.ejs",{carr:content,tarr:title});
    } 
    else {
        res.status(404).send("Post not found.");
    }
});

app.get("/update", (req, res) => {
    res.render("update.ejs");
});

app.post("/update", (req, res) => {
    const id = req.body["id"]; 
    const newT=req.body['title']
    const newC=req.body['content'];

    if (id >= 0 && id < title.length) {
  
        title.splice(id,1,newT);
        content.splice(id,1,newC);
        res.render("home.ejs",{carr:content,tarr:title})
    } 
    else {
        res.status(404).send("Post not found.");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


