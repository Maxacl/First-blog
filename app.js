import express from "express"
import ejs from "ejs"
import bodyParser from "body-parser";
import getDate from './my-functions.js';

const app = express();
const port = 3000;

let blogList = [];
let postData;
let editedPost;
let updatedBlogList;

app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// GET request made to "/" path
app.get("/", (req, res) => {
  res.render("index.ejs", {blogList: blogList});
});

// GET request made to "/create-new-post" path
app.get("/create-new-post", (req, res) => {
  const todaysDate = getDate.currentDate();
  res.render("create-new-post.ejs", { currentDate: todaysDate });
});

// POST request made to "/create-new-post" path
/* 
This route handler populates the global "postData" variable, 
req.body.blogTitle -> "blogTitle" is the 'name' attribute of the <textarea> element in "create-new-post.ejs"
req.body.blogBody -> "blogBody" is the 'name' attribute of the other <textarea> element in "create-new-post.ejs"

The 'postData' local object is then populated with the above data, 'req.body.blogTitle', 'req.body.blogBody' and 'blogList' data.
Remember, this actual populates the global variable 'postData'. This, in turn, makes this data to all other event handlers in the module 'app.js'

Finally, 'res.render("index.ejs", {newPost: postData, allPosts: blogList})' then sends a 'res' or 'response' object and renders the 'index.ejs' file. Now, it also
passes the 'postData' global variable as a value to the 'newPost' key. and the 'blogList' value to the 'allPosts' key to the 'index.ejs' once the file is rendered.

*/
app.post("/create-new-post", (req, res) => {
  postData = {
    blogNumber:  blogList.length + 1,
    blogTitle: req.body.blogTitle,
    blogBody: req.body.blogBody
  };
  blogList.push(postData);

  console.log(`POST sent to "/create-new-post". blogList: ${JSON.stringify(blogList)}`);
  //FIXME: Possibly redirect to "/"
  res.render("index.ejs", {newPost: postData, allPosts: blogList});  // must access these values on the client-side by using "newPost" and "allPost" values first
});



// GET request made to "/edit-post" path
// We use the "postData" global variable that was populated once the original "newPost" was made with the create-post-endpoint. Remember, "postData" is
// global and can be shared with different route handlers. The same is true for "allPosts".
// 
// This makes it so once we render the edit-post.ejs file to the browser, the origianl posts (newPost) will be rendered as well in the textarea for the user
app.get("/edit-post", (req, res) => {
  const todaysDate = getDate.currentDate();
  console.log(`GET sent to "/edit-post". 'req.body':${JSON.stringify(req.body)}`);
  res.render("edit-post.ejs", {newPost: postData, allPosts: blogList});
});

app.post("/edit-post", (req, res) => {
  console.log(`POST sent to '/edit-post'. 'req.body':${JSON.stringify(req.body)}`);
  
  editedPost = {
    editedPostNumber: postData.blogNumber,
    editedPostTitle: req.body.editedBlogTitle,
    editedPostBody: req.body.editedBlogBody
  };
  blogList.push(editedPost);

  let indexToRemove = blogList.findIndex(obj => obj.blogNumber === editedPost.editedPostNumber);

  if (indexToRemove !== -1) {
    blogList.splice(indexToRemove, 1);
  };


  console.log(blogList);
  console.log(`POST sent to "/edit-post". This is the "blogList"${JSON.stringify((blogList))}`);
  res.render("index.ejs", { editedPost: editedPost, allPosts: blogList}); 




});



app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
})