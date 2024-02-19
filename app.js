import express from "express"
import ejs from "ejs"
import bodyParser from "body-parser";
import getDate from './my-functions.js';


const app = express();
const port = 3000;

let blogList = [];
let postData;
let updatePostData;

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

// POST request made to "/create-new-post" path
app.post("/create-new-post", (req, res) => {

  postData = {
    blogNumber:  blogList.length + 1,
    blogTitle: req.body.blogTitle,
    blogBody: req.body.blogBody
  };
  
  blogList.push(postData);
  console.log(`This is  the request body (req.body) object: ${JSON.stringify(req.body)}`);
  console.log(`This is  the response body (res.body) object: ${res.body}`);

  console.log(`This is a list of my created blog posts: ${blogList}`);
  res.render("index.ejs", {newPost: postData, allPosts: blogList});  // must access these values on the client-side by using "newPost" and "allPost" values first

  console.log(`This is  the response body (res.body) object: ${JSON.stringify(postData)}`);

});

// GET request made to "/edit-post" path
app.get("/edit-post", (req, res) => {
  const todaysDate = getDate.currentDate();
  res.render("edit-post.ejs", {currentDate: todaysDate});
});

app.post("/edit-post", (req, res) => {
  console.log(req.body);

  updatePostData = {
    updatedBlogNumber:  blogList.length + 1,
    editedPostTitle: req.body.editedBlogTitle,
    editedPostBody: req.body.editedBlogBody
  };
  
  console.log(`${JSON.stringify(req.body)}`);
  blogList.push(postData);

  console.log(`This is a list of my created blog posts: ${blogList}`);
  res.render("index.ejs", { updatedPost: updatePostData, allPosts: blogList}); 

  console.log(`${JSON.stringify(updatePostData)}`);
  console.log(`${JSON.stringify(blogList)}`);



});



app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
})