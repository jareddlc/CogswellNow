/* Cogswell Now webservice
* Author: Jared De La Cruz 
*/

/* API TODO
* GET all users
* GET all post(paginate)
* GET user created/last login time
* POST post
* POST account settings
* Unified calendar
*/

//db.users.update({email: 'jdelacruz@cogswell.edu'}, {$set: { type: 'admin'}})


//------------------------------Setup
//---MongoDB
console.log('Initializing MongoDB...');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cogswell');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('MongoDB connected.')
});

var userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  program: {type: String},
  type: {type: String, required: true, default: 'user'},
  first: {type: String, required: true},
  last: {type: String, required: true},
  updated: {type: Date, default: Date.now},
  created: {type: Date, required: true},
});
var User = mongoose.model('User', userSchema);

var blogSchema = mongoose.Schema({
  title:  {type: String, required: true},
  author: {type: String, required: true},
  body:   {type: String, required: true},
  comments: [{author: String, body: String, date: Date}],
  date: {type: Date, default: Date.now},
  votes: {type: String},
  type: {type: String},
  tags: [{type: String}]
});
var Blog = mongoose.model('Blog', blogSchema);

var forumSchema = mongoose.Schema({
  title:  {type: String, required: true},
  author: {type: String, required: true},
  body:   {type: String, required: true},
  comments: [{author: String, body: String, date: Date}],
  date: {type: Date, default: Date.now},
  votes: {type: String},
  type: {type: String},
  tags: [{type: String}]
});
var Forum = mongoose.model('Forum', forumSchema);

//---ExpressJS
console.log('Initializing Express...');
var express = require('express');
var app = express();

//---Middleware: Allows cross-domain requests (CORS)
var allowCrossDomain = function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

///---MemoryStore
//var MemoryStore = express.session.MemoryStore;

//---App config
app.configure(function() {
  var pub_dir = __dirname + '/public';
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set("trust proxy", true);
  app.use(express.favicon('C:\\xampp\\htdocs\\xampp\\favicon.ico'));
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'cogswell'}));
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
  app.use(app.router);
  app.use(express.static(__dirname));
});

//------------------------------Endpoints
//---GET
app.get('/get.blog', function (req, res, next){
  console.log('Request to: '+req.path+' from: '+req.ip);
  getBlog(req, res);
});
app.get('/get.blog.count', function (req, res, next){
  console.log('Request to: '+req.path+' from: '+req.ip);
  getBlogCount(req, res);
});
app.get('/get.forum', function (req, res, next){
  console.log('Request to: '+req.path+' from: '+req.ip);
  getForum(req, res);
});
app.get('/get.forum.count', function (req, res, next){
  console.log('Request to: '+req.path+' from: '+req.ip);
  getForumCount(req, res);
});
app.get('/get.account', function (req, res, nex){
  console.log('Request to: '+req.path+' from: '+req.ip);
  getAccount(req, res);
});
//---POST
app.post('/post.user', function (req, res, next){
  console.log('Request to: '+req.path+' from: '+req.ip);
  postUser(req, res);
});
app.post('/post.login', function (req, res, next){
  console.log('Request to: '+req.path+' from: '+req.ip);
  postLogin(req, res);
});
app.post('/post.blog.post', function (req, res, next){
  console.log('Request to: '+req.path+' from: '+req.ip);
  postBlogPost(req, res);
});
app.post('/post.forum.post', function (req, res, next){
  console.log('Request to: '+req.path+' from: '+req.ip);
  postForumPost(req, res);
});
app.post('/post.forum.comment', function (req, res, next){
  console.log('Request to: '+req.path+' from: '+req.ip);
  postForumComment(req, res);
});
app.post('/post.account', function (req, res, next){
  console.log('Request to: '+req.path+' from: '+req.ip);
  postAccount(req, res);
});

//---Start listening
var port = 8888;
app.listen(port);
console.log('Webservice started on port: '+port);

//------------------------------Functions
function createHash()
{
  //---Cryptography
  var crypto = require('crypto');
  var sha256 = crypto.createHash('sha256');
  var salt = 'cogswell';
  return sha256;
}

function getBlog(req, res)
{
  var pageLimit = 10;
  var page = req.query.page;
  
  Blog.find().sort({$natural: -1}).skip(page*pageLimit).limit(pageLimit).exec(function (err, results) {
    if(err)
    {
      res.json(200, {response: "failure"});
      console.log(err.err);
    }
    else
    {
      res.json(results);
    }
  });
}

function getBlogCount(req, res)
{
  Blog.count({}, function(err, count){
    if(err)
    {
      res.json(200, {response: "failure"});
      console.log(err.err);
    }
    else
    {
      res.json(200, {response: "success", count: count});
    }
  });
}

function getForum(req, res)
{
  var pageLimit = 10;
  var page = req.query.page;
  
  Forum.find().sort({$natural: -1}).skip(page*pageLimit).limit(pageLimit).exec(function (err, results) {
    if(err)
    {
      res.json(200, {response: "failure"});
      console.log(err.err);
    }
    else
    {
      res.json(results);
    }
  });
}

