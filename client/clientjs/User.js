User = new Mongo.Collection("user");

Template.login.events({
  'submit .form-signin'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const email = target.email.value;
    const pass = target.password.value;
    const remember = target.remember.value;
    var user = userExist(email, pass);
    if (user !== undefined) {
      Cookie.set('userId', user.userAddress); 
      Router.go('/');

    }
    else {
      console.log('No user');
    }
  }
});

function userExist(email, pass) {
    check(email, String);
    check(pass, String);
    var user = User.findOne({userEmail: email, userPassword: pass});
    return user;
};

Template.signup.events({
  'submit .form-signup'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const email = target.email.value; 
    const pass = target.password.value;
    const role = target.role.value;
    // var uuid = guid();

    var user = userExist(email, pass);
    if (user === undefined) {
      User.insert({userEmail: email, userPassword: pass, userRole: role});
    } 
    else {
       Router.go('login');
    }
  }
});

if (Meteor.isServer){
  Meteor.methods({
    logoff: function(){
     Cookie.remove('userId');
    },
    isLogged: function() {
      return Cookie.get('userId') != "undefined";
    }
  })
}