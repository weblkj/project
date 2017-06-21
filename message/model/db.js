//主要方法
var MongoClient = require("mongodb").MongoClient;
//1.建立连接
function _connectDB(callback){
    var url = "mongodb://localhost:27017/web1702";
    MongoClient.connect(url,function(err,db){
        if(err){
            callback(err,null);
            return;
        }
        callback(err,db);
    })
}
//2.新增
exports.insertOne=function(collName,json,callback){
    //2.1建立连接(获取db对象)
    _connectDB(function(err,db){
        db.collection(collName).insertOne(json,function(err,result){
            callback(err,result);
            db.close();
        })
    })
};
//3.查询
exports.find=function(collName,json,C,D){
    //根据参数个数，判断3,4位分别是什么含义
    if(arguments.length==3){
        var callback = C;
        //从第0条开始查
        var skipnumber = 0;
        //每页查几条
        var limit = 0;
    }else if(arguments.length==4){
        var callback = D;
        var args = C;
        //从第skipnumber条开始查
        //var skipnumber = (args.page-1)*args.size||0;
        var skipnumber = args.page*args.size||0;
        //每页查几条
        var limit = args.size||0;
        //排序
        var sort = args.sort||{};
    }else{
        throw new Error("find函数的参数个数必须是3个或4个");
        return;
    }

    _connectDB(function(err,db){
        var allDatas = db.collection(collName).find(json).skip(skipnumber).limit(limit).sort(sort);
        allDatas.toArray(function(err,docs){
            if(err){
                callback(err,null);
                db.close();
                return;
            }
            callback(err,docs);
            db.close();
        })
    })
};
//4.删除
//db.collection("student").remove({})
exports.deleteMany=function(collName,json,callback){
    _connectDB(function(err,db){
        //删除语句
        db.collection(collName).deleteMany(json,function(err,result){
            callback(err,result);
            db.close();
        })
    });
};
//5.修改
exports.updateMany=function(collName,json1,json2,callback){
    _connectDB(function(err,db){
        db.collection(collName).updateMany(json1,json2,function(err,result){
            callback(err,result);
            db.close();
        });
    });
};
//6.关闭连接

//分页
exports.getAllCount = function(collectionName,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).count({}).then(function(count){
            callback(count);
            db.close();
        })
    })
}