function getForumCount(req, res)
{
   Forum.count({}, function(err, count){
    if(err)
    {
      res.json(200, {response: "failure"});
      console.log(err.err);
    }
    else
    {
      res.json(200, {response: "success", count: count});
    }
  });
}

function getAccount(req, res)
{
  User.findOne({
    email: req.query.email,
  }, function (err, results){
    if(err)
    {
      res.json(200, {response: "failure"});
      console.log(err)
    }
    else
    {
      var response = {response: "success"};
      response.email = results.email;
      response.first = results.first;
      response.last = results.last;
      response.program = results.program;
      response.updated = results.updated;
      response.created = results.created;
      res.json(200, response); 
    }
  });
}

function postAccount(req, res)
{ 
  User.update({
    email: req.body['form-account-email']
    }, {$set: {
      first: req.body['form-account-fname'],
      last: req.body['form-account-lname'],
      program: req.body['form-account-program']},
    }, function (err, affected){
      if(err)
      {
        res.json(200, {response: "failure"});
        console.log(err.err);
      }
      else
      {
         var response = {response: "success"};
         res.json(200, response); 
      }
    }
  );
  
}

function postUser(req, res)
{
  //---Cryptography
  var crypto = require('crypto');
  var sha256 = crypto.createHash('sha256');
  var salt = 'cogswell';
  var hashpass = sha256.update(salt+req.body['form-register-pass']).digest("hex");
  
  var datetime = new Date();
  User.create({
    email: req.body['form-register-email'],
    password: hashpass,
    type: "user",
    first: req.body['form-register-fname'],
    last: req.body['form-register-lname'],
    created: datetime,
  }, function (err, results){
    if(err)
    {
      res.json(200, {response: "failure"});
      console.log(err.err);
    }
    else
    {
      res.json(200, {response: "success"});
      console.log("User registered: "+results.fname+" "+results.lname+" - "+results.email);
    }
  });
}

function postLogin(req, res)
{
  //---Cryptography
  var crypto = require('crypto');
  var sha256 = crypto.createHash('sha256');
  var salt = 'cogswell';
  var hashpass = sha256.update(salt+req.body['form-signin-pass']).digest("hex");

  User.findOne({
    email: req.body['form-signin-email'],
    password: hashpass,
  }, function (err, results){
    if(err)
    {
      res.json(200, {response: "failure"});
      console.log(err.err);
    }
    else if(!results)
    {
      res.json(200, {response: "failure"});
      console.log("Login failed");    
    }
    else
    {
      var datetime = new Date();
      User.update({
        email: results.email
      }, {$set: {updated: datetime}
      }, function (err, affected){
          if(err)
          {
            console.log(err);
          }
        }
      );

      var hash = createHash();
      var response = {response: "success"};
      response.email = results.email;
      response.user = hash.update(results.email).digest("hex");
      response.first = results.first;
      response.last = results.last;
      response.type = results.type;
      response.program = results.program;
      response.updated = datetime;
      response.created = results.created;
      req.session.login = true;
      res.json(200, response);
      console.log("User logged in: "+ results.email);
    }
  });
}

function postBlogPost(req, res)
{
  var datetime = new Date();
  Blog.create({
    title:    req.body['form-blog-title'],
    author:   req.body['form-blog-author'],
    body:     req.body['form-blog-body'],
    date:     datetime,
    tags:     req.body['form-blog-tags'],
    type:     req.body['form-blog-type']
  }, function (err, results){
    if(err)
    {
      res.json(200, {response: "failure"});
      console.log(err);
    }
    else
    {
      res.json(200, {response: "success"});
      console.log("Blog posted: \""+results.title+"\" from: "+results.author);
    }
  });
}

function postForumPost(req, res)
{
  var datetime = new Date();
  Forum.create({
    title:    req.body['form-forum-title'],
    author:   req.body['form-forum-author'],
    body:     req.body['form-forum-body'],
    date:     datetime,
    type:     req.body['form-forum-type']
  }, function (err, results) {
    if(err)
    {
      res.json(200, {response: "failure"});
    }
    else
    {
      res.json(200, {response: "success"});
      console.log("Forum posted: \""+results.title+"\" from: "+results.author);
    }
  });
}

function postForumComment(req, res)
{
  var datetime = new Date();
  Forum.update({
    title: req.body['form-forum-comment-title'],
  },{$push: {comments: {
        author: req.body['form-forum-comment-author'],
        body: req.body['form-forum-comment-body'],
        date: datetime
      }
    }
  }, function (err, affected){
    if(err)
    {
      res.json(200, {response: "failure"});
      console.log(err);
    }
    else
    {
      res.json(200, {response: "success"});
      console.log("Forum comment posted: \""+req.body['form-forum-comment-title']+"\" from: "+req.body['form-forum-comment-author']);
    }
  });
}