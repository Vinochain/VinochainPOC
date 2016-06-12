Bottle = new Mongo.Collection("bottle");


if (Meteor.isServer){
	Meteor.methods({
		'insertBottle': function(address){
			check(address, String);

			var bottleId = Bottle.insert({"address": address, "linkedAddresses": []}, function(error, result){
				if(!error){
					if(result){
						return result._id
					}
				}
			});
			return bottleId;
		},
		'addUserAddressToBottle': function(contractAddress, userAddress){
			check(contractAddress, String);
			check(userAddress, String);
			var bottle = Bottle.findOne({address: contractAddress});
			bottle.linkedAdresses.push(userAdress);
			var bottleId = Bottle.update(bottle, bottle._id, function(error, result){
				if(!error){
					if(result){
						return result._id
					}
				}
			});
			return bottleId;
		},
		'removeUserAddressToBottle': function(contractAddress, userAddress){
			check(contractAddress, String);
			check(userAddress, String);
			var bottle = Bottle.findOne({address: contractAddress});
			var index = bottle.linkedAddress.indexOf(userAddress);
			if (index > -1) {
			    bottle.linkedAddress.splice(index, 1);
			}
			var bottleId = Bottle.update(bottle, bottle._id, function(error, result){
				if(!error){
					if(result){
						return result._id
					}
				}
			});
			return bottleId;
		}
	})
}