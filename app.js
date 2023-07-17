const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = [];
let workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  
  let day = date.getDate();

  res.render("list", {
    ListTitle: day,
    newListItem: items
  });

});

app.post("/", function(req, res){

  console.log(req.body);
  let item = req.body.newItem;

  if(req.body.list === "work"){
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
  
    res.redirect("/");
  }

});

app.get("/work", function(req, res){
  res.render("list", {
    ListTitle: "work List",
    newListItem: workItems
  });
});

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
