Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  this.render('content');
});

Router.route('/about', function () {
  this.render('about');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/signup', function () {
  this.render('signup');
});

Router.route('/addbottle', function () {
  this.render('addbottle');
});

Router.route('/logoff', {
    data: function(){
        Cookie.remove('userId');
        console.log("Deconnection");
        this.render('login');
    }
});

Router.route('/bottleinfo/:_id', {
  name: 'bottleinfo'
  // data: function() { return Posts.findOne(this.params._id); }
});