var data;
var matchInfo;
var totalMatches = 0;
var matchesInRound = 0;
var completedMatches = 0;
var interval;

Template.bracket.rendered = function () {
	data = Router.current().data();
	matchInfo = document.getElementById("matchInfo");

	updateMatchInfo();

	interval = setInterval(function() {
		updateMatchInfo();
		if (completedMatches == matchesInRound) {
			completedMatches = 0;
			matchesInRound = 0;
			closeInterval();
		}
	}, 60000);
};

function closeInterval() { 
	clearInterval(interval);
}

function updateMatchInfo() {
	Meteor.call("getMatches", data["uniqueUrl"], function(error, result) {
		if (result) {
			var resultData = result.data;
			totalMatches = resultData.length;

			for (var i=0; i<resultData.length; i++) {
				console.log(resultData[i]);
				var player1_id = resultData[i].match.player1_id;
				var player2_id = resultData[i].match.player2_id;
				var player1;
				var player2;

				if (!document.getElementById(("match"+resultData[i].match.identifier))) {
					matchInfo.innerHTML += '<div id="match' + resultData[i].match.identifier + '"></div>';
				}
				
				if (resultData[i].match.state != 'pending') {
					matchesInRound++;
					Meteor.call("getParticipant", data["uniqueUrl"], player1_id, resultData[i].match, function(participant_error, participant_result) {
						if (participant_result) {
							player1 = participant_result.result.data.participant.name;

							var matchInfoDiv = document.getElementById("match"+participant_result.matchInfo.identifier);

							if (!document.getElementById("match" + participant_result.matchInfo.identifier + "Header")) {
								// Match Name -> Corresponds to letter on challonge.
								matchInfoDiv.innerHTML += '<div id=match' + participant_result.matchInfo.identifier + 
									'Header><h2>Match ' + participant_result.matchInfo.identifier + '</h2></div>';

								// Player 1 in match
								document.getElementById("match" + participant_result.matchInfo.identifier + "Header").innerHTML += player1 + ' vs. ';
							}
						}
					});
					Meteor.call("getParticipant", data["uniqueUrl"], player2_id, resultData[i].match, function(participant_error, participant_result) {
						if (participant_result) {
							player2 = participant_result.result.data.participant.name;

							var matchInfoDiv = document.getElementById("match"+participant_result.matchInfo.identifier);

							if (!document.getElementById("player2" + participant_result.matchInfo.identifier)) {
								// Player 2 in match
								document.getElementById("match" + participant_result.matchInfo.identifier + "Header").innerHTML += 
									'<div id="player2' + participant_result.matchInfo.identifier + '">' + player2 + '</div><br>';
							}
							
							if (document.getElementById("gameState" + participant_result.matchInfo.identifier)) {
								document.getElementById("gameState" + participant_result.matchInfo.identifier).innerHTML = 'Game State: '
									+ participant_result.matchInfo.state;
							}
							else {
								// State of match
								matchInfoDiv.innerHTML += '<div id="gameState' + participant_result.matchInfo.identifier + '">Game State: ' 
									+ participant_result.matchInfo.state + '</div><br>'
							}

							if (document.getElementById("winner" + participant_result.matchInfo.identifier)) {
								document.getElementById("winner" + participant_result.matchInfo.identifier).innerHTML = 'Game State: '
									+ participant_result.matchInfo.state;
							}
							else {
								if (participant_result.matchInfo.state == 'complete') {
									completedMatches++;
									// Winner of match
									// TODO: updated winner based on id.
									matchInfoDiv.innerHTML += '<div id="winner' + participant_result.matchInfo.identifier + '">Winner: ' 
										+ participant_result.matchInfo.winner_id + '</div><br>';
								}
							}
							
							
						}
					});
				}
			}
		}
	});
}