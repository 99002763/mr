const express = require("express");
const app = express();
//for loading images
app.use(express.static('images'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/loading.html");
})

app.get("/Login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
})

app.get("/Home", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.listen(3333, () => {
    console.log("Client App running at 3333");
})