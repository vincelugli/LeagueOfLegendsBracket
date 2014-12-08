var uniqueUrl;
var tournamentName;
var challongeUrl;

Template.admin.rendered = function () {
	var data = Router.current().data();

	if (data["tournamentName"] || data["challongeUrl"]) {
		var info = document.getElementById("tournamentInfo");
		uniqueUrl = data["uniqueUrl"];
		tournamentName = data["tournamentName"];
		challongeUrl = data["challongeUrl"];

		info.innerHTML += '<p>' + tournamentName + ': ' + '<a href="' + challongeUrl + '">' + 'Bracket Link' + '</a>' + '</p>';
		document.getElementById("create_tournamet").disabled = true;
		document.getElementById("add_teams").disabled = false;
	}
};

Template.admin.events({
	'click .start_bracket' : function () {
		Meteor.call("startTournament", uniqueUrl, function(error, result) {
				if (result) {
				console.log("Tournament Started!");
				console.log(result);
			}
			else {
				console.log(error);
			}
		});
		console.log(tournamentName);
		console.log(challongeUrl);
		console.log(uniqueUrl);
		Router.go("bracket", {}, {query: {tournamentName: tournamentName, challongeUrl: challongeUrl, uniqueUrl: uniqueUrl}});
	},

	'click .add_teams' : function () {
		var teams = Teams.find().fetch();
		var teamNameList = [];
		for (var i=0; i<teams.length; i++) {
			var team = teams[i];
			teamNameList[i] = team.teamName;
		}

		var info = document.getElementById("tournamentInfo");
		var addButton = document.getElementById("add_teams");

		Meteor.call("addTeams", uniqueUrl, teamNameList, function (error, result) {
			if (result) {
				info.innerHTML += '<p>Teams have been added.</p>';
				addButton.disabled = true;
			}
			else {
				// TODO: actually check proper errors.
				info.innerHTML += '<p>Teams have been added.</p>';
				addButton.disabled = true;
			}
		});
	},

	'click .create_tournament' : function () {
		Router.go("createTournament");
	}
});