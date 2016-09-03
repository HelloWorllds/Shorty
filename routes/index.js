var express = require('express');
var router = express.Router();

var base58 = require('base58.js');
var Url = require('url.js');
var config = require('config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shorty' });
});

router.post('/shorten', function(req, res){
  var longUrl = req.body.url;
  var shortUrl = '';

  Url.findOne({long_url: longUrl}, function (err, doc) {
    if (doc) {
      shortUrl = 'http://localhost:3000/' + base58.encode(doc._id);

      res.send({'shortUrl': shortUrl});
    } else {
      var newUrl = Url({
        long_url: longUrl
      });

      newUrl.save(function (err) {
        if (err) {
          console.log(err);
        }

        shortUrl = 'http://localhost:3000/' + base58.encode(newUrl._id);

        res.send({'shortUrl': shortUrl});
      });
    }
  });
});

router.get('/:encoded_id', function(req, res){
  var base58Id = req.params.encoded_id;
  var id = base58.decode(base58Id);

  Url.findOne({_id: id}, function (err, doc) {
    if (doc) {
      res.redirect(doc.long_url);
    } else {
      res.redirect('http://localhost:' + config.port);
    }
  });
});

module.exports = router;
