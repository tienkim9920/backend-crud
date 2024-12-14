const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;

const cors = require("cors");
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

var bodyParser = require("body-parser");
const BaseResponse = require("./base.response");
const path = require("path");

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

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; script-src 'self';"
    );
    next();
});

app.get('/', (req, res) => {
    res.render('index');
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
