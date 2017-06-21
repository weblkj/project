var db = require("../model/db.js");
var sd = require("silly-datetime");
var formidable = require("formidable");


exports.add1 = function(req,res){
    var nt = sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
    var collName = "student";

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var json = {"name":fields.name,"message":fields.message,"time":nt};
        console.log(fields);
    if(fields.hasOwnProperty("name")&&fields.name!=""||fields.message!=""){
        db.insertOne(collName,json,function(err,data){
            if(err){
                console.log("插入失败");
                return;
            }
            console.log("插入成功");
            db.find(collName,{},function(err,data){
                if(err){
                    return;
                }
                res.redirect("/");
            });
        });
    }else{
        db.find(collName,{},function(err,data){
            if(err){
                return;
            }
            res.redirect("/")
        });
    }
    });
};
exports.showIndex=function(req,res){

    var nt = sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
 var collName = "student";
 var json = {"name":req.query.name,"message":req.query.message,"time":nt};
 db.find(collName,{},function(err,data){
 if(err){
 return;
 }
 var content = data;
 res.render("index",{"content":content});
 });
 };

exports.delete = function(req,res){
    var nt = sd.format(new Date(),'YYYY-MM-DD HH:mm:ss');
    var collName = "student";
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var i = fields.name;
    db.find(collName,{},function(err,data){
        if(err){
            return;
        }
        var content = data;
        console.log(content);
        console.log(i);
            var json = content[i]._id;
            db.deleteMany(collName,{"_id":json},function(err,data){
                if(err){
                    return;
                }
                db.find("student",{},function(err,data){
                    if(err){
                        return;
                    }
                    res.redirect("/")
                });
            });

    });
    });
};

