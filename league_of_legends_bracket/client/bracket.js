Template.bracket.rendered = function () {
	var data = Router.current().data();
	var matchInfo = document.getElementById("matchInfo");

	Meteor.call("getMatches", data["uniqueUrl"], function(error, result) {
		if (result) {
			var resultData = result.data;
			for (var i=0; i<resultData.length; i++) {
				var player1_id = resultData[i].match.player1_id;
				var player2_id = resultData[i].match.player2_id;
				var player1;
				var player2;

				matchInfo.innerHTML += '<div id="match' +  + '"></div>';

				if (player1_id || player2_id) {
					Meteor.call("getParticipant", data["uniqueUrl"], player1_id, matchId, function(participant_error, participant_result) {
						if (result) {
							player1 = participant_result.data.participant.name;

							document.getElementById("match"+resultData[i].match.identifier).innerHTML += player1;

							console.log("Player 1: " + participant_result.data.participant.name);
						}
					});
					Meteor.call("getParticipant", data["uniqueUrl"], player2_id, function(participant_error, participant_result) {
						if (result) {
							player2 = participant_result.data.participant.name;
							console.log("Player 2: " + participant_result.data.participant.name);
						}
					});
				}
			}
		}
	});
};