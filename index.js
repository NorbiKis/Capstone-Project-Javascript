import express from "express";
import bodyParser from "body-parser";

let title = [];
let shortDescription = [];
let blogText = [];
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs", {title: title, shortDesc: shortDescription, blogText: blogText});
})

app.get("/create", (req,res) => {
    res.render("create.ejs");
})

app.get("/delete", (req, res) => {
    res.render("delete.ejs", {title: title, shortDesc: shortDescription, blogText: blogText});
})

app.post("/blog", (req, res) => {
    const postNumber = req.body["blogNumber"].substring(4,req.body["blogNumber"].length);
    const selectedTitle = title[postNumber];
    const selectedShortDesc = shortDescription[postNumber];
    const selectedBlogText = blogText[postNumber]; 

    res.render("blog.ejs", {title: selectedTitle, shortDesc: selectedShortDesc, blogText: selectedBlogText, postNumber: postNumber});
})

app.post("/modify", (req, res) => {
    const postNumber = req.body["postNumber"];
    const selectedTitle = title[postNumber];
    const selectedShortDesc = shortDescription[postNumber];
    const selectedBlogText = blogText[postNumber];
    res.render("modify.ejs", {title: selectedTitle, shortDesc: selectedShortDesc, blogText: selectedBlogText, postNumber: postNumber});
})

app.post("/createPost", (req, res) => {
    title.push(req.body["postName"]);
    shortDescription.push(req.body["shortDesc"]);
    blogText.push(req.body["blogText"]);
    const postCreated = true;
    res.render("create.ejs", {postCreated: postCreated});
})

app.post("/deletePost", (req, res) => {
    const hiddenText = req.body["Delete"];
    for (let index = 0; index < hiddenText.length; index++) {
        title.splice(hiddenText[index], 1);       
    }
    for (let index = 0; index < hiddenText.length; index++) {
        shortDescription.splice(hiddenText[index], 1);       
    }
    for (let index = 0; index < hiddenText.length; index++) {
        blogText.splice(hiddenText[index], 1);       
    }
    res.render("delete.ejs", {title: title, shortDesc: shortDescription, blogText: blogText});
})

app.post("/modifyPost", (req, res) => {
    const postNumber = req.body["postNumber"];

    title[postNumber] = req.body["postName"];
    shortDescription[postNumber] = req.body["shortDesc"];
    blogText[postNumber] = req.body["blogText"];

    const selectedTitle = title[postNumber];
    const selectedShortDesc = shortDescription[postNumber];
    const selectedBlogText = blogText[postNumber];

    const postModified = true;
    res.render("modify.ejs", {title: selectedTitle, shortDesc: selectedShortDesc, blogText: selectedBlogText, postModified: postModified, postNumber: postNumber});
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
})