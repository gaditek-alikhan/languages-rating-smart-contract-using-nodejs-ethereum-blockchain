
web3 = new Web3(new Web3.providers.HttpProvider("http://5.5.5.5:8545"));
//abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"language","type":"bytes32"}],"name":"totalRatingFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"language","type":"bytes32"}],"name":"validLanguage","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"ratingReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"languagesList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"language","type":"bytes32"}],"name":"rateForLanguage","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"languagesNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
console.log(abi);
RatingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = RatingContract.at('0xab8c8a81f1730af8f054b4f6375c5fb88e35457a');
//candidates = {"Bill": "candidate-1", "Tom": "candidate-2", "Janice": "candidate-3"}
languages = ["Java","PHP","Nodejs","Python","Javascript","Solidity",'Ruby'];

function rateForLanguage(language) {
  //language = $("#language").val();
  contractInstance.rateForLanguage(language, {from: web3.eth.accounts[0]}, function(err,data) {
    //let div_id = candidates[candidateName];
    //$("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
	$("#"+language).html(contractInstance.totalRatingFor.call(language).toString());
	console.log(data);
	var obj = web3.eth.getTransaction(data,function(err,obj) {
	console.log(obj);
	//alert(JSON.stringify(obj));
	var str = "<ul class='list-group'>";
	str += "<li class='list-group-item list-group-item-info'>hash: "+obj.hash+"</li>";
	str += "<li class='list-group-item list-group-item-info'>nonce: "+obj.nonce+"</li>";
	str += "<li class='list-group-item list-group-item-info'>blockHash: "+obj.blockHash+"</li>";
	str += "<li class='list-group-item list-group-item-info'>blockNumber: "+obj.blockNumber+"</li>";
	str += "<li class='list-group-item list-group-item-info'>transactionIndex: "+obj.blockNumber+"</li>";
	str += "<li class='list-group-item list-group-item-info'>from: "+obj.from+"</li>";
	str += "<li class='list-group-item list-group-item-info'>to: "+obj.to+"</li>";
	str += "<li class='list-group-item list-group-item-info'>value: Big Number</li>";
	str += "<li class='list-group-item list-group-item-info'>gas: "+obj.gas+"</li>";
	str += "<li class='list-group-item list-group-item-info'>gasPrice: Big Number</li>";
	str += "<li class='list-group-item list-group-item-info'>input: "+obj.input+"</li>";
	str += "</ul>";
	//$("div#transactions-list").prepend(JSON.stringify(obj));
	$("div#transactions-list").prepend(str);
	})
	
  });
}

$(document).ready(function() {
  //candidateNames = Object.keys(candidates);
  for (var i = 0; i < languages.length; i++) {
    let language = languages[i];
    let val = contractInstance.totalRatingFor.call(language).toString()
    $("#"+language).html(val);
  }
});

/*
0xdc5a4b5d9643bbe4d6fa65fdad099b5b88a242f7
0xef7749fd01ea3c15f9a484e93e2c7bd723a8b465
let myBalanceWei = web3.eth.getBalance('0x24ace11b3efb13f226e3d4153a77ecb84755c1fd').toNumber()
let myBalance = web3.fromWei(myBalanceWei, 'ether') 
console.log(`Your wallet balance is currently ${myBalance} ETH`.green)
web3.fromWei(20000000000, 'ether')
web3.eth.getTransactionCount('0xd16f59a8a2cd3501f68d71d67158069007a6cc27')

web3.eth.sendTransaction({from: acct1, to:acct2, value: web3.toWei(1, 'ether'), gasLimit: 21000, gasPrice: 20000000000})
web3.eth.sendTransaction({from: '0xdc5a4b5d9643bbe4d6fa65fdad099b5b88a242f7', to:'0xef7749fd01ea3c15f9a484e93e2c7bd723a8b465', value: 22000, gasLimit: 21000, gasPrice: 20000000000})
web3.eth.getTransaction('0x49a4b2f7829d49a9a1bf6b28658f2c8cfdf02fb4d7c8968cdc4d3387509b3821')
web3.fromWei(web3.eth.getBalance('0xcdfc8c5c96a84a92be9062a7cb86c54b4b7d312d'), 'ether')
web3.eth.getBalance('0xcdfc8c5c96a84a92be9062a7cb86c54b4b7d312d').toNumber()

deployedContract = RatingContract.new(['Java','C++','PHP','Nodejs','Python','Javascript','Solidity'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
contractInstance = RatingContract.at(deployedContract.address)

contractInstance.rateForLanguage('PHP', {from: web3.eth.accounts[0]})

web3.eth.getTransaction('0x4d685eb42fc7a6ce9645d77f688475d49a4c07ca6370d7fc8b9f0c66256c5ceb')


abi = JSON.parse('[{"constant":false,"inputs":[{"name":"language","type":"bytes32"}],"name":"totalRatingFor",
"outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},
{"constant":false,"inputs":[{"name":"language","type":"bytes32"}],"name":"validLanguage",
"outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],
"name":"ratingReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},
{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],
"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"languagesList",
"outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,
"inputs":[{"name":"language","type":"bytes32"}],"name":"rateForLanguage","outputs":[],"payable":false,"type":"function"},
{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},
{"inputs":[{"name":"languagesNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')

*/