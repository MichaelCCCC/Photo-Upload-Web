var express = require('express');
var app = express();
var multer = require('multer');
var cors = require('cors');

app.use(cors());
//make data folder accessible from URL
app.use(express.static('data'));
var storage_male = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'data/male')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
  })
var storage_female = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'data/female')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
  })
  
  var upload_male = multer({ storage: storage_male }).single('file');
  var upload_female = multer({ storage: storage_female }).single('file');
  

app.post('/upload/male',function(req, res) {
    
    upload_male(req, res, function (err) {
     
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
          // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
          // An unknown error occurred when uploading.
        } 
        
        return res.status(200).send(req.file)
        // Everything went fine.
      })
});
app.post('/upload/female',function(req, res) {
    
    upload_female(req, res, function (err) {
     
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
          // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(500).json(err)
          // An unknown error occurred when uploading.
        } 
        
        return res.status(200).send(req.file)
        // Everything went fine.
      })
});
app.get('/view/male', function(req, res){
    const Folder = 'data/male';
    const fs = require('fs');
    var obj = {
        table: []
     };

    fs.readdir(Folder, (err, files) => {
        files.forEach(file => {
            console.log(file);
            obj.table.push(file);
        });
        var json = JSON.stringify(obj);
        return res.status(200).send(json);
    });
})
app.get('/view/female', function(req, res){
    const Folder = 'data/female';
    const fs = require('fs');
    var obj = {
        table: []
     };
    fs.readdir(Folder, (err, files) => {
        files.forEach(file => {
            console.log(file);
            obj.table.push(file);
        });
        var json = JSON.stringify(obj);
        return res.status(200).send(json)
    });
})

app.listen(8000, function() {
    console.log('App running on port 8000');
});