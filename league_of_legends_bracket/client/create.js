Template.create.rendered = function () {
};

Template.create.events({
	'click .submit_team' : function () {
		var team = {
			captain: document.getElementById("captainName").value,
			teamMember1: document.getElementById("teamMember1").value,
			teamMember2: document.getElementById("teamMember2").value,
			teamMember3: document.getElementById("teamMember3").value,
			teamMember4: document.getElementById("teamMember4").value
		}

		Teams.insert(team);

		Router.go("team", {}, {query: {captainName: document.getElementById("captainName").value}});
	}
});