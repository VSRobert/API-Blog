import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "REST:API",
    content:
      "RESTful APIs have a uniform and consistent interface. This uniformity is achieved through the use of standard HTTP methods (GET, POST, PUT, DELETE, etc.) and standard conventions. REST is stateless, meaning that each request from a client to a server contains all the information needed to understand and fulfill that request. The server doesn't store any information about the client between requests.",
    author: "Robert Văidianu",
    date: new Date(),
  },
  {
    id: 2,
    title: "Express.js",
    content:
      "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features to develop web and mobile applications. It is designed to make the process of building web applications with Node.js easier and more efficient.",
    author: "Robert Văidianu",
    date: new Date(),
  },
  {
    id: 3,
    title: "Body-Parser",
    content:
      "body-parser is a middleware for Express.js, a popular web application framework for Node.js. It is used to parse the incoming request body, making it available under the req.body property. Since Express 4.16.0, the express module includes express.json() and express.urlencoded() middleware, which eliminates the strict dependency on body-parser. However, body-parser is still widely used and provides additional features.",
    author: "Robert Văidianu",
    date: new Date(),
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//1: GET All posts
app.get("/posts", (req, res) => {
  res.json(posts);                       
})

//2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id); 
  const findPost = posts.find((p) => p.id === id); 
  if (!findPost) return res.status(404).json({message: "Post wasn't found."});
  res.json(findPost);                                   
});

// 3: POST a new post
app.post("/posts", (req, res) => {
  const addNewPost = {
    id : posts.length + 1, 
    title : req.body.title, 
    content : req.body.content, 
    author : req.body.author,  
    date : new Date()  
  }
  posts.push(addNewPost); 
  console.log(posts.slice(-1));
  res.json(addNewPost);
});

// 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const existingPost = posts.find((p) => p.id === id);
  const replacePost = {
    id: id, 
    title: req.body.title || existingPost.title,
    content: req.body.content || existingPost.content,
    author: req.body.author || existingPost.author,
    date: new Date() || existingPost.date
  }
  const searchIndex = posts.findIndex((p) => p.id === id);
  posts[searchIndex] = replacePost;
  res.json(replacePost);
});

// 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((p) => p.id === id);
  if (searchIndex > -1) {
    posts.splice(searchIndex, 1);
    res.sendStatus(200);
  } else {
    res.status(404);
    res.json({error :`Joke with id ${id} not found. No jokes were deleted.`})
  }
});
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
