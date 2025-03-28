const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;


const cors = require("cors");
app.use(cors());

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

var bodyParser = require("body-parser");
const BaseResponse = require("./base.response");

app.use("/", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let blogs = [
    {
        "id": 0.14119349310726625,
        "title": "Ninedev Test 01",
        "body": "500000",
        "author": "mario"
    },
    {
        "id": 0.2539564750904526,
        "title": "Ninedev Test 02",
        "body": "400000",
        "author": "mario"
    },
    {
        "id": 0.6664675710511545,
        "title": "Ninedev Test 03",
        "body": "300000",
        "author": "yoshi"
    }
];
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

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/upload-image', (req, res) => {
    res.render('upload');
})

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

app.get('/refresh', (req, res) => {
    try {
        blogs = [
            {
                "id": 0.14119349310726625,
                "title": "Ninedev Test 01",
                "body": "500000",
                "author": "mario"
            },
            {
                "id": 0.2539564750904526,
                "title": "Ninedev Test 02",
                "body": "400000",
                "author": "mario"
            },
            {
                "id": 0.6664675710511545,
                "title": "Ninedev Test 03",
                "body": "300000",
                "author": "yoshi"
            }
        ]
        res.json(new BaseResponse(blogs, 200, "Successful!"));
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
            res.json(new BaseResponse(1, 200, "Successful!"));
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
