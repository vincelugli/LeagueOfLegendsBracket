Template.createTournament.events({
	'click .create_tournament' : function () {
		var challongeUrl = "http://challonge.com/" + document.getElementById("url").value;
		var name = document.getElementById("tournamentName").value;
		var url = document.getElementById("url").value;

		Meteor.call("createTournament", 
			name, 
			document.getElementById("type").value, 
			url, 
			function (error, result) {
				if (result) {
					challongeUrl = result.data.tournament.full_challonge_url;	
					Router.go('admin', {}, {query: {tournamentName: name, challongeUrl: challongeUrl, uniqueUrl: url}});
				}
				else {
					document.getElementById("error").style.display="inherit";
				}
		});
	}
});