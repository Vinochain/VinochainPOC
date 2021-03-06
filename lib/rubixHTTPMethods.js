HashesInProcess = new Mongo.Collection('hashes')
Receipts = new Mongo.Collection('receipts');

web3 = require('web3');
if(Meteor.isServer){
	Future = require('fibers/future');
	lightwallet = require('eth-lightwallet');


	/*var source = " contract Transaction{ bytes32 commonDataHash; bytes32 initiatorSpecifics; bytes32 counterpartySpecifics; address initiator; address counterparty; address dataQuality; address proofOfProcess; bytes32 initiatorSignTxHash; bytes32 counterpartySignTxHash; modifier onlyCounterparty{if(tx.origin == counterparty) _ } modifier onlyInitiator{if(tx.origin == initiator) _ } modifier onlyDataQuality{if(tx.origin == dataQuality) _ } modifier onlyProofOfProcess{if(msg.sender == proofOfProcess) _ } modifier onlyIfUnsignedByCounterparty{ if(counterpartySignTxHash != 0) throw; _ } modifier onlyIfUnsignedByInitiator{ if(initiatorSignTxHash != 0) throw; _ } function Transaction(bytes32 CDHash, address cpt, address dQuality, bytes32 iSpecifics){ proofOfProcess = msg.sender; initiator = tx.origin; commonDataHash = CDHash; counterparty = cpt; dataQuality = dQuality; initiatorSpecifics = iSpecifics; counterpartySpecifics = 0; } function getCommonDataHash() onlyProofOfProcess returns(bytes32){ return commonDataHash; } function setCounterpartySpecifics(bytes32 cptSpecifics) onlyCounterparty{ counterpartySpecifics = cptSpecifics; } function setCounterpartySignature(bytes32 signaturetxhash) onlyProofOfProcess onlyCounterparty onlyIfUnsignedByCounterparty{ counterpartySignTxHash = signaturetxhash; } function setInitiatorSignature(bytes32 signaturetxhash) onlyProofOfProcess onlyInitiator onlyIfUnsignedByInitiator{ counterpartySignTxHash = signaturetxhash; } } contract StateMachine{ bytes32 private commonDataHash1; bytes32 private commonDataHash2; address private initiator; address private counterparty; address private dataQuality; address private transactionAddress; bool private signedByInitiator; bool private signedByCounterparty; address private lastHashModifier; enum State { TransactionInitialized, InitiatorCommonDataUploaded, InitiatorCommonDataNotReconciled, InitiatorCommonDataReconciled, TransactionCreated, CounterpartyCommonDataUploaded, CounterpartyCommonDataNotReconciled, CounterpartyCommonDataReconciled, TransactionConfirmed } State state; event CurrentState( uint256 _value ); modifier onlyLinkedAddress(){ if((msg.sender != initiator) && (msg.sender != counterparty) && (msg.sender != dataQuality)) throw; _ } modifier onlyInitiator(){if(msg.sender == initiator) _ } modifier onlyCounterparty(){if(msg.sender == counterparty) _ } modifier onHashEquality(){if(commonDataHash1 == commonDataHash2) _ } modifier transactionCreated(){if(transactionAddress == 0x00000000000000000000000000000000) _ } modifier notLastHashModifier(){if(msg.sender != lastHashModifier) _ } modifier transactionNotCreated(){if(transactionAddress == 0x00000000000000000000000000000000) _ } modifier initiatorOnlyIfTransactionNotCreated(){ if((transactionAddress != 0x00000000000000000000000000000000) && (msg.sender == initiator)) throw; _ } modifier counterpartyOnlyIfTransactionCreated(){ if((transactionAddress == 0x00000000000000000000000000000000) && (msg.sender == counterparty)) throw; _ } modifier atStage(State _stage) { if (state != _stage) throw; _ } modifier transitionNext(){ _ state = State(uint(state) + 1); Debug(uint(state), transactionAddress); } function updateReconciliationState() onHashEquality { state = State(uint(state) + 1); Debug(uint(state), transactionAddress); } function uploadHash(bytes32 newHash, bytes32 txhash) onlyLinkedAddress initiatorOnlyIfTransactionNotCreated counterpartyOnlyIfTransactionCreated notLastHashModifier{ if(newHash != 0x0000000000000000000000000000000){ commonDataHash2 = newHash; } else throw; if(commonDataHash1 == 0x00000000000000000000000000000000){ commonDataHash1 = commonDataHash2; commonDataHash2 = 0x00000000000000000000000000000000; state = State(uint(state) + 1); Debug(uint(state), transactionAddress); } else if(lastHashModifier == initiator){ state = State.InitiatorCommonDataNotReconciled; } else if(lastHashModifier == counterparty){ state = State.CounterpartyCommonDataNotReconciled; } lastHashModifier = msg.sender; updateReconciliationState(); } event Debug( uint indexed st, address indexed tx ); function StateMachine(address cpt, address quali, bytes32 commonDataHash){ state=State.InitiatorCommonDataUploaded; commonDataHash1 = commonDataHash; commonDataHash2 = 0x00000000000000000000000000000000; initiator = msg.sender; counterparty = cpt; dataQuality = quali; transactionAddress = 0x00000000000000000000000000000000; signedByInitiator = false; signedByCounterparty = false; lastHashModifier = 0x00000000000000000000000000000000; Debug(uint(state), transactionAddress); } function getState() returns(uint256 stateToUint256){ stateToUint256 = uint256(state); } function getCommonDataHash1() returns(bytes32 hash1){ hash1 = commonDataHash1; } function signAsInitiator(bytes32 iniSpecifics, bytes32 txHash) atStage(State.InitiatorCommonDataReconciled) onHashEquality onlyInitiator transitionNext{ signedByInitiator = true; transactionAddress = new Transaction(commonDataHash1, counterparty, dataQuality, iniSpecifics); commonDataHash1 = 0; } function signAsCounterparty(bytes32 cptSpecifics, bytes32 txHash) atStage(State.CounterpartyCommonDataReconciled) transactionCreated onHashEquality onlyCounterparty transitionNext{ Transaction t = Transaction(transactionAddress); bytes32 initiatorHash = t.getCommonDataHash(); if(initiatorHash == commonDataHash2){ signedByCounterparty = true; t.setCounterpartySpecifics(cptSpecifics); } } function stamp(bytes32 signaturetxhash){ Transaction t = Transaction(transactionAddress); if(msg.sender == initiator) t.setInitiatorSignature(signaturetxhash); if(msg.sender == counterparty) t.setCounterpartySignature(signaturetxhash); } }";
	var compile = Web3.eth.compile.solidity(source); 
	var code = compile.StateMachine.code;
	var abi = compile.StateMachine.info.abiDefinition;*/
	var code = "60606040525b33600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055507ffb0385d1c335746d0115d79a3dc69e4ce0a47b53efccfac878a5d611da464917600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b61068d806100ae6000396000f360606040523615610074576000357c0100000000000000000000000000000000000000000000000000000000900480632e286ccd14610076578063424843cb14610097578063448003d6146100b85780635761ebc0146100d95780635bf659c7146100f1578063b8aa1f921461012a57610074565b005b6100956004808035906020019091908035906020019091905050610161565b005b6100b6600480803590602001909190803590602001909190505061022f565b005b6100d76004808035906020019091908035906020019091905050610390565b005b6100ef6004808035906020019091905050610503565b005b6100fe60048050506105ce565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b61014960048080359060200190919080359060200190919050506105f4565b60405180821515815260200191505060405180910390f35b81600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555060008173ffffffffffffffffffffffffffffffffffffffff161415156101dc5780600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555061022a565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b5b5050565b3373ffffffffffffffffffffffffffffffffffffffff16600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561038b57600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561038a576000600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b5b5b5050565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156104f9578173ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156104ef5733600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506000600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506104f4565b610002565b6104fe565b610002565b5b5050565b336000600060005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005054905060018114151561054757610002565b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555033600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555050505b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561065257610002565b81600060005060008573ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050819055505b9291505056";
	var abi = [{"constant":false,"inputs":[{"name":"acteurDestinataire","type":"address"},{"name":"transporter","type":"address"}],"name":"sellBottle","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"buyer","type":"address"},{"name":"transactionHash","type":"bytes32"}],"name":"deliver","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"seller","type":"address"},{"name":"transactionHash","type":"bytes32"}],"name":"buyBottle","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"transactionHash","type":"bytes32"}],"name":"activateBottle","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"viticulteur","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_address","type":"address"},{"name":"_uint","type":"uint256"}],"name":"insertNewActor","outputs":[{"name":"","type":"bool"}],"type":"function"},{"inputs":[],"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"issuer","type":"address"}],"name":"LogIssuer","type":"event"}];

// 	function updateWIP(){
// 		var wip = HashesInProcess.find().fetch();
// 		if(wip != undefined){
// 			for(var i = 0; i < wip.length; i++){
// 				var h = wip[i].txHash;
// //        var nxt = wip[i].nextTx;
// //        HTTP.post('http://192.168.87.202:3000/Web3/getTransactionReceipt', {data:{"txHash": h}}, function(err, res){
// 				if(err){
// 					throw err;
// 				} else if(res.content != "null"){
// /*            
// 					if(nxt != undefined){
// 						var res = HTTP.post('http://192.168.87.202:3000/Web3/sendRawTransaction', {data:{"txRaw": nxt}});
// 						var txh = JSON.parse(res.content);
// 						var hashAttributes = {
// 							txHash: txh,
// 							from: signingAddress
// 						}
// 						HashesInProcess.insert(hashAttributes);
// 					}*/
// 					var tx = Transaction.findOne({lastTxHash: h});
// 					if(tx.address === undefined){
// 						tx.address = JSON.parse(res.content).contractAddress;
// 						console.log("logs " + res.content);
// 						tx.alert = 1;
// 						tx.state = parseInt(JSON.parse(res.content).logs[0].topics[1], 16).toString();
// 						console.log("state "+ tx.state);
// 						Transaction.update(tx._id, {$set: tx});
// 						HashesInProcess.remove({txHash: h});
// 					} else {
// 						tx.state = parseInt(JSON.parse(res.content).logs[0].topics[1], 16).toString();
// 						tx.alert = 1;
// 						console.log("logs " + res.content);
// 						console.log("state " + tx.state);
// 						Transaction.update(tx._id, {$set: tx});
// 						HashesInProcess.remove({txHash: h});
// 					}
// 				}
// 			};
// 		}
// 	}

	function flushReceipts(){
		Receipts.remove({});
	}

	// Meteor.setInterval(updateWIP, 1000);
	// Meteor.setInterval(flushReceipts, 100000000000);

  function getWallet(_keystore){
    return _keystore;
  };

	Meteor.methods({
		insertHash: function(hashAttributes){
			check(hashAttributes, {            
				txHash: String,
				from: String
			});         
			var hashId = HashesInProcess.insert(hashAttributes);        
			return {
				_id: hashId        
			};    
		},
		clearReceipts: function(hash){
			check(hash, String);      
			console.log(hash);
			var toBeRemoved = Receipts.findOne({transactionHash: hash});
			if(toBeRemoved != undefined){
				console.log(toBeRemoved);
				Receipts.remove(toBeRemoved);
				return {
					_id: toBeRemoved,
				}
			} else {
				return "transaction has not been mined yet";
			}
		},
		createWallet: function(pass){
			check(pass, String);

			var fut = new Future();
			var extraEntropy = "roberto";
			var randomSeed = lightwallet.keystore.generateRandomSeed(extraEntropy, function(err, res){
				if(err){
					throw err;
				} else if(res){
					return res;
				}
			});
			var Seed;
			var response = lightwallet.keystore.deriveKeyFromPassword(pass, function(error, pwDerivedKey){
				if(error){
					throw error;
				}	else if(pwDerivedKey){
					var global_keystore = new lightwallet.keystore(
						randomSeed,
						pwDerivedKey);
					var numAddr = 0;//TODO:change value of numAddress dynamicaly
					global_keystore.generateNewAddress(pwDerivedKey, numAddr, undefined);
					fut['return'](getWallet(global_keystore));
				}
			});
			return fut.wait();
		},
		getNonce: function(address){
			check(address, String);
			var Web3 = new(web3);
			Web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
			res = Web3.eth.getTransactionCount("0x" + address, function(error,result){
				if(error){
					throw error;
				} else if(result){
					return result;
				}
			});
			return res;
		},
		getTenLastTransactions: function(contractAddress){
			check(contractAddress, String);
			var Web3 = new(web3);
			Web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
			var res = []
			var bottle = Bottle.findOne({address: contractAddress});
			if (bottle !== undefined) {
				// statement
			var lastTxHash = bottle.lastTxHash;
			for(i = 0; i < 10; i++){
				var tx = JSON.parse(Web3.eth.getTransaction(lastTxHash, function(error,result){
					if(error){
						throw error;
					} else if(result){
						return result;
					}
				}))
				var blk = JSON.parse(Web3.eth.getBlock(tx.blockHash, function(error,result){
					if(error){
						throw error;
					} else if(result){
						return result;
					}
				}))
				lastTxHash = tx.input.substr(-32, 32);
				var obj = {
					author: tx.from,
					timestamp: blk.timestamp
				}
				res.push(obj);
			}
			return res;			
			}
		},
		retrieveKey: function(pass){
			var deriv = lightwallet.keystore.deriveKeyFromPassword(pass);
			return {
				"pwDerivedKey": deriv
			}; 
		},
		sendValue: function(keystore, pass, txOptions){
			check(keystore, Object);
			check(pass, String);
			check(txOptions, String);

			var Web3 = new(web3);
			Web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
			var fut = new Future();
			var signingAddress = keystore.ksData["m/0'/0'/0'"].addresses[0];
			// var keyst = lightwallet.upgrade.upgradeOldSerialized(keystore, "password");
			var global_keystore = lightwallet.keystore.deserialize(keystore);
			var deriv = lightwallet.keystore.deriveKeyFromPassword(pass);
			var ret = new Uint8Array(32);
			for (var i = 0; i < 32; i++) {
				ret[i] = deriv[i];
			}
			var valueTx = lightwallet.txutils.valueTx(txOptions);
			fut['return'](lightwallet.signing.signTx(global_keystore, ret, valueTx, signingAddress, undefined, function(error, result){
				if(error){
					console.log("ici");
					throw error;
				} else {
					console.log("là");
					return result;
				}
			}));
			var txh = Web3.eth.sendRawTransaction("0x" + fut.wait(), function(error, result){
				if(error){
					throw error;
				} else if(!result.blockNumber){
					return result.hash;
				} else {
					return result.blockNumber;
				}
			});
			var txh = JSON.parse(res.content);
			var hashAttributes = {
				txHash: txh,
				from: signingAddress
			};
			HashesInProcess.insert(hashAttributes);
			return txh;
		},
		sendFunctionWithOneArg: function(keystore, pass, contractAddress, nonce, functionName, arg){
			check(keystore, Object);
			check(pass, String);
			check(contractAddress, String);
			check(nonce, Number);
			check(functionName, String);
			check(arg, String);


			var Web3 = new(web3);
			Web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
			var fut = new Future();
			// var keyst = lightwallet.upgrade.upgradeOldSerialized(keystore, "password");
			var global_keystore = lightwallet.keystore.deserialize(keystore, function(er, re){
				if(er){
					throw er;
				} else if(re){
					return re;
				}
			});
			var signingAddress = keystore.ksData["m/0'/0'/0'"].addresses[0];
			var deriv = lightwallet.keystore.deriveKeyFromPassword(pass);
			var ret = new Uint8Array(32);
			for (var i = 0; i < 32; i++) {
				ret[i] = deriv[i];
			}
			var txOptions = {
				nonce: nonce,
				to: contractAddress,
				gasPrice: 10000000000000000000000, 
				gasLimit: 30000000000000000000000
			};
			var functionTx = lightwallet.txutils.functionTx(abi, functionName, arg, contractAddress, txOptions);
			fut['return'](lightwallet.signing.signTx(global_keystore, ret, functionTx, signingAddress, undefined, function(error, result){
				if(error){
					throw error;
				} else if(result){
					return result;
				}
			}));
			console.log(fut.wait());
//      var stateTx = lightwallet.txutils.functionTx(abi, 'getState', commonDataHash, txOptions);
//      var stateGetter = lightwallet.signing.signTx(global_keystore, ret, stateTx, signingAddress, undefined);
			var res = Web3.eth.sendRawTransaction("0x" + fut.wait(), function(error, result){
				if(error){
					throw error;
				} else if(!result.blockNumber){
					return result.hash;
				} else {
					return result.blockNumber;
				}
			});
			var txh = JSON.parse(res.content);
			var hashAttributes = {
				txHash: txh,
//        nxtTx: stateGetter,
				from: signingAddress
			};
			HashesInProcess.insert(hashAttributes);
			return txh;
		},

		sendFunctionWithoutArg: function(keystore, pass, contractAddress, nonce, functionName){
			check(keystore, Object);
			check(pass, String);
			check(contractAddress, String);
			check(nonce, Number);
			check(functionName, String);


			var Web3 = new(web3);
			Web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
			var fut = new Future();
			// var keyst = lightwallet.upgrade.upgradeOldSerialized(keystore, "password");
			var global_keystore = lightwallet.keystore.deserialize(keystore, function(er, re){
				if(er){
					throw er;
				} else if(re){
					return re;
				}
			});
			var signingAddress = keystore.ksData["m/0'/0'/0'"].addresses[0];
			var deriv = lightwallet.keystore.deriveKeyFromPassword(pass);
			var ret = new Uint8Array(32);
			for (var i = 0; i < 32; i++) {
				ret[i] = deriv[i];
			}
			var txOptions = {
				nonce: nonce,
				to: contractAddress,
				gasPrice: 10000000000000000000000, 
				gasLimit: 30000000000000000000000
			}
			var functionTx = lightwallet.txutils.functionTx(abi, functionName, contractAddress, txOptions);
			fut['return'](lightwallet.signing.signTx(global_keystore, ret, functionTx, signingAddress, undefined, function(error, result){
				if(error){
					throw error;
				} else if(result){
					return result;
				}
			}));
			console.log(fut.wait());
//      var stateTx = lightwallet.txutils.functionTx(abi, 'getState', commonDataHash, txOptions);
//      var stateGetter = lightwallet.signing.signTx(global_keystore, ret, stateTx, signingAddress, undefined);
			var res = Web3.eth.sendRawTransaction("0x" + fut.wait(), function(error, result){
				if(error){
					throw error;
				} else if(!result.blockNumber){
					return result.hash;
				} else {
					return result.blockNumber;
				}
			});
			var txh = JSON.parse(res.content);
			var hashAttributes = {
				txHash: txh,
//        nxtTx: stateGetter,
				from: signingAddress
			};
			HashesInProcess.insert(hashAttributes);
			return txh;
		},
		createBottle: function(keystore, pass, nonceOfTx){
			check(keystore, Object);
			check(pass, String);
			check(nonceOfTx, Number);


			var Web3 = new(web3);
			Web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
			var fut = new Future();
			// var keyst = lightwallet.upgrade.upgradeOldSerialized(keystore, "password");
			var global_keystore = lightwallet.keystore.deserialize(keystore);
			var signingAddress = keystore.ksData["m/0'/0'/0'"].addresses[0];
			var deriv = lightwallet.keystore.deriveKeyFromPassword(pass);
			var ret = new Uint8Array(32);
			for (var i = 0; i < 32; i++) {
				ret[i] = deriv[i];
			}
			var txOptions = {
				nonce: nonceOfTx,
				gasPrice: 1000000, 
				gasLimit: 3000000,
				value: 10000000000000000000,
				data: code
			}
			var contractData = lightwallet.txutils.createContractTx(signingAddress, txOptions);
			fut['return'](lightwallet.signing.signTx(global_keystore, ret, contractData.tx, signingAddress, undefined, function(error, result){
				if(error){
					throw error;
				}
			}));
			var res = Web3.eth.sendRawTransaction("0x" + fut.wait(), function(error, result){
				if(error){
					throw error;
				} else if(!result.blockNumber){
					return result.hash;
				} else {
					return result.blockNumber;
				}
			});
			var txh = JSON.parse(res.content);
			var hashAttributes = {
				txHash: txh,
				from: signingAddress
			}
			HashesInProcess.insert(hashAttributes);

			return txh;
		},
		signTransaction: function(keystore, pass, rawTx){
			check(keystore, Object);
			check(pass, String);
			check(rawTx, String);

			var Web3 = new(web3);
			Web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
			var fut = new Future();
			// var keyst = lightwallet.upgrade.upgradeOldSerialized(keystore, "password");
			var global_keystore = lightwallet.keystore.deserialize(keystore);
			var signingAddress = keystore.ksData["m/0'/0'/0'"].addresses[0];
			var deriv = lightwallet.keystore.deriveKeyFromPassword(pass);
			var ret = new Uint8Array(32);
			for (var i = 0; i < 32; i++) {
				ret[i] = deriv[i];
			}
			var valueTx = lightwallet.txutils.valueTx(rawTx);
			fut['return'](lightwallet.signing.signTx(global_keystore, ret, valueTx, signingAddress, undefined, function(error, result){
				if(error){
					throw error;
				} else {
					return result;
				}
			}));
			var res = Web3.eth.sendRawTransaction("0x" + fut.wait(), function(error, result){
				if(error){
					throw error;
				} else if(!result.address){
					return result.hash;
				}
			});
			var txh = JSON.parse(res.content);
			if(txh == "0x0000000000000000000000000000000000000000000000000000000000000000"){
				throw "there might be a problem with the transaction you sent (do you have enough cash to send this amount?), or the rubix node you are connected to did not process the last transaction.\nPlease try again later.\nIf the problem still appears, contact your rubix node administrator"
			} else {
				var hashAttributes = {
					txHash: txh,
					from: signingAddress
				}
				HashesInProcess.insert(hashAttributes);
				return txh;
			}
		}
	});
}
