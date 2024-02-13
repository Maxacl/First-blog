import express from "express"
import ejs from "ejs"
import bodyParser from "body-parser";
import getDate from './my-functions.js';


const app = express();
const port = 3000;

let blogList = [];

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// GET request made to "/" path
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// GET request made to "/create-new-post" path
app.get("/create-new-post", (req, res) => {
  const todaysDate = getDate.currentDate();
  res.render("create-new-post.ejs", { currentDate: todaysDate });
});

// GET request made to "/view-post" path
app.get("/view-post", (req, res) => {
  const todaysDate = getDate.currentDate();
  res.render("view-post.ejs", { currentDate: todaysDate });
});

// POST request made to "/create-new-post" path
app.post("/create-new-post", (req, res) => {

  let data = {
    blogNumber:  blogList.length + 1,
    blogTitle: req.body.blogTitle,
    blogBody: req.body.blogBody
  };
  
  console.log(req.body);
  blogList.push(data);
  console.log(blogList);
  res.render("index.ejs", {newPost: data, allPosts: blogList}); 
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
})