// SPDX-License-Identifier: GPL-3.0
pragma solidity >0.4.22;
contract Voting{
    bytes32[]public candidateList;
    mapping(bytes32=>uint8)public votesReceiced;
    bool isValid;
    constructor(bytes32[] memory candidateName)public{
        candidateList=candidateName;
    }
    
    function validateCandidate(bytes32 candidateName) internal view returns(bool){
    for (uint8 i=0;i<candidateList.length;i++ ){
        if (candidateName==candidateList[i])
        return true;
        }
        return false;
    }
    
    function vote(bytes32 candidateName)public {
        require(validateCandidate(candidateName));
        votesReceiced[candidateName]+=1;
        
    }
    function totalvotesfor(bytes32 candidateName)public view returns(uint8){
        require(validateCandidate(candidateName));
        return votesReceiced[candidateName];
    }
    
}
