const path = require("path")
const fs = require("fs") 

const express = require("express") 
const app = express() 

app.set('view engine' ,'ejs') ;
app.use(express.json())
app.use(express.urlencoded({extended :true}))

app.use(express.static(path.join(__dirname ,  "public")))


// main task landing page

app.get("/" , function(req , res){
    fs.readdir(`./files` , function(err , files ){
 res.render("index" , {files : files})    // we can send data as object in ejs file 
    })
}) 

// open single task 
  app.get("/file/:filename", function(req, res) {
    const filePath = path.join(__dirname, "files", req.params.filename);
    fs.readFile(filePath, "utf-8", function(err, filedata) {
        if (err) {
            console.error("Error reading file:", err);
            return res.status(404).send("File not found or an error occurred while reading the file.");
        }
        res.render("show", { filename: req.params.filename, filedata: filedata });
    });
});

// edit the name of task



// create task
app.post("/create" , function(req , res){
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt` , req.body.description , function(err){
res.redirect("/")
  })
    })


app.listen(3000)









