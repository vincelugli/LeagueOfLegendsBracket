Template.bracket.rendered = function () {
	var data = Router.current().data();
	var matchInfo = document.getElementById("matchInfo");
	var totalMatches = 0;
	var completedMatches = 0;

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

				matchInfo.innerHTML += '<div id="match' + resultData[i].match.identifier + '"></div>';

				if (resultData[i].match.state != 'pending') {
					Meteor.call("getParticipant", data["uniqueUrl"], player1_id, resultData[i].match, function(participant_error, participant_result) {
						if (participant_result) {
							player1 = participant_result.result.data.participant.name;

							var matchInfoDiv = document.getElementById("match"+participant_result.matchInfo.identifier);

							// Match Name -> Corresponds to letter on challonge.
							matchInfoDiv.innerHTML += '<h2>Match ' + participant_result.matchInfo.identifier + '</h2>';

							// Player 1 in match
							matchInfoDiv.innerHTML += player1 + ' vs. ';
						}
					});
					Meteor.call("getParticipant", data["uniqueUrl"], player2_id, resultData[i].match, function(participant_error, participant_result) {
						if (participant_result) {
							player2 = participant_result.result.data.participant.name;

							var matchInfoDiv = document.getElementById("match"+participant_result.matchInfo.identifier);

							// Player 2 in match
							matchInfoDiv.innerHTML += player2 + '<br>';

							// State of match
							matchInfoDiv.innerHTML += 'Game State: ' + participant_result.matchInfo.state + '<br>';

							if (participant_result.matchInfo.state == 'complete') {
								// Winner of match
								// TODO: updated winner based on id.
								matchInfoDiv.innerHTML += 'Winner: ' + participant_result.matchInfo.winner_id + '<br>';
							}
						}
					});
				}
			}
		}
	});
};