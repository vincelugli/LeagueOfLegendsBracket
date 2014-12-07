var region = "na"
var Teams = new Mongo.Collection("teams");

Meteor.startup(function () {
	Meteor.publish("teams", function() {
		return Teams.find();
	});

	Meteor.publish("teamByCaptain", function(captain) {
		return Teams.find(captain);
	});
});

Meteor.methods({
	getSummonerId : function(summonerName) {
		var url = "https://na.api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + summonerName + "?api_key=723f4c12-6696-4c69-903c-5110b3c98ab3"
		var result = HTTP.get(url);

		return result;
	},
	getMatchHistory : function(summonerId) {
		console.log(summonerId);
		var url = "https://na.api.pvp.net/api/lol/" + region + "/v2.2/matchhistory/" + summonerId + "?api_key=723f4c12-6696-4c69-903c-5110b3c98ab3"
		var result = HTTP.get(url);

		return result;
	}
});