require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: [
            "https://sudiptacodetogether.netlify.app",
            "http://localhost:3000",
        ],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

app.use(
    cors({
        origin: [
            "https://sudiptacodetogether.netlify.app",
            "http://localhost:3000",
        ],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.use(bodyParser.json());

const loginRoute = require("./routes/Login");
const signupRoute = require("./routes/SignUp");
const groupsRoute = require("./routes/Groups");
const codeEditorRoute = require("./routes/CodeEditor");
const socketSetup = require("./socket");

app.use("/api/login", loginRoute);
app.use("/api/signup", signupRoute);
app.use("/api", groupsRoute);
app.use("/api", codeEditorRoute);

// Setup Socket.IO
socketSetup(io);

console.log(
    "ENV CHECK:",
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    process.env.DB_NAME
);


const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
