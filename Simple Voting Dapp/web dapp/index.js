var web3 =new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi=JSON.parse([
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "votesReceiced",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "candidateName",
                "type": "bytes32"
            }
        ],
        "name": "totalvotesfor",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "candidateName",
                "type": "bytes32"
            }
        ],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidateList",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "candidateName",
                "type": "bytes32[]"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
]);
var contractAddr="0x27efb8a2dc7bd559dd7ef14bea9df75ea83a6908";
var VotingContract=web3.eth.Contract(abi);
var contractInstance=VotingContract.at(contractAddr);

var candidates={
    "A":"candidate-1",
    "B":"candidate-2",
    "C":"candidate-3"};
function voteForCandidate(){
    let inputname=$("#inputname").val();
    try {
        contractInstance.vote(inputname,{from:web3.eth.accounts[0]},(err,ers)=>{
            if(err)
                console.log(err)
            else {
                let id=candidates[inputname];
                let count=contractInstance.totalvotesfor(inputname).toString();
                $("#"+id).html(count);
            }
        })
    }catch (err){}
}

$(document).ready(function (){
    var candidateList=Object.keys(candidates);
    for(let i=0,i<candidateList.length;i++){
        let name=candidateList[i];
        let count=contractInstance.totalvotesfor.call(name).toString();
        $("#"+candidates[name]).html(count);//#表示ID筛选,后面是ID
    }
})