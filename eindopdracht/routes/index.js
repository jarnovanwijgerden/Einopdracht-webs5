var express = require('express');
var router = express.Router();
var http = require('http'),
    fs = require('fs');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/js/:jsfile', function(req, res, next) {

	var file = req.params.jsfile;
	fs.readFile('./img/'+file, function (err, js) {

		if(err)
		{
			throw err;
		}
		else
		{
        	res.write(js);  
        	res.end();
		}

	});
});
router.get('/css/:cssfile', function(req, res, next) {
	var file = req.params.cssfile;
	fs.readFile('./website/css/'+file, function (err, js) {
		if(err)
		{
			throw err;
		}
		else
		{
        	res.write(js);  
        	res.end();
		}
	});
});

router.get('/management', function(req, res) {
	fs.readFile('./website/management.html', function (err, html) {
		if(err)
		{
			throw err;
		}
		else
		{
			res.writeHeader(200, {"Content-Type": "text/html"});  
        	res.write(html);  
        	res.end();
		}
	});
});


router.get('/index', function(req, res) {
	fs.readFile('./website/index.html', function (err, html) {
		if(err)
		{
			throw err;
		}
		else
		{
			res.writeHeader(200, {"Content-Type": "text/html"});  
        	res.write(html);  
        	res.end();
		}
	});

});




module.exports = router;
