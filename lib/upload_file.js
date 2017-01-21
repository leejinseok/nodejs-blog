var fs = require('fs');
var Q = require('q');
var multer = require('multer');
var upload = multer({
	dest: 'uploaded/'
});

var upload_file = function(req,res){
	var deferred = Q.defer();
	var storage = multer.diskStorage({
		// 서버에 저장할 폴더
		destination: function (req, file, cb) {
			cb(null, "uploaded/");
		},

		// 서버에 저장할 파일 명
		filename: function (req, file, cb) {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			var hour = today.getHours();
			var minute = today.getMinutes();
			var seconds = today.getSeconds();
			if(dd<10) {
				dd='0'+dd
			}
			if(mm<10) {
				mm='0'+mm
			}
			today = yyyy+'_'+mm+'_'+dd+'_'+hour+''+minute+''+seconds;
			// today = yyyy+mm+dd+hour+minute+seconds;
			// today = "capture";
			file.uploadedFile = {
				name:today,
				ext: file.mimetype.split('/')[1]
			};
			cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
		}
	});
	var upload = multer({ storage: storage }).single('file');
	upload(req, res, function (err) {
		if (err) deferred.reject();
		else deferred.resolve(req.file.uploadedFile);
	});
	return deferred.promise;
}

module.exports = upload_file;
