var region = "na"
var chalKey = "6H30UpGfCtSW3tvMWC5X2E6wET0PFiFWe7uSqlY5";
var riotKey = "723f4c12-6696-4c69-903c-5110b3c98ab3";
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
		var url = "https://na.api.pvp.net/api/lol/" + region + "/v1.4/summoner/by-name/" + summonerName + "?api_key=" + riotKey;
		var result = HTTP.get(url);

		return result;
	},
	getMatchHistory : function(summonerId) {
		var url = "https://na.api.pvp.net/api/lol/" + region + "/v2.2/matchhistory/" + summonerId + "?api_key=" + riotKey;
		var result = HTTP.get(url);

		return result;
	},
	createTournament : function(name, type, url) {
		var queryUrl = "https://api.challonge.com/v1/tournaments.json?" + 
			"api_key=" + chalKey + 
			"&tournament[name]=" + name + 
			"&tournament[tournament_type]=" + type + 
			"&tournament[url]=" + url + 
			"&tournament[accept_attachments]=true";

		var result = HTTP.post(queryUrl);

		return result;
	},
	addTeams: function(name, teams) {
		var queryUrl = "https://api.challonge.com/v1/tournaments/" + name + 
			"/participants/bulk_add.json?api_key=" + chalKey;

		for (var i = 0; i<teams.length; i++){
			queryUrl += "&participants[][name]=" + teams[i];
		}
			
		var result = HTTP.post(queryUrl);

		return result;
	},
	startTournament: function(tournament) {
		var queryUrl = "https://api.challonge.com/v1/tournaments/" + tournament + "/start.json?" + 
			"api_key=" + chalKey + "&tournament=" + tournament;

		var result = HTTP.post(queryUrl);

		return result;
	},
	getMatches: function(name) {
		var queryUrl = "https://api.challonge.com/v1/tournaments/" + name + "/matches.json?" + 
			"api_key=" + chalKey + "&match_id=" + name;

		var result = HTTP.get(queryUrl);

		return result;
	},
	getParticipant: function(name, playerId) {
		var queryUrl = "https://api.challonge.com/v1/tournaments/" + name + "/participants.json?" + 
			"api_key=" + chalKey + "&participant_id=" + playerId;

		var result = HTTP.get(queryUrl);

		return result;
	}
});