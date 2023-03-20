const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

const cors = require("cors");
app.use(cors());

app.use("/", express.static("public"));

var bodyParser = require("body-parser");
const BaseResponse = require("./base.response");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let blogs = [
    {
        title: "Nine Dev Blog",
        body: "Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.",
        author: "mario",
        id: 1,
    },
    {
        title: "Running Party!",
        body: "Why do we use it? It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.",
        author: "yoshi",
        id: 2,
    },
];

app.get('/blogs', (req, res) => {
    const response = new BaseResponse(blogs, 200, "Successful!");
    res.json(response);
})

app.post('/blogs', (req, res) => {
    blogs.push(req.body);
    const response = new BaseResponse(req.body, 200, "Successful!");
    res.json(response);
})

app.get('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const blog = blogs.find(item => item.id === +id);
    const response = new BaseResponse(blog, 200, "Successful!");
    res.json(response);
})

app.delete('/blogs/:id', (req, res) => {
    const { id } = req.params;
    const index = blogs.findIndex(item => item.id === id);
    blogs.splice(index, 1);
    const response = new BaseResponse(index, 200, "Successful!");
    res.json(response);
})

server.listen(PORT, () => {
  console.log("listening on *: " + PORT);
});
