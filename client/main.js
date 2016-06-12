import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

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
	'change #walletInput' : function(field) {
		var walletInputLogin = document.getElementById('walletInput');
		// Put the rest of the demo code here.
		var file = walletInputLogin.files[0];
		var reader = new FileReader();
		reader.onload = function(e) {
			var rawData = reader.result;
			var keys = JSON.parse(rawData);
			var pwDerivedKey = Meteor.call('retrieveKey', password, function(error, result){
				if(error){
					throw error;
				} else if(result){
					return result;
				}
			});
			Session.set('keystore', keys.keystore);
			Session.set('pwDerivedKey', pwDerivedKey);
			delete Session.keys['nonce'];
			delete Session.keys['receipts'];
			document.getElementById('seeWallet').textContent = wallet.signingAddress;
		}
		var output = reader.readAsBinaryString(file);
	},
	'click .passwordSubmission': function(event, instance) {
		event.preventDefault();
		// increment the counter when button is clicked
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
					var nonce = Meteor.call('getNonce', function(error, result){
						if(error){
							throw error;
						} else if(result){
							return result;
						}
					})
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
					Meteor.call('sendFunctionWithOneArg', Session.get('keystore'), Session.get('password'), contractAddress, nonce, 'activateBottle', data, function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				} else {
					var nonce = Meteor.call('getNonce', function(error, result){
						if(error){
							throw error;
						} else if(result){
							return result;
						}
					})
					Meteor.call('sendFunctionWithOneArg', Session.get('keystore'), Session.get('password'), contractAddress, nonce, 'activateBottle', data, function(err, res){
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
					Meteor.call('sendFunctionWithOneArg', keystore, Session.get('password'), contractAddress, nonce, 'sellBottle', data, function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				} else {
					var nonce = Meteor.call('getNonce', function(error, result){
						if(error){
							throw error;
						} else if(result){
							return result;
						}
					})
					Meteor.call('sendFunctionWithOneArg', keystore, Session.get('password'), contractAddress, nonce, 'sellBottle', data, function(err, res){
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
					Meteor.call('sendFunctionWithoutArg', keystore, Session.get('password'), contractAddress, nonce, 'buyBottle', function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				} else {
					var nonce = Meteor.call('getNonce', function(error, result){
						if(error){
							throw error;
						} else if(result){
							return result;
						}
					})
					Meteor.call('sendFunctionWithoutArg', keystore, Session.get('password'), contractAddress, nonce, 'buyBottle', function(err, res){
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
					Meteor.call('sendFunctionWithOneArg', keystore, Session.get('password'), contractAddress, nonce, 'setNextResponsible', data, function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				} else {
					var nonce = Meteor.call('getNonce', function(error, result){
						if(error){
							throw error;
						} else if(result){
							return result;
						}
					})
					Meteor.call('sendFunctionWithOneArg', keystore, Session.get('password'), contractAddress, nonce, 'setNextResponsible', data, function(err, res){
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
					Meteor.call('sendFunctionWithoutArg', keystore, Session.get('password'), contractAddress, nonce, 'acceptResponsibility', function(err, res){
						if(err){
							throw err;
						}else if (res){
							return res;
						}
					});
				} else {
					var nonce = Meteor.call('getNonce', function(error, result){
						if(error){
							throw error;
						} else if(result){
							return result;
						}
					})
					Meteor.call('sendFunctionWithoutArg', keystore, Session.get('password'), contractAddress, nonce, 'acceptResponsibility', function(err, res){
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
