//Teams = new Mongo.Collection("teams");

Template.team.rendered = function () {
	var captain = Router.current().data();
	var teams = Teams.find({captain: captain}).fetch();

	for (var i = 0; i < teams.length; i++) {
		var team = teams[i];
		var teamHtml = '<br><div id="team' + i + '">' +
			team.captain + '</div><br>';

		var container = document.getElementById("outer");

		container.innerHTML += teamHtml;
	}

	var captainId;

	Meteor.call("getSummonerId", captain, function(error, result) {
		captainId = result.data[captain.toLowerCase()]["id"];
	});

	console.log(captainId);

	Meteor.call("getMatchHistory", captainId, function(error, results) {
		console.log(error);
		console.log(result.data);
	});
};