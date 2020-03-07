// Listen for state being clicked
var states = document.getElementsByClassName("stateSVG");
var stateInput = document.getElementById("stateInput");
var stateVoteInput = document.getElementById("stateVoteInput");
var stateForm = document.getElementById("stateForm");

var voteForState = function() {
    // Grab abbreviation + votes of state being clicked
    var chosenState = this.getAttribute("id");
    var chosenStateVotes = parseInt(this.getAttribute("data-votes")) + 1;
    
    // Put state abbreviation + votes in hidden form
    stateInput.value = chosenState;
    stateVoteInput.value = chosenStateVotes;

    // Submit vote
    stateForm.submit();
};

for (var i = 0; i < states.length; i++) {
    states[i].addEventListener('click', voteForState, false);
}

// var noVotes = document.getElementsByClassName("0");
// for (var j = 0; j < noVotes.length; j++) {
//     noVotes[j].style.backgroundColor = "#191919";
//  }