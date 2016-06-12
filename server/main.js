import { Meteor } from 'meteor/meteor';
User = new Mongo.Collection("user");
Meteor.startup(() => {
  // code to run on server at startup
});
