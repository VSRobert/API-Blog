# API-Blog
Blog App based on REST API

This is a Blog App API with In-memory data store (no database involved, therefore, after a server restart all the modifications will be lost).

There are 2 servers, one for API itself under server.js on port 4000 and the other one is for API usage under index.js on port 3000.

I've used Express.js, body-parser and REST API.

You can Post, Edit or Delete a specific post.
Every Post have a title, content and author and you will receive also the date when you post it or update it.

For this to work you need to run first the server.js and secondly run index.js. Both of them should run on the same time.


