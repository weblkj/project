var express = require("express");
var app = express();
var router = require("./controller");
var ejs = require("ejs");
app.set("view engine","ejs");
app.use(express.static("./public"));
app.get("/",router.showIndex);
app.post("/up",router.add1);
app.post("/delete",router.delete);


app.listen(3000);
