'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if (baseDir === conf.paths.src || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  /*
   * You can add a proxy to your backend by uncommenting the line bellow.
   * You just have to configure a context which will we redirected and the target url.
   * Example: $http.get('/users') requests will be automatically proxified.
   *
   * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
   */
  // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', proxyHost: 'jsonplaceholder.typicode.com'});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: browser
  });
}

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['watch'], function () {
  browserSyncInit([path.join(conf.paths.tmp, '/serve'), conf.paths.src]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(conf.paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([conf.paths.tmp + '/serve', conf.paths.src], []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(conf.paths.dist, []);
});


/* Storage system */
mongoose.connect('mongodb://hw6:hw6@apollo.modulusmongo.net:27017/edin5oSy');     // connect to mongoDB database on modulus.io

var Flower = mongoose.model('Flower', {
  name: String,
  frequency: Number,
  amount: Number,
  comment: String,
  added: Date
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  if ('OPTIONS' == req.method){
    return res.send(200);
  }
  next();
});

app.get('/api/flowers', function (req, res) {
  Flower.find(function (err, flower) {

    if (err){
      res.send(err);
    }
    res.json(flower);
  });
});

app.post('/api/flower', function (req, res) {
  console.log(req.body);
  Flower.create({
    name: req.body.name,
    frequency: req.body.frequency,
    amount: req.body.amount,
    comment: req.body.comment,
    added: new Date()
  }, function (err, flower) {
    if (err)
      res.send(err);

    Flower.find(function(err, flower) {
      if (err)
        res.send(err)
      res.json(flower);
    });

  });

});

app.delete('/api/flower/:id', function (req, res) {
  Flower.remove({
    _id: req.params.id
  }, function (err, flower) {
    if (err)
      res.send(err);

    Flower.find(function(err, flower) {
      if (err)
        res.send(err)
      res.json(flower);
    });

  });
});

app.listen(8080);
console.log("Storage listening on port 8080");
