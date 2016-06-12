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

    check(email, String);
    check(remember, String);
    var user = User.findOne({userEmail: email, userPassword: pass});

    Cookie.set('userId', user.userAddress); 
  }
  ,
  'submit .form-signup'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const email = target.email.value; 
    const pass = target.password.value;
    const role = target.role.value;
    // var uuid = guid();
    User.insert({userEmail: email, userPassword: pass, userRole: role});
    
  }
});

if (Meteor.isServer){
  Meteor.methods({
    'logoff': function(){
     Cookie.remove('userId');
    }
  })
}
