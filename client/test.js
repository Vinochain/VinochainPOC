import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


if (Meteor.isClient) {

window.onload = function() {
var fileInput = document.getElementById('walletInput');

fileInput.addEventListener('change', function(e) {
  // Put the rest of the demo code here.
  var file = fileInput.files[0];
  var reader = new FileReader();

  reader.onload = function(e) {
	var rawData = reader.result;
	var keystore = JSON.parse(rawData);
	Session.set('keystore', keystore);
	delete Session.keys['nonce'];
	delete Session.keys['receipts'];
   console.log(rawData);
   document.getElementById('seeWallet').textContent = Session.get('keystore').ksData["m/0'/0'/0'"].addresses[0];
  }

  var output = reader.readAsBinaryString(file); 


  });
 }
}

contractAddress = "0xbd5d671e98b8efc34f451cf0a9ceb62234418598";

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
	return Template.instance().counter.get();
  },
});

Template.hello.events({
	'click .passwordSubmission': function(event, instance) {
		event.preventDefault();

		pass = document.getElementById("password").value;
		console.log(pass);
		Session.set('password', pass);
	},

	'click .walletCreation': function(event, instance) {
		event.preventDefault();
		// increment the counter when button is clicked
		instance.counter.set(instance.counter.get() + 1);
		Meteor.call('createWallet', Session.get('password'), function(err, res){
			if(err){
				throw err;
			}else if (res){
				console.log(JSON.stringify(res));
				return res;
			}
		});
	},
	'click .bottleCreation': function(event){
		if(Session.get('keystore') !== undefined){
			if(Session.get('password') === undefined){
				
				if(Session.get('nonce') !== undefined){
					Meteor.call('createBottle', Session.get('keystore'), Session.get('password'), Session.get('nonce'), function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				} else {
					var nonce = Meteor.call('getNonce', Session.get('keystore').ksData["m/0'/0'/0'"].addresses[0], function(error, result){
						if(error){
							throw error;
						} else if(result){
							return result;
						}
					});
					Meteor.call('createBottle', Session.get('keystore'), Session.get('password'), nonce, function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				}
			}
		}
	},
	'click .bottleProducerOwnership': function(event){
		if(Session.get('keystore') !== undefined){
			if(Session.get('password') !== undefined){
				if(Session.get('nonce') !== undefined){
					Meteor.call('sendFunctionWithoutArg', Session.get('keystore'), Session.get('password'), contractAddress, Session.get('nonce'), 'activateBottle', function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				} else {
					console.log(typeof Session.get('keystore').ksData["m/0'/0'/0'"].addresses[0]);
					var nonce = Meteor.call('getNonce', Session.get('keystore').ksData["m/0'/0'/0'"].addresses[0], function(error, result){
						if(error){
							throw error;
						} else if(result){
							return result;
						}
					});
					Meteor.call('sendFunctionWithoutArg', Session.get('keystore'), Session.get('password'), contractAddress, nonce, 'activateBottle', function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				}
			}
		}
	},
	'click .sellBottle': function(event){
		if(Session.get('keystore') !== undefined){
			if(Session.get('password') !== undefined){
				if(Session.get('nonce') !== undefined){
					Meteor.call('sendFunctionWithOneArg', Session.get('keystore'), Session.get('password'), contractAddress, Session.get('nonce'), 'sellBottle', data, function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				} else {
					var nonce = Meteor.call('getNonce', Session.get('keystore').ksData["m/0'/0'/0'"].addresses[0], function(error, result){
						if(error){
							throw error;
						} else if(result){
							return result;
						}
					});
					Meteor.call('sendFunctionWithOneArg', Session.get('keystore'), Session.get('password'), contractAddress, nonce, 'sellBottle', data, function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				}
			}
		}
	},
	'click .buyBottle': function(event){
		if(Session.get('keystore') !== undefined){
			if(Session.get('password') !== undefined){
				if(Session.get('nonce') !== undefined){
					Meteor.call('sendFunctionWithoutArg', Session.get('keystore'), Session.get('password'), contractAddress, Session.get('nonce'), 'buyBottle', function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				} else {
					var nonce = Meteor.call('getNonce', Session.get('keystore').ksData["m/0'/0'/0'"].addresses[0], function(error, result){
						if(error){
							throw error;
						} else if(result){
							return result;
						}
					});
					Meteor.call('sendFunctionWithoutArg', Session.get('keystore'), Session.get('password'), contractAddress, nonce, 'buyBottle', function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				}
			}
		}
	},
	'click .transferResponsibility': function(event){
		if(Session.get('keystore') !== undefined){
			if(Session.get('password') !== undefined){
				if(Session.get('nonce') !== undefined){
					Meteor.call('sendFunctionWithOneArg', Session.get('keystore'), Session.get('password'), contractAddress, Session.get('nonce'), 'setNextResponsible', data, function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				} else {
					var nonce = Meteor.call('getNonce', Session.get('keystore').ksData["m/0'/0'/0'"].addresses[0], function(error, result){
						if(error){
							throw error;
						} else if(result){
							return result;
						}
					});
					Meteor.call('sendFunctionWithOneArg', Session.get('keystore'), Session.get('password'), contractAddress, nonce, 'setNextResponsible', data, function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				}
			}
		}
	},
	'click .acceptResponsibilityTransfer': function(event){
		if(Session.get('keystore') !== undefined){
			if(Session.get('password') !== undefined){
				if(Session.get('nonce') !== undefined){
					Meteor.call('sendFunctionWithoutArg', Session.get('keystore'), Session.get('password'), contractAddress, Session.get('nonce'), 'acceptResponsibility', function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				} else {
					var nonce = Meteor.call('getNonce', Session.get('keystore').ksData["m/0'/0'/0'"].addresses[0], function(error, result){
						if(error){
							throw error;
						} else if(result){
							return result;
						}
					});
					Meteor.call('sendFunctionWithoutArg', Session.get('keystore'), Session.get('password'), contractAddress, nonce, 'acceptResponsibility', function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				}
			}
		}
	}
});
