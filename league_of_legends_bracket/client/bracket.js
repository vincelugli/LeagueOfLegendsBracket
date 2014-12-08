Template.bracket.rendered = function () {
	var data = Router.current().data();

	Meteor.call("getMatches", data["uniqueUrl"], function(error, result) {
		console.log(result);
		console.log(error);
	});
};