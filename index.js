const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

const cors = require("cors");
app.use(cors());

var bodyParser = require("body-parser");
const BaseResponse = require("./base.response");

app.use("/", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let blogs = [];
let accounts = [
    {
        id: 1,
        username: 'admin',
        password: '123@a',
        role: 'ADMIN'
    },
    {
        id: 2,
        username: 'ninedev',
        password: '123@a',
        role: 'USER'
    }
];

app.get('/blogs', (req, res) => {
    try {
        res.json(new BaseResponse(blogs, 200, "Successful!"));
    } catch (error) {
        res.json(new BaseResponse(404, "Error!"));
    }
})

app.post('/blogs', (req, res) => {
    try {
        blogs.push(req.body);
        res.json(new BaseResponse(req.body, 200, "Successful!"));
    } catch (error) {
        res.json(new BaseResponse(404, "Error!"));
    }
})

app.get('/blogs/:id', (req, res) => {
    try {
        const { id } = req.params;
        const blog = blogs.find(item => item.id === +id);
        res.json(new BaseResponse(blog, 200, "Successful!"));
    } catch (error) {
        res.json(new BaseResponse(404, "Error!"));
    }
})

app.delete('/blogs/:id', (req, res) => {
    try {
        const { id } = req.params;
        const index = blogs.findIndex(item => item.id === +id);
        if (index !== -1) {
            blogs.splice(index, 1);
            res.json(new BaseResponse(index, 200, "Successful!"));
        } else {
            res.json(new BaseResponse(404, "Error!"));
        }
    } catch (error) {
        res.json(new BaseResponse(404, "Error!"));
    }
})

app.patch('/blogs/:id', (req, res) => {
    try {
        const { id } = req.params;
        const index = blogs.findIndex(item => item.id === +id);
        if (index !== -1) {
            blogs[index] = {
                id: +id,
                ...req.body
            };
            res.json(new BaseResponse(blogs[index], 200, "Successful!"));
        } else {
            res.json(new BaseResponse(404, "Error!"));
        }
    } catch (error) {
        res.json(new BaseResponse(404, "Error!"));
    }
})

app.post('/account/login', (req, res) => {
    try {
        const { username, password } = req.body;
        const account = accounts.find(item => item.username == username && item.password == password);
        if (account.id) {
            res.json(new BaseResponse(account, 200, "Successful!"));
        }
        res.json(new BaseResponse(404, "Error!"));
    } catch (error) {
        res.json(new BaseResponse(404, "Error!"));
    }
})

server.listen(PORT, () => {
    console.log("listening on *: " + PORT);
});
