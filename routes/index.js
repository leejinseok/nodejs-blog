var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require("../models/user");
var bcrypt = require("bcrypt");

var uploadFile = require("../lib/upload_file");

router.get('/', function(req,res,next){
	res.render('pages/welcome');
})
//어드민 home
router.get('/adm/home',function(req,res,next){
	res.render('pages/adm/home');
})
//어드민 index페이지
router.get('/adm/',function(req,res,next){
	res.render('pages/adm/index')
})
//어드민 로그인
router.post('/login/adm', function(req,res,next){
	var user_id = req.body.user_id;
	var user_pwd = req.body.user_pwd;
	var body = JSON.stringify(req.body);
	body = JSON.parse(body);
	User.authentication()(user_id, user_pwd, function(error, user){
		console.log(error);
		if(user){
			res.send({'res':true});
		}else{
			res.send({'res':false});
		}
	})


	//sign up
	// var user = new User({
    //   user_id: user_id,
    //   user_pwd: user_pwd
    // });
	//
	// user.save(function(error, user) {
    //   if (error) return next(error);
    //   return res.send({'res':true});
    // });
})

// var upload = function(req,res){
// 	var deferred = Q.defer();
// 	var storage = multer.diskStorage({
// 		// 서버에 저장할 폴더
// 		destination: function (req, file, cb) {
// 			cb(null, "uploaded/");
// 		},
//
// 		// 서버에 저장할 파일 명
// 		filename: function (req, file, cb) {
// 			var today = new Date();
// 			var dd = today.getDate();
// 			var mm = today.getMonth()+1; //January is 0!
// 			var yyyy = today.getFullYear();
// 			var hour = today.getHours();
// 			var minute = today.getMinutes();
// 			var seconds = today.getSeconds();
// 			if(dd<10) {
// 				dd='0'+dd
// 			}
// 			if(mm<10) {
// 				mm='0'+mm
// 			}
// 			today = yyyy+'_'+mm+'_'+dd+'_'+hour+''+minute+''+seconds;
// 			// today = yyyy+mm+dd+hour+minute+seconds;
// 			// today = "capture";
// 			file.uploadedFile = {
// 				name:today,
// 				ext: file.mimetype.split('/')[1]
// 			};
// 			cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
// 		}
// 	});
// 	var upload = multer({ storage: storage }).single('file');
// 	upload(req, res, function (err) {
// 		if (err) deferred.reject();
// 		else deferred.resolve(req.file.uploadedFile);
// 	});
// 	return deferred.promise;
// }

router.post('/upload/image', function(req,res,next){

	uploadFile(req, res).then(function (file) {
		res.json(file);
	}, function (err) {
		res.send(500, err);
	});
})

module.exports = router;
