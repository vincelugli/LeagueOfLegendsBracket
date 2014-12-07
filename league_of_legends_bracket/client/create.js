Template.create.rendered = function () {
	console.log("create");
};

Template.create.events({
	'click .submit_team' : function () {
		var captain = document.getElementById("captainName").value;
		var member1 = document.getElementById("teamMember1").value;
		var member2 = document.getElementById("teamMember2").value;
		var member3 = document.getElementById("teamMember3").value;
		var member4 = document.getElementById("teamMember4").value;
	}
});