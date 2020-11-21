const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;

var path = require('path'); 

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());



movieData = require("./data.json");

let users=[]
let movies=[]
function readData(){
    const filename = "users.json";
    const moviename = "data.json";
    const jsonMovieContent = fs.readFileSync(moviename, 'utf-8');
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    users = JSON.parse(jsonContent);
    movies = JSON.parse(jsonMovieContent);
}

function saveData(){
    const filename = "users.json";
    const jsonData = JSON.stringify(users);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/movie", (req, res)=>{
    readData();
    res.send(JSON.stringify(users));    
})

//To display the movie names
app.get("/movie/display", (req, res)=>{
    readData();
    res.send(JSON.stringify(movies));    
})

//display genre of movie
app.get("/movie/genre", function(req, res)
{
    keyword = req.query.sType;
    searchGenre = [];
    movieData.forEach(element =>
    {
        if(keyword == element.genres)
        {
            searchGenre.push(element.title); 
        }
    });
    
    res.setHeader('Content-Type', 'text/html');
    var i = 0;
    var max=searchGenre.length;
    //send multiple responses to the client
    for (; i < max; i++) {
      res.write('<li>'+ searchGenre[i] + '</li>');
    }
    res.write('<a href="http://localhost:3333/Home" >'  + "Back" + '</a>' )
    //end the response process
    res.end(); 
 
})

//display category of movie
app.get("/movie/category", function(req, res)
{
    keyword = req.query.cType;
    searchCategory = [];
    movieData.forEach(element =>
    {
        if(keyword == element.category)
        {
            searchCategory.push(element.title); 
        }
    });
    res.setHeader('Content-Type', 'text/html');
    var i = 0;
    var max=searchCategory.length;
    //send multiple responses to the client
    
    for (; i < max; i++) {
      res.write('<li>'+ searchCategory[i] + '</li>');
    }

    res.write('<br>')
    res.write('<a href="http://localhost:3333/Home" >'  + "Back" + '</a>' )
    //end the response process
    res.end();
})


app.post('/movie', (req, res)=>{
    if (users.length == 0)
        readData();
    let body = req.body;
    users.forEach(
        e =>{
            if(e.userName == body.userName)
                res.send("User already exists");
        }
    );
    users.push(body);  
    saveData();
    res.send("User registered successfully");
})


app.post('/movie', (req, res)=>{
    if (users.length == 0)
        readData();
    let body = req.body;
    users.forEach(
        e =>{
            if(e.userName == body.userName)
                res.send("User already exists");
        }
    );
    users.push(body);  
    saveData();
    res.send("User registered successfully");
})

app.put("/movie", (req, res)=>{
    if(users.length == 0)
        readData();
    let body = req.body;
   
    for (let index = 0; index < users.length; index++) {
        let element = users[index];
        if (element.userName == body.userName) {
            element.password = body.password;
            element.dateOfBirth = body.dateOfBirth;
            element.gender = body.gender;
            saveData();
            res.send("User updated successfully");
        }
    }
 
})

app.delete("/movie/:userName", (req, res)=>{
    if (employees.length == 0)
        readData();
    let body = req.body;
    employees.pop(body);  
    saveData();
    res.send("User deleted successfully");
})

app.listen(1234, ()=>{
    console.log("Server available at 1234");
})