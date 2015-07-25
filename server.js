var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
app.get('/', function(req, res){
	res.send("try some domain (/<domain_name)");
});
app.get('/:name?', function(req, res){
	name = req.params.name;
	url = 'http://www.bugmenot.com/view/'+name;
	//console.log(url);
	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);
			var title,temp;
			var result = [];
			//console.log($('.account').length);
			$('.account').each(function() {
              var data = $(this);
              var info = data.find('dd kbd');
              var stat = data.find('.stats li');
              result.push({
                username: info.get(0).children[0].data,
                password: info.get(1).children[0].data,
                Succesrate: stat.get(0).children[0].data.substring(0, 3),
                votes: stat.get(1).children[0].data
              });
            });
            res.send(JSON.stringify(result, 0, 4));
		}
	});
});
var port = process.env.PORT || 8081;
app.listen(port,function(){
console.log('localhost:8081/<site_name>');	
});
exports = module.exports = app; 	
